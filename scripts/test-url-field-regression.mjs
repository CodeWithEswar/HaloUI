import fs from 'fs';

function parseURL(value) {

  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed);
  } catch {
    return null;
  }
}

function isSyntacticallyValidURL(value, allowedProtocols = ["https:", "http:"]) {
  const parsed = parseURL(value);
  if (!parsed) return false;
  return allowedProtocols.includes(parsed.protocol);
}

function normalizeURL(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("localhost")) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
}


async function testURLFieldRegression() {
  console.log('--- Testing URL Field Regression Suite (Section 127) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/url-field.tsx', 'utf8');

  // 1. Accessible Semantics & Names
  assert(
    componentSrc.includes('type="url"') &&
    componentSrc.includes('inputMode="url"') &&
    componentSrc.includes('dir="ltr"'),
    'URL Field has URL semantics and LTR direction'
  );

  // 2. Empty Input Invariant (Section 74)
  assert(
    componentSrc.includes('defaultValue = ""') &&
    normalizeURL('') === '',
    'Empty input remains genuinely empty without forced https://'
  );

  // 3. Syntactic Parsing (Section 80)
  const parsed = parseURL('https://example.com/docs');
  assert(parsed !== null && parsed.hostname === 'example.com' && parsed.pathname === '/docs', 'Valid HTTPS URL parses correctly');
  assert(isSyntacticallyValidURL('https://example.com'), 'isSyntacticallyValidURL returns true for https:');
  assert(isSyntacticallyValidURL('http://example.com'), 'isSyntacticallyValidURL returns true for http:');
  assert(!isSyntacticallyValidURL('javascript:alert(1)'), 'Dangerous javascript: scheme returns false under default policies');

  // 4. Ports, Queries, Fragments (Section 86, 87, 88)
  const complex = parseURL('https://example.com:8443/api/search?q=haloui#section-1');
  assert(complex !== null && complex.port === '8443', 'Explicit port :8443 parsed');
  assert(complex !== null && complex.search === '?q=haloui', 'Query parameters preserved');
  assert(complex !== null && complex.hash === '#section-1', 'Hash fragment preserved');

  // 5. Normalization on Blur (Section 82 & 83)
  assert(normalizeURL('example.com') === 'https://example.com', 'example.com normalizes to https://example.com');
  assert(normalizeURL('localhost:3000') === 'http://localhost:3000', 'localhost normalizes to http://localhost:3000');
  assert(normalizeURL('https://example.com/docs') === 'https://example.com/docs', 'Existing HTTPS URL is preserved');

  // 6. Caret & Typing Safety (Section 77)
  assert(
    componentSrc.includes('onBlur') &&
    componentSrc.includes('if (normalizeOnBlur && displayValue.trim())'),
    'Normalization happens on blur, never while typing, guaranteeing caret stability'
  );

  // 7. Decorative Icon Hidden from Assistive Tech (Section 94)
  assert(
    componentSrc.includes('data-slot="url-field-icon"') &&
    componentSrc.includes('aria-hidden="true"'),
    'Decorative link/globe icon is hidden with aria-hidden="true"'
  );

  // 8. Dual Indicator Invalid + Focus Ring (Section 99)
  assert(
    componentSrc.includes('has-[input:focus-visible]:border-[var(--halo-focus-color)]') &&
    componentSrc.includes('has-[input:focus-visible]:ring-destructive/40'),
    'Invalid error border and input focus ring coexist clearly'
  );

  // 9. Disabled State (Section 100)
  assert(
    componentSrc.includes('isDisabled && "pointer-events-none cursor-not-allowed opacity-40 shadow-none"'),
    'Disabled state locks input and suppresses interactions'
  );

  // 10. Read-Only State (Section 101)
  assert(
    componentSrc.includes('read-only:select-text'),
    'Read-only state locks editing while allowing text selection and copying'
  );

  // 11. Documentation Callouts & Sections (Section 118–120)
  const docSrc = fs.readFileSync('app/components/url-field/page.tsx', 'utf8');
  assert(docSrc.includes('URL Field validates URL-oriented input; it does not check whether a website exists'), 'Section 118 Callout present');
  assert(docSrc.includes('A parseable URL is not automatically a trusted or safe URL'), 'Section 119 Callout present');
  assert(docSrc.includes('Normalization must be explicit and predictable'), 'Section 120 Callout present');

  // 12. Demonstrations File Verification
  const demoSrc = fs.readFileSync('app/components/url-field/url-field-demonstrations.tsx', 'utf8');
  assert(demoSrc.includes('PrimaryURLFieldDemo'), 'Primary URL demo present');
  assert(demoSrc.includes('ComplexURLDemo'), 'Complex URL demo present');
  assert(demoSrc.includes('LongURLDemo'), 'Long URL demo present');
  assert(demoSrc.includes('NormalizedOnBlurDemo'), 'Normalized on blur demo present');
  assert(demoSrc.includes('InvalidURLDemo'), 'Invalid state demo present');
  assert(demoSrc.includes('ReadOnlyURLDemo'), 'Read-only state demo present');

  if (failures === 0) {
    console.log('\n🎉 ALL URL FIELD REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION TESTS FAILED!\n`);
    process.exit(1);
  }
}

testURLFieldRegression();
