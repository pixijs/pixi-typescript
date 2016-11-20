namespace core.math {

    import Transform = core.display.Transform;
    /**
     * The Point object represents a location in a two-dimensional coordinate system, where x represents
     * the horizontal axis and y represents the vertical axis.
     *
     * @class
     * @memberof PIXI
     */
    export class Point {
        _x: number;
        _y: number;

        get x(): number {
            return this._x;
        }

        get y(): number {
            return this._x;
        }

        set x(value: number) {
            this._x = value;
        }

        set y(value: number) {
            this._y = value;
        }

        /**
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
         */
        constructor(x?: number, y?: number) {
            this._x = x || 0;
            this._y = y || 0;
        }

        /**
         * Creates a clone of this point
         *
         * @return {PIXI.Point} a copy of the point
         */
        clone() {
            return new Point(this._x, this._y);
        }

        /**
         * Copies x and y from the given point
         *
         * @param {PIXI.Point} p - The point to copy.
         */
        copy(p: Point) {
            this.set(p.x, p.y);
        }

        /**
         * Returns true if the given point is equal to this point
         *
         * @param {PIXI.Point} p - The point to check
         * @returns {boolean} Whether the given point equal to this point
         */
        equals(p: Point) {
            return (p.x === this._x) && (p.y === this._y);
        }

        /**
         * Sets the point to a new x and y position.
         * If y is omitted, both x and y will be set to x.
         *
         * @param {number} [x=0] - position of the point on the x axis
         * @param {number} [y=0] - position of the point on the y axis
         */
        set(x: number, y?: number) {
            this._x = x || 0;
            this._y = y || ((y !== 0) ? this.x : 0);
        }

    }

    export class ObservablePoint extends Point {
        _cb: Transform;

        constructor(cb: Transform, x: number, y: number) {
            super(x, y);
            this._cb = cb;
        }

        set x(value: number) {
            if (this._x !== value) {
                this._x = value;
                this._cb.onChange();
            }
        }

        set y(value: number) {
            if (this._y !== value) {
                this._y = value;
                this._cb.onChange();
            }
        }

        copy(p: Point) {
            if (this._x !== p.x || this._y !== p.y) {
                this._x = p.x;
                this._y = p.y;
                this._cb.onChange();
            }
        }

        set(x: number, y?: number) {
            x = x || 0;
            y = y || ((y !== 0) ? this.x : 0);

            if (this._x !== x || this._y !== y) {
                this._x = x;
                this._y = y;
                this._cb.onChange();
            }
        }
    }

    export class ObservableSkew extends Point {
        _cb: Transform;

        constructor(cb: Transform, x: number, y: number) {
            super(x, y);
            this._cb = cb;
        }

        set x(value: number) {
            if (this._x !== value) {
                this._x = value;
                this._cb.updateSkew();
            }
        }

        set y(value: number) {
            if (this._y !== value) {
                this._y = value;
                this._cb.updateSkew();
            }
        }

        copy(p: Point) {
            if (this._x !== p.x || this._y !== p.y) {
                this._x = p.x;
                this._y = p.y;
                this._cb.updateSkew();
            }
        }

        set(x: number, y?: number) {
            x = x || 0;
            y = y || ((y !== 0) ? this.x : 0);

            if (this._x !== x || this._y !== y) {
                this._x = x;
                this._y = y;
                this._cb.updateSkew();
            }
        }
    }
}
