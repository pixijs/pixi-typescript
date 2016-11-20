namespace core.math {

// Your friendly neighbour https://en.wikipedia.org/wiki/Dihedral_group of order 16

    const ux = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1];
    const uy = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1];
    const vx = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1];
    const vy = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1];
    const tempMatrices : Array<Matrix> = [];

    const mul : Array<Array<number>> = [];

    function signum(x: number) {
        if (x < 0) {
            return -1;
        }
        if (x > 0) {
            return 1;
        }

        return 0;
    }

    function init() {
        for (let i = 0; i < 16; i++) {
            const row : Array<number> = [];

            mul.push(row);

            for (let j = 0; j < 16; j++) {
                const _ux = signum((ux[i] * ux[j]) + (vx[i] * uy[j]));
                const _uy = signum((uy[i] * ux[j]) + (vy[i] * uy[j]));
                const _vx = signum((ux[i] * vx[j]) + (vx[i] * vy[j]));
                const _vy = signum((uy[i] * vx[j]) + (vy[i] * vy[j]));

                for (let k = 0; k < 16; k++) {
                    if (ux[k] === _ux && uy[k] === _uy && vx[k] === _vx && vy[k] === _vy) {
                        row.push(k);
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < 16; i++) {
            const mat = new Matrix();

            mat.set(ux[i], uy[i], vx[i], vy[i], 0, 0);
            tempMatrices.push(mat);
        }
    }

    init();

    /**
     * Implements Dihedral Group D_8, see [group D4]{@link http://mathworld.wolfram.com/DihedralGroupD4.html},
     * D8 is the same but with diagonals. Used for texture rotations.
     *
     * Vector xX(i), xY(i) is U-axis of sprite with rotation i
     * Vector yY(i), yY(i) is V-axis of sprite with rotation i
     * Rotations: 0 grad (0), 90 grad (2), 180 grad (4), 270 grad (6)
     * Mirrors: vertical (8), main diagonal (10), horizontal (12), reverse diagonal (14)
     * This is the small part of gameofbombs.com portal system. It works.
     *
     * @author Ivan @ivanpopelyshev
     *
     * @namespace PIXI.GroupD8
     */
    export const E = 0;
    export const SE = 1;
    export const S = 2;
    export const SW = 3;
    export const W = 4;
    export const NW = 5;
    export const N = 6;
    export const NE = 7;
    export const MIRROR_VERTICAL = 8;
    export const MIRROR_HORIZONTAL = 12;

    export function uX(ind: number): number {
        return ux[ind]
    }

    export function uY(ind: number): number {
        return uy[ind]
    }

    export function vX(ind: number): number {
        return vx[ind]
    }

    export function vY(ind: number): number {
        return vy[ind]
    }

    export function inv(rotation: number): number {
        if (rotation & 8) {
            return rotation & 15;
        }

        return (-rotation) & 7;
    }

    export function
    add(rotationSecond: number, rotationFirst: number) {
        return mul[rotationSecond][rotationFirst]
    }

    export function sub(rotationSecond: number, rotationFirst: number) {
        mul[rotationSecond][inv(rotationFirst)]
    }

    /**
     * Adds 180 degrees to rotation. Commutative operation.
     *
     * @method
     * @param {number} rotation - The number to rotate.
     * @returns {number} rotated number
     */
    export function rotate180(rotation: number): number {
        return rotation ^ 4
    }

    /**
     * I dont know why sometimes width and heights needs to be swapped. We'll fix it later.
     *
     * @param {number} rotation - The number to check.
     * @returns {boolean} Whether or not the width/height should be swapped.
     */
    export function isSwapWidthHeight(rotation: number): boolean {
        return (rotation & 3) === 2
    }

    /**
     * @param {number} dx - TODO
     * @param {number} dy - TODO
     *
     * @return {number} TODO
     */
    export function byDirection(dx: number, dy: number): number {
        if (Math.abs(dx) * 2 <= Math.abs(dy)) {
            if (dy >= 0) {
                return S;
            }

            return N;
        }
        else if (Math.abs(dy) * 2 <= Math.abs(dx)) {
            if (dx > 0) {
                return E;
            }

            return W;
        }
        else if (dy > 0) {
            if (dx > 0) {
                return SE;
            }

            return SW;
        }
        else if (dx > 0) {
            return NE;
        }

        return NW;
    }

    /**
     * Helps sprite to compensate texture packer rotation.
     *
     * @param {PIXI.Matrix} matrix - sprite world matrix
     * @param {number} rotation - The rotation factor to use.
     * @param {number} tx - sprite anchoring
     * @param {number} ty - sprite anchoring
     */
    export function matrixAppendRotationInv(matrix: Matrix, rotation: number, tx: number = 0, ty: number = 0) {
        // Packer used "rotation", we use "inv(rotation)"
        const mat = tempMatrices[inv(rotation)];

        mat.tx = tx;
        mat.ty = ty;
        matrix.append(mat);
    }
}
