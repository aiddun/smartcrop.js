export interface ImgData {
    width: number;
    height: number;
    data: Uint8ClampedArray;
}
export interface IntegralImage {
    width: number;
    height: number;
    integralR: Float64Array;
    integralG: Float64Array;
    integralB: Float64Array;
    integralA: Float64Array;
}
export declare function computeIntegral(img: ImgData): IntegralImage;
export declare function regionSum(i: IntegralImage, x: number, y: number, w: number, h: number): {
    r: number;
    g: number;
    b: number;
    a: number;
};
