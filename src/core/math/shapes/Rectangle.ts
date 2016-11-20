namespace core.math {

    export interface IShape {
        type: number;
    }

    /**
     * Rectangle object is an area defined by its position, as indicated by its top-left corner
     * point (x, y) and by its width and its height.
     *
     * @class
     * @memberof PIXI
     */
    export class Rectangle implements IShape {
        x: number;
        y: number;
        width: number;
        height: number;
        type: number = 1;

        /**
         * @param {number} [x=0] - The X coordinate of the upper-left corner of the rectangle
         * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rectangle
         * @param {number} [width=0] - The overall width of this rectangle
         * @param {number} [height=0] - The overall height of this rectangle
         */
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.x = x;

            this.y = y;

            this.width = width;

            this.height = height;

            this.type = 1;
        }

        /**
         * returns the left edge of the rectangle
         *
         * @member {number}
         * @memberof PIXI.Rectangle#
         */
        get left(): number {
            return this.x;
        }

        /**
         * returns the right edge of the rectangle
         *
         * @member {number}
         * @memberof PIXI.Rectangle
         */
        get right(): number {
            return this.x + this.width;
        }

        /**
         * returns the top edge of the rectangle
         *
         * @member {number}
         * @memberof PIXI.Rectangle
         */
        get top(): number {
            return this.y;
        }

        /**
         * returns the bottom edge of the rectangle
         *
         * @member {number}
         * @memberof PIXI.Rectangle
         */
        get bottom(): number {
            return this.y + this.height;
        }

        /**
         * A constant empty rectangle.
         *
         * @static
         * @constant
         */
        static get EMPTY() {
            return new Rectangle(0, 0, 0, 0);
        }

        /**
         * Creates a clone of this Rectangle
         *
         * @return {PIXI.Rectangle} a copy of the rectangle
         */
        clone(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }

        /**
         * Copies another rectangle to this one.
         *
         * @param {PIXI.Rectangle} rectangle - The rectangle to copy.
         * @return {PIXI.Rectangle} Returns itself.
         */
        copy(rectangle: Rectangle): Rectangle {
            this.x = rectangle.x;
            this.y = rectangle.y;
            this.width = rectangle.width;
            this.height = rectangle.height;

            return this;
        }

        /**
         * Checks whether the x and y coordinates given are contained within this Rectangle
         *
         * @param {number} x - The X coordinate of the point to test
         * @param {number} y - The Y coordinate of the point to test
         * @return {boolean} Whether the x/y coordinates are within this Rectangle
         */
        contains(x: number, y: number) {
            if (this.width <= 0 || this.height <= 0) {
                return false;
            }

            if (x >= this.x && x < this.x + this.width) {
                if (y >= this.y && y < this.y + this.height) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Pads the rectangle making it grow in all directions.
         *
         * @param {number} paddingX - The horizontal padding amount.
         * @param {number} paddingY - The vertical padding amount.
         */
        pad(paddingX: number, paddingY: number) {
            paddingX = paddingX || 0;
            paddingY = paddingY || ((paddingY !== 0) ? paddingX : 0);

            this.x -= paddingX;
            this.y -= paddingY;

            this.width += paddingX * 2;
            this.height += paddingY * 2;
        }

        /**
         * Fits this rectangle around the passed one.
         *
         * @param {PIXI.Rectangle} rectangle - The rectangle to fit.
         */
        fit(rectangle: Rectangle) {
            if (this.x < rectangle.x) {
                this.width += this.x;
                if (this.width < 0) {
                    this.width = 0;
                }

                this.x = rectangle.x;
            }

            if (this.y < rectangle.y) {
                this.height += this.y;
                if (this.height < 0) {
                    this.height = 0;
                }
                this.y = rectangle.y;
            }

            if (this.x + this.width > rectangle.x + rectangle.width) {
                this.width = rectangle.width - this.x;
                if (this.width < 0) {
                    this.width = 0;
                }
            }

            if (this.y + this.height > rectangle.y + rectangle.height) {
                this.height = rectangle.height - this.y;
                if (this.height < 0) {
                    this.height = 0;
                }
            }
        }

        /**
         * Enlarges this rectangle to include the passed rectangle.
         *
         * @param {PIXI.Rectangle} rect - The rectangle to include.
         */
        enlarge(rect: Rectangle) {
            if (rect === Rectangle.EMPTY) {
                return;
            }

            const x1 = Math.min(this.x, rect.x);
            const x2 = Math.max(this.x + this.width, rect.x + rect.width);
            const y1 = Math.min(this.y, rect.y);
            const y2 = Math.max(this.y + this.height, rect.y + rect.height);

            this.x = x1;
            this.width = x2 - x1;
            this.y = y1;
            this.height = y2 - y1;
        }
    }
}
