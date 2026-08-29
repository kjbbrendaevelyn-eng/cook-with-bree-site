// Port of the Nayuki QR Code generator algorithm (MIT License)
// https://github.com/nayuki/QR-Code-generator
// Vendored from https://github.com/synapxLab/qrcode

export interface QRCodeOptions {
  size?: number;
  color?: string;
  background?: string;
  errorCorrection?: "L" | "M" | "Q" | "H";
  margin?: number;
}

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();

function gfMul(a: number, b: number): number {
  return a && b ? GF_EXP[(GF_LOG[a] + GF_LOG[b]) % 255] : 0;
}

function rsGenPoly(degree: number): number[] {
  const result = new Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < result.length; j++) {
      result[j] = gfMul(result[j], root);
      if (j + 1 < result.length) result[j] ^= result[j + 1];
    }
    root = gfMul(root, 0x02);
  }
  return result;
}

function rsRemainder(data: number[], divisor: number[]): number[] {
  const result = divisor.map(() => 0);
  for (const b of data) {
    const factor = b ^ (result.shift() as number);
    result.push(0);
    divisor.forEach((coef, i) => {
      result[i] ^= gfMul(coef, factor);
    });
  }
  return result;
}

const CHAR_CAP: { L: number; M: number; Q: number; H: number }[] = [
  { L: 0, M: 0, Q: 0, H: 0 },
  { L: 17, M: 14, Q: 11, H: 7 },
  { L: 32, M: 26, Q: 20, H: 14 },
  { L: 53, M: 42, Q: 32, H: 24 },
  { L: 78, M: 62, Q: 46, H: 34 },
  { L: 106, M: 84, Q: 60, H: 48 },
  { L: 134, M: 106, Q: 74, H: 57 },
  { L: 154, M: 122, Q: 86, H: 69 },
  { L: 192, M: 152, Q: 108, H: 79 },
  { L: 230, M: 180, Q: 130, H: 97 },
  { L: 271, M: 213, Q: 151, H: 119 },
  { L: 321, M: 251, Q: 177, H: 137 },
  { L: 367, M: 287, Q: 203, H: 155 },
  { L: 425, M: 331, Q: 241, H: 177 },
  { L: 458, M: 362, Q: 258, H: 194 },
  { L: 520, M: 412, Q: 292, H: 220 },
  { L: 586, M: 450, Q: 322, H: 250 },
  { L: 644, M: 504, Q: 364, H: 280 },
  { L: 718, M: 560, Q: 394, H: 310 },
  { L: 792, M: 624, Q: 442, H: 338 },
  { L: 858, M: 666, Q: 482, H: 382 },
  { L: 929, M: 711, Q: 509, H: 403 },
  { L: 1003, M: 779, Q: 565, H: 439 },
  { L: 1091, M: 857, Q: 611, H: 461 },
  { L: 1171, M: 911, Q: 661, H: 511 },
  { L: 1273, M: 997, Q: 715, H: 535 },
  { L: 1367, M: 1059, Q: 751, H: 593 },
  { L: 1465, M: 1125, Q: 805, H: 625 },
  { L: 1528, M: 1190, Q: 868, H: 658 },
  { L: 1628, M: 1264, Q: 908, H: 698 },
  { L: 1732, M: 1370, Q: 982, H: 742 },
  { L: 1840, M: 1452, Q: 1030, H: 790 },
  { L: 1952, M: 1538, Q: 1112, H: 842 },
  { L: 2068, M: 1628, Q: 1168, H: 898 },
  { L: 2188, M: 1722, Q: 1228, H: 958 },
  { L: 2303, M: 1809, Q: 1283, H: 983 },
  { L: 2431, M: 1911, Q: 1351, H: 1051 },
  { L: 2563, M: 1989, Q: 1423, H: 1093 },
  { L: 2699, M: 2099, Q: 1499, H: 1139 },
  { L: 2809, M: 2213, Q: 1579, H: 1219 },
  { L: 2953, M: 2331, Q: 1663, H: 1273 },
];

const EC_PARAMS: Record<string, [number, number, number, number, number]> = {
  "1L": [7, 1, 19, 0, 0],
  "1M": [10, 1, 16, 0, 0],
  "1Q": [13, 1, 13, 0, 0],
  "1H": [17, 1, 9, 0, 0],
  "2L": [10, 1, 34, 0, 0],
  "2M": [16, 1, 28, 0, 0],
  "2Q": [22, 1, 22, 0, 0],
  "2H": [28, 1, 16, 0, 0],
  "3L": [15, 1, 55, 0, 0],
  "3M": [26, 1, 44, 0, 0],
  "3Q": [18, 2, 17, 0, 0],
  "3H": [22, 2, 13, 0, 0],
  "4L": [20, 1, 80, 0, 0],
  "4M": [18, 2, 32, 0, 0],
  "4Q": [26, 2, 24, 0, 0],
  "4H": [16, 4, 9, 0, 0],
  "5L": [26, 1, 108, 0, 0],
  "5M": [24, 2, 43, 0, 0],
  "5Q": [18, 2, 15, 2, 16],
  "5H": [22, 2, 11, 2, 12],
  "6L": [18, 2, 68, 0, 0],
  "6M": [16, 4, 27, 0, 0],
  "6Q": [24, 4, 19, 0, 0],
  "6H": [28, 4, 15, 0, 0],
  "7L": [20, 2, 78, 0, 0],
  "7M": [18, 4, 31, 0, 0],
  "7Q": [18, 2, 14, 4, 15],
  "7H": [26, 4, 13, 1, 14],
  "8L": [24, 2, 97, 0, 0],
  "8M": [22, 2, 38, 2, 39],
  "8Q": [22, 4, 18, 2, 19],
  "8H": [26, 4, 14, 2, 15],
  "9L": [30, 2, 116, 0, 0],
  "9M": [22, 3, 36, 2, 37],
  "9Q": [20, 4, 16, 4, 17],
  "9H": [24, 4, 12, 4, 13],
  "10L": [18, 2, 68, 2, 69],
  "10M": [26, 4, 43, 1, 44],
  "10Q": [24, 6, 19, 2, 20],
  "10H": [28, 6, 15, 2, 16],
};

function getVersion(byteLen: number, ec: "L" | "M" | "Q" | "H"): number {
  for (let v = 1; v <= 40; v++) if (CHAR_CAP[v][ec] >= byteLen) return v;
  throw new Error(`QR: text too long`);
}

function totalDataCW(version: number, ec: "L" | "M" | "Q" | "H"): number {
  const [, b1, d1, b2, d2] = EC_PARAMS[`${version}${ec}`];
  return b1 * d1 + b2 * d2;
}

function encodeData(text: string, version: number, ec: "L" | "M" | "Q" | "H"): number[] {
  const raw = new TextEncoder().encode(text);
  const cap = totalDataCW(version, ec);
  const bits: number[] = [];
  const push = (v: number, n: number) => {
    for (let i = n - 1; i >= 0; i--) bits.push((v >> i) & 1);
  };

  push(0b0100, 4);
  push(raw.length, version < 10 ? 8 : 16);
  for (const b of raw) push(b, 8);
  for (let i = 0; i < 4 && bits.length < cap * 8; i++) bits.push(0);
  while (bits.length % 8) bits.push(0);
  const PAD = [0xec, 0x11];
  for (let p = 0; bits.length < cap * 8; p++) push(PAD[p % 2], 8);

  const out: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i + j] ?? 0);
    out.push(b);
  }
  return out;
}

function buildCodewords(data: number[], version: number, ec: "L" | "M" | "Q" | "H"): number[] {
  const [ecPB, b1, d1, b2, d2] = EC_PARAMS[`${version}${ec}`];
  const gen = rsGenPoly(ecPB);
  const dBlocks: number[][] = [];
  const eBlocks: number[][] = [];
  let off = 0;
  for (let b = 0; b < b1 + b2; b++) {
    const len = b < b1 ? d1 : d2;
    const blk = data.slice(off, off + len);
    off += len;
    dBlocks.push(blk);
    eBlocks.push(rsRemainder(blk, gen));
  }
  const out: number[] = [];
  const mxD = Math.max(...dBlocks.map((b) => b.length));
  for (let i = 0; i < mxD; i++) for (const blk of dBlocks) if (i < blk.length) out.push(blk[i]);
  for (let i = 0; i < ecPB; i++) for (const blk of eBlocks) if (i < blk.length) out.push(blk[i]);
  return out;
}

function makeMatrix(n: number): number[][] {
  return Array.from({ length: n }, () => new Array(n).fill(-1));
}

const DFN = 3;

function fn(m: number[][], row: number, col: number, dark: boolean): void {
  m[row][col] = dark ? DFN : 2;
}

function drawFinder(m: number[][], centerRow: number, centerCol: number): void {
  for (let dy = -4; dy <= 4; dy++) {
    for (let dx = -4; dx <= 4; dx++) {
      const r = centerRow + dy;
      const c = centerCol + dx;
      if (r >= 0 && r < m.length && c >= 0 && c < m.length) {
        fn(
          m,
          r,
          c,
          Math.max(Math.abs(dy), Math.abs(dx)) !== 2 &&
            Math.max(Math.abs(dy), Math.abs(dx)) !== 4
        );
      }
    }
  }
}

function drawAlignment(m: number[][], row: number, col: number): void {
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++)
      fn(m, row + dy, col + dx, Math.max(Math.abs(dy), Math.abs(dx)) !== 1);
}

function drawTiming(m: number[][], size: number): void {
  for (let i = 8; i < size - 8; i++) {
    fn(m, 6, i, i % 2 === 0);
    fn(m, i, 6, i % 2 === 0);
  }
}

function reserveFormatArea(m: number[][], size: number): void {
  for (let i = 0; i <= 8; i++) if (i !== 6) fn(m, i, 8, false);
  for (let i = 0; i <= 8; i++) if (i !== 6) fn(m, 8, i, false);
  for (let i = 0; i < 8; i++) fn(m, 8, size - 1 - i, false);
  for (let i = 8; i < 15; i++) fn(m, size - 15 + i, 8, false);
  fn(m, size - 8, 8, true);
}

function writeFormatInfo(m: number[][], mask: number, ec: "L" | "M" | "Q" | "H"): void {
  const ecInd: Record<string, number> = { L: 1, M: 0, Q: 3, H: 2 };
  const data = (ecInd[ec] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  const bits = (data << 10) | rem ^ 0x5412;
  const b = (i: number) => ((bits >> i) & 1) === 1;
  const size = m.length;

  for (let i = 0; i <= 5; i++) fn(m, i, 8, b(i));
  fn(m, 7, 8, b(6));
  fn(m, 8, 8, b(7));
  fn(m, 8, 7, b(8));
  for (let i = 9; i < 15; i++) fn(m, 8, 14 - i, b(i));
  for (let i = 0; i < 8; i++) fn(m, 8, size - 1 - i, b(i));
  for (let i = 8; i < 15; i++) fn(m, size - 15 + i, 8, b(i));
  fn(m, size - 8, 8, true);
}

function reserveVersionArea(m: number[][], size: number): void {
  for (let i = 0; i < 18; i++) {
    const r = Math.floor(i / 3);
    const c = i % 3;
    fn(m, r, size - 11 + c, false);
    fn(m, size - 11 + c, r, false);
  }
}

function writeVersionInfo(m: number[][], version: number): void {
  let rem = version;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
  const bits = (version << 12) | rem;
  for (let i = 0; i < 18; i++) {
    const dark = ((bits >> i) & 1) === 1;
    const r = Math.floor(i / 3);
    const c = i % 3;
    fn(m, r, m.length - 11 + c, dark);
    fn(m, m.length - 11 + c, r, dark);
  }
}

function placeData(m: number[][], cw: number[]): void {
  const size = m.length;
  let idx = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const col = right - j;
        const upward = ((right + 1) & 2) === 0;
        const row = upward ? size - 1 - vert : vert;
        if (m[row][col] === -1 && idx < cw.length * 8) {
          m[row][col] = (cw[idx >>> 3] >> (7 - (idx & 7))) & 1;
          idx++;
        }
      }
    }
  }
}

function applyMask(m: number[][], mi: number): number[][] {
  const patterns: ((r: number, c: number) => boolean)[] = [
    (r, c) => (r + c) % 2 === 0,
    (r) => r % 2 === 0,
    (_r, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
    (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
    (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
  ];
  const maskFn = patterns[mi];
  return m.map((row, r) =>
    row.map((cell, c) => (cell === 0 || cell === 1 ? (maskFn(r, c) ? cell ^ 1 : cell) : cell))
  );
}

function penaltyScore(m: number[][]): number {
  const size = m.length;
  const dark = (r: number, c: number) => m[r][c] === 1 || m[r][c] === DFN;
  let score = 0;

  for (let i = 0; i < size; i++) {
    for (let col = 0; col < 2; col++) {
      let run = 1;
      for (let j = 1; j < size; j++) {
        const a = col ? dark(j - 1, i) : dark(i, j - 1);
        const b = col ? dark(j, i) : dark(i, j);
        if (a === b) {
          run++;
          if (run === 5) score += 3;
          else if (run > 5) score++;
        } else run = 1;
      }
    }
  }

  for (let r = 0; r < size - 1; r++)
    for (let c = 0; c < size - 1; c++) {
      const d = dark(r, c);
      if (d === dark(r + 1, c) && d === dark(r, c + 1) && d === dark(r + 1, c + 1)) score += 3;
    }

  const PAT_A = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const PAT_B = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  for (const pat of [PAT_A, PAT_B]) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - 11; j++) {
        let matchRow = true;
        let matchCol = true;
        for (let k = 0; k < 11; k++) {
          if (dark(i, j + k) !== (pat[k] === 1)) matchRow = false;
          if (dark(j + k, i) !== (pat[k] === 1)) matchCol = false;
        }
        if (matchRow) score += 40;
        if (matchCol) score += 40;
      }
    }
  }

  let darkCount = 0;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (dark(r, c)) darkCount++;
  const total = size * size;
  score += (Math.ceil(Math.abs(darkCount * 20 - total * 10) / total) - 1) * 10;

  return score;
}

function chooseBestMask(m: number[][], ec: "L" | "M" | "Q" | "H"): number[][] {
  let best = m;
  let bestScore = Infinity;
  for (let mi = 0; mi < 8; mi++) {
    const copy = m.map((r) => [...r]);
    writeFormatInfo(copy, mi, ec);
    const masked = applyMask(copy, mi);
    const s = penaltyScore(masked);
    if (s < bestScore) {
      bestScore = s;
      best = masked;
    }
  }
  return best;
}

function renderSVG(matrix: number[][], opts: Required<QRCodeOptions>): string {
  const size = matrix.length;
  const mod = opts.size / (size + opts.margin * 2);
  const total = opts.size;
  let rects = "";
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (matrix[r][c] === 1 || matrix[r][c] === DFN) {
        const x = ((c + opts.margin) * mod).toFixed(3);
        const y = ((r + opts.margin) * mod).toFixed(3);
        const s = (mod + 0.05).toFixed(3);
        rects += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${opts.color}"/>`;
      }
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}">` +
    `<rect width="100%" height="100%" fill="${opts.background}"/>` +
    `${rects}</svg>`
  );
}

function getAlignmentPositions(version: number): number[] {
  if (version === 1) return [];
  const numAlign = Math.floor(version / 7) + 2;
  const size = version * 4 + 17;
  const step = Math.floor((version * 8 + numAlign * 3 + 5) / (numAlign * 4 - 4)) * 2;
  const result: number[] = [6];
  for (let pos = size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
  return result;
}

export class QRCode {
  static toSVG(text: string, options: QRCodeOptions = {}): string {
    const opts: Required<QRCodeOptions> = {
      size: options.size ?? 200,
      color: options.color ?? "#000000",
      background: options.background ?? "#ffffff",
      errorCorrection: options.errorCorrection ?? "M",
      margin: options.margin ?? 4,
    };

    const ec = opts.errorCorrection;
    const bytes = new TextEncoder().encode(text);
    const version = getVersion(bytes.length, ec);
    const size = version * 4 + 17;
    const m = makeMatrix(size);

    drawFinder(m, 3, 3);
    drawFinder(m, 3, size - 4);
    drawFinder(m, size - 4, 3);
    drawTiming(m, size);

    if (version >= 2) {
      const ap = getAlignmentPositions(version);
      const last = ap.length - 1;
      for (let i = 0; i < ap.length; i++)
        for (let j = 0; j < ap.length; j++) {
          if (i === 0 && j === 0) continue;
          if (i === 0 && j === last) continue;
          if (i === last && j === 0) continue;
          drawAlignment(m, ap[i], ap[j]);
        }
    }

    reserveFormatArea(m, size);
    if (version >= 7) reserveVersionArea(m, size);

    const data = encodeData(text, version, ec);
    const cw = buildCodewords(data, version, ec);
    placeData(m, cw);

    const best = chooseBestMask(m, ec);
    if (version >= 7) writeVersionInfo(best, version);
    return renderSVG(best, opts);
  }
}
