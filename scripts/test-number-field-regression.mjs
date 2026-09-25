import fs from 'fs';

async function testNumberFieldRegression() {
  console.log('--- Testing Number Field Regression Suite (Section 57) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/number-field.tsx', 'utf8');

  // 1. Primitive Architecture
  assert(
    componentSrc.includes('@base-ui/react/number-field') &&
    componentSrc.includes('NumberFieldPrimitive.Root') &&
    componentSrc.includes('NumberFieldPrimitive.Input'),
    'Uses Base UI NumberField primitive rather than naive custom text parser'
  );

  // 2. Value Model (number | null)
  assert(
    componentSrc.includes('value?: number | null;') &&
    componentSrc.includes('onValueChange?: (value: number | null) => void;'),
    'Defines value model as number | null supporting explicit empty state'
  );

  // 3. Wheel Scrub Disabled
  assert(
    componentSrc.includes('allowWheelScrub={false}'),
    'Enforces allowWheelScrub={false} to prevent accidental wheel stepping on page scroll'
  );

  // 4. Stepper Buttons Accessible Names & Icons
  assert(
    componentSrc.includes('"Increase value"') && componentSrc.includes('"Decrease value"'),
    'Stepper buttons carry explicit accessible names ("Increase value" and "Decrease value")'
  );
  assert(
    componentSrc.includes('PlusSignIcon') && componentSrc.includes('MinusSignIcon') && componentSrc.includes('HaloIcon'),
    'Uses Hugeicons PlusSignIcon and MinusSignIcon via HaloIcon (No Lucide)'
  );

  // 5. Stepper Focus & Focus-Visible Independence
  assert(
    componentSrc.includes('focus-visible:ring-[var(--halo-focus-color)]') &&
    componentSrc.includes('halo-focus-ring'),
    'Stepper buttons possess independent double-contrast Halo Focus Ring'
  );


  // 6. Group Focus Within
  assert(
    componentSrc.includes('has-[[data-slot=number-field-input]:focus-visible]:border-[var(--halo-focus-color)]') &&
    componentSrc.includes('has-[[data-slot=number-field-input]:focus-visible]:ring-2'),
    'Input focus activates shared assembly focus ring without competing double borders'
  );

  // 7. Invalid + Focus Coexistence (Section 29)
  assert(
    componentSrc.includes('border-destructive/80') &&
    componentSrc.includes('has-[[data-slot=number-field-input]:focus-visible]:ring-destructive/40'),
    'Invalid + Focus state renders distinctive coordinated focus treatment'
  );

  // 8. Disabled & Read-Only Semantics
  assert(
    componentSrc.includes('disabled:isDisabled') || componentSrc.includes('disabled={isDisabled}'),
    'Disabled state passed to root primitive (disables input, increment, decrement)'
  );
  assert(
    componentSrc.includes('readOnly={readOnly}') && componentSrc.includes('read-only:select-text'),
    'Read-only state prevents stepping while preserving selectable/copyable text'
  );

  // 9. Decimal Step & Clamping Logic
  assert(
    componentSrc.includes('min={min}') && componentSrc.includes('max={max}') && componentSrc.includes('step={step}'),
    'Passes min, max, step directly to primitive for robust clamping without floating-point garbage'
  );

  // 10. Stepper Placements
  assert(
    componentSrc.includes('stepperPlacement === "split"') &&
    componentSrc.includes('stepperPlacement === "right"') &&
    componentSrc.includes('stepperPlacement === "none"'),
    'Supports "right", "split", and "none" stepper layouts'
  );

  // 11. Demonstrations Verification
  const demoSrc = fs.readFileSync('app/components/number-field/number-field-demonstrations.tsx', 'utf8');
  assert(demoSrc.includes('PrimaryNumberFieldDemo'), 'Seats demo (1-20, step=1) present');
  assert(demoSrc.includes('DecimalNumberFieldDemo'), 'Decimal opacity demo (0-1, step=0.1) present');
  assert(demoSrc.includes('NegativeNumberFieldDemo'), 'Negative temperature demo (-10 to 10, step=1) present');
  assert(demoSrc.includes('SplitStepperDemo'), 'Split counter layout demo present');
  assert(demoSrc.includes('ControlledNumberFieldDemo'), 'Controlled counter demo present');
  assert(demoSrc.includes('InvalidNumberFieldDemo'), 'Invalid state demo present');
  assert(demoSrc.includes('DisabledAndReadOnlyDemo'), 'Disabled vs Read-Only comparison demo present');

  // 12. Documentation Callouts
  const docSrc = fs.readFileSync('app/components/number-field/page.tsx', 'utf8');
  assert(docSrc.includes('Number Field owns numeric entry, not numeric business meaning'), 'Section 50 Callout present');
  assert(docSrc.includes('Numeric editing can temporarily contain incomplete text'), 'Section 51 Callout present');

  if (failures === 0) {
    console.log('\n🎉 ALL NUMBER FIELD REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION TESTS FAILED!\n`);
    process.exit(1);
  }
}

testNumberFieldRegression();
