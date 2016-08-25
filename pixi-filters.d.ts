/// <reference path="pixi.js.d.ts" />

// Type definitions for pixi-filters
// Project: https://github.com/pixijs/pixi-filters
// Definitions by: bigtimebuddy <https://github.com/pixijs/pixi-typescript>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module PIXI {

    export module filters {

        export class AsciiFilter extends PIXI.Filter {

            size: number;
        }

        export class BloomFilter extends PIXI.Filter {

            blur: number;
            blurX: number;
            blurY: number;

        }

        export class ConvolutionFilter extends PIXI.Filter {

            constructor(matrix: number[], width:number, height: number);

            height:number;
            width:number;
            matrix: number[];
        }

        export class CrossHatchFilter extends PIXI.Filter {

        }

        export class DotFilter extends PIXI.Filter {

            angle:number;
            scale:number;
        }

        export class EmbossFilter extends PIXI.Filter {

            strength:number;
        }

        export class PixelateFilter extends PIXI.Filter {

            size:PIXI.Point;
        }

        export class RGBSplitFilter extends PIXI.Filter {

            blue:PIXI.Point;
            green:PIXI.Point;
            red:PIXI.Point;
        }

        export class ShockwaveFilter extends PIXI.Filter {

            center:{[id:string]: number};
            params:{[id:string]: number};
            time:number;

        }

        export class TiltShiftAxisFilter extends PIXI.Filter {

            blur:number;
            end:PIXI.Point;
            gradientBlur:number;
            start:PIXI.Point;
            updateDelta(): void;
        }

        export class TiltShiftFilter extends PIXI.Filter {

            tiltShiftXFilter:TiltShiftXFilter;
            tiltShiftYFilter:TiltShiftYFilter;
            blur:number;
            end:PIXI.Point;
            gradientBlur:number;
            start:PIXI.Point;
        }

        export class TiltShiftYFilter extends TiltShiftAxisFilter {

            updateDelta(): void;
        }

        export class TiltShiftXFilter extends TiltShiftAxisFilter {

            updateDelta(): void;
        }

        export class TwistFilter extends PIXI.Filter {

            angle:number;
            offset:PIXI.Point;
            radius:number;
        }

    }

}