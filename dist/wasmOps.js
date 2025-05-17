"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integralGray = exports.resize = exports.sobelEdge = void 0;
function sobelEdge(input) {
    if (typeof cv === 'undefined') {
        throw new Error('OpenCV.js is required for sobelEdge');
    }
    const src = cv.matFromImageData(new ImageData(input.data, input.width, input.height));
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    const grad = new cv.Mat();
    cv.Sobel(gray, grad, cv.CV_8U, 1, 1, 3, 1, 0, cv.BORDER_DEFAULT);
    const out = new Uint8ClampedArray(input.width * input.height * 4);
    for (let i = 0; i < grad.data.length; i++) {
        const p = i * 4;
        out[p + 1] = grad.data[i];
    }
    src.delete();
    gray.delete();
    grad.delete();
    return { width: input.width, height: input.height, data: out };
}
exports.sobelEdge = sobelEdge;
function resize(input, width, height) {
    if (typeof cv === 'undefined') {
        throw new Error('OpenCV.js is required for resize');
    }
    const src = cv.matFromImageData(new ImageData(input.data, input.width, input.height));
    const dst = new cv.Mat();
    const dsize = new cv.Size(width, height);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    const out = new ImageData(new Uint8ClampedArray(dst.data), width, height);
    src.delete();
    dst.delete();
    return { width: out.width, height: out.height, data: out.data };
}
exports.resize = resize;
function integralGray(input) {
    if (typeof cv === 'undefined') {
        throw new Error('OpenCV.js is required for integralGray');
    }
    const src = cv.matFromImageData(new ImageData(input.data, input.width, input.height));
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    const integ = new cv.Mat();
    cv.integral(gray, integ, cv.CV_32S);
    const out = new Int32Array(integ.data32S);
    src.delete();
    gray.delete();
    integ.delete();
    return out;
}
exports.integralGray = integralGray;
