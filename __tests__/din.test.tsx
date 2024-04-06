import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import { calculateDIN } from "@/app/din";

/**
 * Manually tested against
 * https://www.dincalculator.com/result
 * https://www.freeride.com/din-calculator/
 * NOTE: the freeride calculator has a min weight/height and includes new and expert skier levels
 */
const ISO_CASES = [
  { weight: 12, height: 80, age: 6, len: 180, level: 1, expected: 0.75 },
  { weight: 78, height: 180, age: 30, len: 305, level: 1, expected: 5.5 },
  { weight: 78, height: 180, age: 30, len: 305, level: 2, expected: 6.5 },
  { weight: 78, height: 180, age: 30, len: 305, level: 3, expected: 8 },
  { weight: 80, height: 180, age: 30, len: 305, level: 3, expected: 9.5 },
  { weight: 78, height: 178, age: 30, len: 305, level: 1, expected: 5.5 },
];
describe("DIN Calc", () => {
  test.each(ISO_CASES)(
    "calculateDIN($weight, $height, $age, $len, $level)",
    ({ weight, height, age, len, level, expected }) => {
      expect(calculateDIN(weight, height, age, len, level).result).toBe(
        expected,
      );
    },
  );
});
