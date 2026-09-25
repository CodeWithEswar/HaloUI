import fs from 'fs';

async function testInputOtpRegression() {
  console.log('--- Testing Input OTP Regression Contract (Section 129) ---');
  let failures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  const componentSrc = fs.readFileSync('components/ui/input-otp.tsx', 'utf8');

  // Test 1: Single Logical Input
  assert(
    componentSrc.includes('import { OTPInput, OTPInputContext } from "input-otp";') &&
    componentSrc.includes('<OTPInput'),
    'Uses single logical OTPInput engine rather than six independent inputs'
  );

  // Test 2: Only 1 Tab stop
  assert(
    !componentSrc.includes('<input') || !componentSrc.includes('tabIndex'),
    'Slots do not inject separate independent tabIndex values (1 Tab stop preserved)'
  );

  // Test 3: Autofill Platform Attribute
  assert(
    componentSrc.includes('autoComplete="one-time-code"'),
    'Preserves platform autocomplete="one-time-code"'
  );

  // Test 4: Separator Hidden from Assistive Technology
  assert(
    componentSrc.includes('role="separator"') && componentSrc.includes('aria-hidden="true"'),
    'InputOTPSeparator is hidden from assistive tech with aria-hidden="true"'
  );

  // Test 5: Accessible Icon Usage
  assert(
    componentSrc.includes('MinusSignIcon') && componentSrc.includes('HaloIcon'),
    'Uses Hugeicons MinusSignIcon rendered via HaloIcon (No Lucide)'
  );

  // Test 6: Field Integration
  assert(
    componentSrc.includes('useFieldControlProps'),
    'Integrates useFieldControlProps for Field coordination'
  );

  // Test 7: Invalid State and Focus Coexistence (Section 88)
  assert(
    componentSrc.includes('InputOTPUIContext') &&
    componentSrc.includes('isInvalid') &&
    componentSrc.includes('border-destructive'),
    'Provides InputOTPUIContext for invalid state propagation to all visual slots'
  );
  assert(
    componentSrc.includes('isActive && !isInvalid') &&
    componentSrc.includes('isActive && "z-20 border-destructive ring-2 ring-destructive/40'),
    'Invalid + Focus state renders distinctive coordinated focus treatment'
  );

  // Test 8: Fake Caret & Reduced Motion
  assert(
    componentSrc.includes('hasFakeCaret') &&
    componentSrc.includes('animate-caret-blink') &&
    componentSrc.includes('motion-reduce:animate-none'),
    'Fake caret respects motion-reduce:animate-none'
  );

  // Test 9: Slot Sizing Support
  assert(
    componentSrc.includes('sizeClasses') &&
    componentSrc.includes('sm:') &&
    componentSrc.includes('size = "default"'),
    'Supports responsive slot sizes (sm, default, lg) to prevent phone overflow'
  );

  // Test 10: Value model in Demonstrations
  const demoSrc = fs.readFileSync('app/components/input-otp/input-otp-demonstrations.tsx', 'utf8');
  assert(demoSrc.includes('PrimaryInputOTPDemo'), 'Primary verification code demo present');
  assert(demoSrc.includes('GroupedInputOTPDemo'), 'Grouped 3-3 code demo present');
  assert(demoSrc.includes('ContinuousPinDemo'), 'Continuous 4-digit PIN demo present');
  assert(demoSrc.includes('ControlledInputOTPDemo'), 'Controlled state demo present');
  assert(demoSrc.includes('InvalidInputOTPDemo'), 'Invalid state demo present');
  assert(demoSrc.includes('DisabledInputOTPDemo'), 'Disabled state demo present');

  // Test 11: Callouts in documentation
  const docSrc = fs.readFileSync('app/components/input-otp/page.tsx', 'utf8');
  assert(docSrc.includes('The segmented slots represent one logical value'), 'Section 121 Single-Input Callout present');
  assert(docSrc.includes('Input OTP captures a one-time code; it does not verify it'), 'Section 120 OTP Responsibility Callout present');
  assert(docSrc.includes('autocomplete="one-time-code"'), 'Section 122 Autofill Callout present');
  assert(docSrc.includes('Completing the final slot should not automatically verify or submit'), 'Section 123 Auto-Submit Callout present');

  if (failures === 0) {
    console.log('\n🎉 ALL INPUT OTP REGRESSION TESTS PASSED!\n');
    process.exit(0);
  } else {
    console.error(`\n💥 ${failures} REGRESSION TESTS FAILED!\n`);
    process.exit(1);
  }
}

testInputOtpRegression();
