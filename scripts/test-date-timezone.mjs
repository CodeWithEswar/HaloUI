import assert from 'node:assert/strict';

console.log('=== Date Picker Timezone & DST Boundary Regression Test ===\n');

// The exact implementation of parseDateOnly and formatDateOnly from components/ui/date-picker.tsx
function parseDateOnly(value) {
  if (!value) return null;

  if (value instanceof Date) {
    if (isNaN(value.getTime())) return null;
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      const parsed = new Date(year, month, day);
      return !isNaN(parsed.getTime()) ? parsed : null;
    }

    const standardParsed = new Date(trimmed);
    if (!isNaN(standardParsed.getTime())) {
      return new Date(
        standardParsed.getFullYear(),
        standardParsed.getMonth(),
        standardParsed.getDate()
      );
    }
  }

  return null;
}

function formatDateOnly(date) {
  if (!date || isNaN(date.getTime())) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 1. Fixed synthetic calendar dates
const testCases = [
  { input: "2026-09-25", expectedYear: 2026, expectedMonth: 8, expectedDay: 25 },
  { input: "2026-01-01", expectedYear: 2026, expectedMonth: 0, expectedDay: 1 },
  { input: "2026-12-31", expectedYear: 2026, expectedMonth: 11, expectedDay: 31 },
  { input: "2024-02-29", expectedYear: 2024, expectedMonth: 1, expectedDay: 29 }, // Leap year
  // DST transition dates (US and Europe)
  { input: "2026-03-08", expectedYear: 2026, expectedMonth: 2, expectedDay: 8 },  // US Spring forward
  { input: "2026-11-01", expectedYear: 2026, expectedMonth: 10, expectedDay: 1 }, // US Fall back
  { input: "2026-03-29", expectedYear: 2026, expectedMonth: 2, expectedDay: 29 }, // EU Spring forward
  { input: "2026-10-25", expectedYear: 2026, expectedMonth: 9, expectedDay: 25 }, // EU Fall back
];

for (const tc of testCases) {
  const parsed = parseDateOnly(tc.input);
  assert.ok(parsed !== null, `Failed to parse ${tc.input}`);
  assert.equal(parsed.getFullYear(), tc.expectedYear, `Year mismatch for ${tc.input}`);
  assert.equal(parsed.getMonth(), tc.expectedMonth, `Month mismatch for ${tc.input}`);
  assert.equal(parsed.getDate(), tc.expectedDay, `Day mismatch for ${tc.input}`);

  // Re-format back to date-only string
  const formatted = formatDateOnly(parsed);
  assert.equal(formatted, tc.input, `Round-trip mismatch: got ${formatted}, expected ${tc.input}`);
  console.log(`✓ Verified date-only round-trip for ${tc.input}`);
}

// 2. Verify that local Date objects preserve their exact local day
const localDate = new Date(2026, 8, 25, 23, 59, 59); // 11:59:59 PM local
const normalized = parseDateOnly(localDate);
assert.equal(normalized.getDate(), 25);
assert.equal(formatDateOnly(normalized), "2026-09-25");
console.log('✓ Verified local midnight normalization for late-night timestamp');

const earlyMorningDate = new Date(2026, 8, 25, 0, 0, 1); // 12:00:01 AM local
const normalizedEarly = parseDateOnly(earlyMorningDate);
assert.equal(normalizedEarly.getDate(), 25);
assert.equal(formatDateOnly(normalizedEarly), "2026-09-25");
console.log('✓ Verified local midnight normalization for early-morning timestamp');

// 3. Verify null and invalid inputs
assert.equal(parseDateOnly(null), null);
assert.equal(parseDateOnly(undefined), null);
assert.equal(parseDateOnly(""), null);
assert.equal(parseDateOnly("not-a-date"), null);
assert.equal(formatDateOnly(null), null);
assert.equal(formatDateOnly(undefined), null);
console.log('✓ Verified null and malformed input safety');

console.log('\n======================================================');
console.log('🎉 ALL TIMEZONE AND CALENDAR BOUNDARY TESTS PASSED!');
console.log('======================================================\n');
