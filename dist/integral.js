"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionSum = exports.computeIntegral = void 0;
function computeIntegral(img) {
    const width = img.width;
    const height = img.height;
    const size = (width + 1) * (height + 1);
    const iR = new Float64Array(size);
    const iG = new Float64Array(size);
    const iB = new Float64Array(size);
    const iA = new Float64Array(size);
    for (let y = 1; y <= height; y++) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let sumA = 0;
        for (let x = 1; x <= width; x++) {
            const p = ((y - 1) * width + (x - 1)) * 4;
            sumR += img.data[p];
            sumG += img.data[p + 1];
            sumB += img.data[p + 2];
            sumA += img.data[p + 3];
            const idx = y * (width + 1) + x;
            iR[idx] = iR[idx - (width + 1)] + sumR;
            iG[idx] = iG[idx - (width + 1)] + sumG;
            iB[idx] = iB[idx - (width + 1)] + sumB;
            iA[idx] = iA[idx - (width + 1)] + sumA;
        }
    }
    return { width, height, integralR: iR, integralG: iG, integralB: iB, integralA: iA };
}
exports.computeIntegral = computeIntegral;
function regionSum(i, x, y, w, h) {
    const width1 = i.width + 1;
    const x1 = Math.floor(x);
    const y1 = Math.floor(y);
    const x2 = Math.floor(x + w);
    const y2 = Math.floor(y + h);
    const idxA = y1 * width1 + x1;
    const idxB = y1 * width1 + x2;
    const idxC = y2 * width1 + x1;
    const idxD = y2 * width1 + x2;
    return {
        r: i.integralR[idxD] - i.integralR[idxB] - i.integralR[idxC] + i.integralR[idxA],
        g: i.integralG[idxD] - i.integralG[idxB] - i.integralG[idxC] + i.integralG[idxA],
        b: i.integralB[idxD] - i.integralB[idxB] - i.integralB[idxC] + i.integralB[idxA],
        a: i.integralA[idxD] - i.integralA[idxB] - i.integralA[idxC] + i.integralA[idxA]
    };
}
exports.regionSum = regionSum;
