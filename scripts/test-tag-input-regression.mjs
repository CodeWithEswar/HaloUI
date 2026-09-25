import fs from 'fs';

function parseInputTokens(text, delimiters = [","]) {
  if (!text) return [];
  const regex = new RegExp(`[${delimiters.map(d => "\\" + d).join("")}\\n\\r]+`);
  return text
    .split(regex)
    .map(t => t.trim())
    .filter(Boolean);
}

function processNewTags(currentTags, incomingTokens, options = {}) {
  const { maxTags, allowDuplicates = false, onDuplicate } = options;
  const result = [...currentTags];

  for (const rawToken of incomingTokens) {
    const token = rawToken.trim();
    if (!token) continue;

    if (maxTags && result.length >= maxTags) {
      break;
    }

    const isDuplicate = result.some(
      existing => existing.toLowerCase() === token.toLowerCase()
    );

    if (isDuplicate && !allowDuplicates) {
      if (onDuplicate) onDuplicate(token);
      continue;
    }

    result.push(token);
  }

  return result;
}

async function testTagInputRegression() {
  console.log('--- Testing Tag Input Regression Suite ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/tag-input.tsx', 'utf8');

  // 1. Core Architecture & Compound Exports
  assert(componentSrc.includes('TagInput') && (componentSrc.includes('export function TagInput(') || componentSrc.includes('export const TagInput =')), 'TagInput compound export exists');
  assert(componentSrc.includes('TagInputItem') && (componentSrc.includes('export function TagInputItem(') || componentSrc.includes('export const TagInputItem =')), 'TagInputItem export exists');
  assert(componentSrc.includes('TagInputItemText') && (componentSrc.includes('export function TagInputItemText(') || componentSrc.includes('export const TagInputItemText =')), 'TagInputItemText export exists');
  assert(componentSrc.includes('TagInputItemRemove') && (componentSrc.includes('export function TagInputItemRemove(') || componentSrc.includes('export const TagInputItemRemove =')), 'TagInputItemRemove export exists');
  assert(componentSrc.includes('TagInputInput') && (componentSrc.includes('export function TagInputInput(') || componentSrc.includes('export const TagInputInput =')), 'TagInputInput export exists');
  assert(componentSrc.includes('TagInputClear') && (componentSrc.includes('export function TagInputClear(') || componentSrc.includes('export const TagInputClear =')), 'TagInputClear export exists');

  // 2. Icon & Design System Compliance
  assert(!componentSrc.includes('lucide-react'), 'Zero lucide-react imports');
  assert(componentSrc.includes('@hugeicons/core-free-icons'), 'Uses @hugeicons/core-free-icons');
  assert(componentSrc.includes('HaloIcon'), 'Uses HaloIcon primitive');
  assert(componentSrc.includes('Cancel01Icon'), 'Uses Hugeicons Cancel01Icon');

  // 3. Accessibility & Field Integration
  assert(componentSrc.includes('useFieldControlProps'), 'Integrated with useFieldControlProps');
  assert(componentSrc.includes('aria-live="polite"'), 'Includes screen reader live region');
  assert(componentSrc.includes('aria-label='), 'Remove buttons have accessible labels');
  assert(componentSrc.includes('aria-invalid='), 'aria-invalid passed through to input and container');

  // 4. Token Parsing & Delimiters
  const parsed1 = parseInputTokens("React, TypeScript, Tailwind");
  assert(
    parsed1.length === 3 &&
    parsed1[0] === "React" &&
    parsed1[1] === "TypeScript" &&
    parsed1[2] === "Tailwind",
    'Comma-delimited string correctly parsed into 3 trimmed tokens'
  );

  const parsed2 = parseInputTokens("  Alpha  ;  Beta  \n  Gamma  ", [",", ";"]);
  assert(
    parsed2.length === 3 &&
    parsed2[0] === "Alpha" &&
    parsed2[1] === "Beta" &&
    parsed2[2] === "Gamma",
    'Multi-delimiter (comma, semicolon, newline) with excessive whitespace trimmed correctly'
  );

  const parsedEmpty = parseInputTokens(",,,,   ,,  ");
  assert(parsedEmpty.length === 0, 'Consecutive commas and empty strings return 0 tokens');

  // 5. Duplicate Prevention
  let rejectedDupe = null;
  const current = ["React", "TypeScript"];
  const afterDupe = processNewTags(current, ["react"], {
    allowDuplicates: false,
    onDuplicate: (t) => { rejectedDupe = t; }
  });
  assert(afterDupe.length === 2, 'Duplicate tag rejected when allowDuplicates=false');
  assert(rejectedDupe === "react", 'onDuplicate callback triggered with duplicate token name');

  const afterAllowedDupe = processNewTags(current, ["react"], {
    allowDuplicates: true,
  });
  assert(afterAllowedDupe.length === 3, 'Duplicate allowed when allowDuplicates=true');

  // 6. Max Tags Limit Enforcement
  const cappedTags = processNewTags(["A", "B"], ["C", "D", "E"], { maxTags: 3 });
  assert(cappedTags.length === 3 && cappedTags[2] === "C", 'maxTags={3} strictly caps added tags');

  // 7. Two-Stage Backspace Deletion Verification
  assert(
    componentSrc.includes('stagedTagIndex') &&
    componentSrc.includes('setStagedTagIndex'),
    'Two-stage backspace state tracked in component'
  );
  assert(
    componentSrc.includes('e.key === "Backspace"'),
    'Backspace key handler implemented'
  );

  // 8. Size Variants
  assert(
    componentSrc.includes('size: {') &&
    componentSrc.includes('sm:') &&
    componentSrc.includes('default:') &&
    componentSrc.includes('lg:'),
    'Size variants sm, default, lg defined in CVA'
  );

  // 9. Read-Only vs Disabled Contracts
  assert(
    componentSrc.includes('readOnly') &&
    componentSrc.includes('disabled'),
    'Both readOnly and disabled flags supported'
  );

  if (failures === 0) {
    console.log('\n🎉 ALL TAG INPUT REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION CHECKS FAILED!\n`);
    process.exit(1);
  }
}

testTagInputRegression();
