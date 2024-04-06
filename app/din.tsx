import { DIN, SKIER_WEIGHTS, SKIER_HEIGHTS, BOOT_LENGTHS } from "./constants";

/**
 * Return the fuzzy codes from the provided lookup array
 * @param codes A lookup array for the codes
 * @param i The default code location that must be returned
 * @param val The original value used to identify location i
 * @param fuzz Whether to return a fuzzy (weighted) result
 * @return An object contain equal length arrays for codes and weights (length is 1 if fuzz=false)
 */
function getFuzzyCodes(
  codes: { code: any; lo: number; hi: number }[],
  i: number,
  val: number,
  fuzz = false,
) {
  const entry = codes[i];
  const mean = (entry.lo + entry.hi) / 2;

  if (fuzz && val < mean && i > 0) {
    const e = codes[i - 1];
    const m = (e.lo + e.hi) / 2;
    const n = mean - m;
    const r = (mean - val) / n;

    return {
      codes: [entry.code, e.code],
      weights: [1.0 - r, r],
    };
  } else if (fuzz && val > mean && i < codes.length - 1) {
    const e = codes[i + 1];
    const m = (e.lo + e.hi) / 2;
    const n = m - mean;
    const r = (val - mean) / n;

    return {
      codes: [entry.code, e.code],
      weights: [1.0 - r, r],
    };
  } else {
    return {
      codes: [entry.code],
      weights: [1.0],
    };
  }
}

/**
 * Calculate the skier codes (e.g., "A", "B" .. "O")
 * @param weight The skier weight in kg
 * @param height The skier height in cm
 * @param age  The skier age
 * @param level The skier level 1 .. 3 (ie: aggressiveness)
 * @param fuzz  Whether we want the fuzzy result or just the default lookup value
 * @returns An object contain equal length arrays for codes and weights (length is 1 if fuzz=false)
 */
function getSkierCodes(
  weight: number,
  height: number,
  age: number,
  level = 1,
  fuzz = false,
) {
  console.assert(10 <= weight && weight <= 1000);
  console.assert(0 <= height && height <= 1000);
  console.assert(1 <= level && level <= 3);

  const i = SKIER_WEIGHTS.findIndex((w) => w.lo <= weight && weight <= w.hi);
  const j = SKIER_HEIGHTS.findIndex((h) => h.lo <= height && height <= h.hi);

  const useWeight = SKIER_WEIGHTS[i].code <= SKIER_HEIGHTS[j].code;
  const val = useWeight ? weight : height;
  const codes = useWeight ? SKIER_WEIGHTS : SKIER_HEIGHTS;
  const idx = useWeight ? i : j;

  const ans = getFuzzyCodes(codes, idx, val, fuzz);

  let k = level - 1;
  k -= age < 10 || age >= 50 ? 1 : 0;

  // Update the codes based on the skier skill level and age factor
  ans.codes = ans.codes.map((code) => {
    // Calculate the new charCode
    const val = code.charCodeAt() + k;
    // Clamp the code between 'A' (65) and 'P' (80)
    const result = Math.max(Math.min(val, 80), 65);
    return String.fromCharCode(result);
  });
  return ans;
}

/**
 * Calculate the boot length codes (e.g., 1, 2 .. 8)
 * @param len The boot length in mm
 * @param fuzz Whether we want the fuzzy result or just the default lookup value
 * @returns An object contain equal length arrays for codes and weights (length is 1 if fuzz=false)
 */
function getBootCodes(len: number, fuzz = false) {
  console.assert(0 <= len && len <= 1000);

  const i = BOOT_LENGTHS.findIndex((l) => l.lo <= len && len <= l.hi);
  console.assert(i >= 0);

  return getFuzzyCodes(BOOT_LENGTHS, i, len, fuzz);
}

export function calculateDIN(
  weight: number,
  height: number,
  age: number,
  len: number,
  level = 1,
  fuzz = false,
) {
  const boot = getBootCodes(len, fuzz);
  const skier = getSkierCodes(weight, height, age, level, fuzz);
  //   console.log(boot)
  //   console.log(skier)

  let ans = 0;
  for (let i = 0; i < boot.codes.length; i++) {
    for (let j = 0; j < skier.codes.length; j++) {
      const din = DIN[skier.codes[j]][boot.codes[i]];
      weight = skier.weights[j] * boot.weights[i];
      ans += din * weight;
    }
  }

  return {
    result: Math.round(ans * 4) / 4,
    skier: skier,
    boot: boot,
  };
}
