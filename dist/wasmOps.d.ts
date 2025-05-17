export interface ImgData {
    width: number;
    height: number;
    data: Uint8ClampedArray;
}
export declare function sobelEdge(input: ImgData): ImgData;
export declare function resize(input: ImgData, width: number, height: number): ImgData;
export declare function integralGray(input: ImgData): Int32Array;
