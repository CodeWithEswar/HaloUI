import fs from 'fs';
import { formatNumber } from '@base-ui/utils/formatNumber';

async function testCurrencyFieldRegression() {
  console.log('--- Testing Currency Field Regression Suite (Section 121) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/currency-field.tsx', 'utf8');

  // 1. Shared Architecture (Section 60)
  assert(
    componentSrc.includes('@base-ui/react/number-field') &&
    componentSrc.includes('NumberFieldGroup') &&
    componentSrc.includes('NumberFieldInput'),
    'Builds on Number Field numeric-entry architecture without creating duplicate parsers'
  );

  // 2. Value Model (number | null) & Separation from Display
  assert(
    componentSrc.includes('value?: number | null;') &&
    componentSrc.includes('onValueChange?: (value: number | null) => void;'),
    'Semantic value strictly typed as number | null, not a formatted string'
  );

  // 3. Locale & Currency Formatting Invariants (Semantic value = 1234.5)
  const testVal = 1234.5;
  const usFormat = formatNumber(testVal, 'en-US', { style: 'currency', currency: 'USD' });
  const deFormat = formatNumber(testVal, 'de-DE', { style: 'currency', currency: 'EUR' });
  const inFormat = formatNumber(testVal, 'en-IN', { style: 'currency', currency: 'INR' });
  const jpFormat = formatNumber(testVal, 'ja-JP', { style: 'currency', currency: 'JPY' });

  assert(usFormat.includes('$') && usFormat.includes('1,234.50'), 'USD / en-US formats as $1,234.50');
  assert(deFormat.includes('€') && deFormat.includes('1.234,50'), 'EUR / de-DE formats as 1.234,50 € with comma decimal');
  assert(inFormat.includes('₹') && inFormat.includes('1,234.50'), 'INR / en-IN formats as ₹1,234.50');
  assert(jpFormat.includes('￥') || jpFormat.includes('¥'), 'JPY / ja-JP formats with Yen symbol');
  assert(!jpFormat.includes('.'), 'JPY / ja-JP formats with zero fraction digits');

  // 4. Stepper Placement (default "none" for monetary entry)
  assert(
    componentSrc.includes('stepperPlacement = "none"'),
    'Defaults to stepperPlacement="none" for monetary input while allowing optional steppers'
  );

  // 5. ISO Currency Code Badge Support
  assert(
    componentSrc.includes('showCurrencyCode = false') &&
    componentSrc.includes('data-slot="currency-code-badge"'),
    'Supports optional ISO currency code pill badge'
  );

  // 6. Wheel Scrub Disabled
  assert(
    componentSrc.includes('allowWheelScrub={false}'),
    'Enforces allowWheelScrub={false} to protect financial amounts from scroll mutation'
  );

  // 7. Demonstrations Verification
  const demoSrc = fs.readFileSync('app/components/currency-field/currency-field-demonstrations.tsx', 'utf8');
  assert(demoSrc.includes('PrimaryCurrencyFieldDemo'), 'Primary USD demo present');
  assert(demoSrc.includes('LocaleMatrixDemo'), 'Locale & currency matrix demo present');
  assert(demoSrc.includes('CurrencyChangeDemo'), 'Currency change (Formatting != Conversion) demo present');
  assert(demoSrc.includes('WithSteppersDemo'), 'Steppers auction demo present');
  assert(demoSrc.includes('InvalidCurrencyFieldDemo'), 'Invalid state demo present');
  assert(demoSrc.includes('DisabledCurrencyFieldDemo'), 'Disabled state demo present');

  // 8. Documentation Callouts
  const docSrc = fs.readFileSync('app/components/currency-field/page.tsx', 'utf8');
  assert(docSrc.includes('Currency Field formats monetary input; it does not perform financial calculations'), 'Section 110 Callout present');
  assert(docSrc.includes('Keep the monetary value separate from its localized presentation'), 'Section 111 Callout present');
  assert(docSrc.includes('Currency and locale are separate concepts'), 'Section 112 Callout present');
  assert(docSrc.includes('Changing the currency identifier changes formatting context only'), 'Section 113 Callout present');
  assert(docSrc.includes('JavaScript numeric values are not a universal accounting representation'), 'Section 114 Callout present');

  if (failures === 0) {
    console.log('\n🎉 ALL CURRENCY FIELD REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION TESTS FAILED!\n`);
    process.exit(1);
  }
}

testCurrencyFieldRegression();
