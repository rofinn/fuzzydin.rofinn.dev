// DIN lookup table is based on https://skiboards.com/ski-binding-din-settings-chart/
export const DIN: { [skier: string]: { [boot: number]: number } } = {
  A: { 1: 0.75, 2: 0.75, 3: 0.75 },
  B: { 1: 1, 2: 0.75, 3: 0.75, 4: 0.75 },
  C: { 1: 1.5, 2: 1.25, 3: 1.25, 4: 1 },
  D: { 1: 2, 2: 1.75, 3: 1.5, 4: 1.5, 5: 1.25 },
  E: { 1: 2.5, 2: 2.25, 3: 2, 4: 1.75, 5: 1.5, 6: 1.5 },
  F: { 1: 3, 2: 2.75, 3: 2.5, 4: 2.25, 5: 2, 6: 1.75, 7: 1.75 },
  G: { 2: 3.5, 3: 3, 4: 2.75, 5: 2.5, 6: 2.25, 7: 2 },
  H: { 3: 3.5, 4: 3, 5: 3, 6: 2.75, 7: 2.5 },
  I: { 3: 4.5, 4: 4, 5: 3.5, 6: 3.5, 7: 3 },
  J: { 3: 5.5, 4: 5, 5: 4.5, 6: 4, 7: 3.5, 8: 3 },
  K: { 3: 6.5, 4: 6, 5: 5.5, 6: 5, 7: 4.5, 8: 4 },
  L: { 3: 7.5, 4: 7, 5: 6.5, 6: 6, 7: 5.5, 8: 5 },
  M: { 4: 8.5, 5: 8, 6: 7, 7: 6.5, 8: 6 },
  N: { 4: 10, 5: 9.5, 6: 8.5, 7: 8, 8: 7.5 },
  O: { 4: 11.5, 5: 11, 6: 10, 7: 9.5, 8: 9 },
  P: { 6: 12, 7: 11, 8: 10.5 },
};

export const SKIER_WEIGHTS: { code: string; lo: number; hi: number }[] = [
  { code: "A", lo: 10, hi: 12 },
  { code: "B", lo: 14, hi: 17 },
  { code: "C", lo: 18, hi: 21 },
  { code: "D", lo: 22, hi: 25 },
  { code: "E", lo: 26, hi: 30 },
  { code: "F", lo: 31, hi: 35 },
  { code: "G", lo: 36, hi: 41 },
  { code: "H", lo: 42, hi: 48 },
  { code: "I", lo: 49, hi: 57 },
  { code: "J", lo: 58, hi: 66 },
  { code: "K", lo: 67, hi: 78 },
  { code: "L", lo: 79, hi: 94 },
  { code: "M", lo: 95, hi: 1000 },
  { code: "N", lo: 95, hi: 1000 },
  { code: "O", lo: 95, hi: 1000 },
  { code: "P", lo: 95, hi: 1000 },
];

export const SKIER_HEIGHTS: { code: string; lo: number; hi: number }[] = [
  { code: "H", lo: 0, hi: 148 },
  { code: "I", lo: 149, hi: 157 },
  { code: "J", lo: 158, hi: 166 },
  { code: "K", lo: 167, hi: 178 },
  { code: "L", lo: 179, hi: 194 },
  { code: "M", lo: 195, hi: 1000 },
  { code: "N", lo: 195, hi: 1000 },
  { code: "O", lo: 195, hi: 1000 },
  { code: "P", lo: 195, hi: 1000 },
];

export const BOOT_LENGTHS: { code: number; lo: number; hi: number }[] = [
  { code: 1, lo: 0, hi: 230 },
  { code: 2, lo: 231, hi: 250 },
  { code: 3, lo: 251, hi: 270 },
  { code: 4, lo: 271, hi: 290 },
  { code: 5, lo: 291, hi: 310 },
  { code: 6, lo: 311, hi: 330 },
  { code: 7, lo: 331, hi: 350 },
  { code: 8, lo: 351, hi: 1000 },
];
