namespace core {
    function checkPrecision(src: string): string {
        if (src.substring(0, 9) !== 'precision') {
            return `precision ${settings.PRECISION} float;\n${src}`;
        }

        return src;
    }

    /**
     * Wrapper class, webGL Shader for Pixi.
     * Adds precision string if vertexSrc or fragmentSrc have no mention of it.
     *
     * @class
     * @extends GLShader
     * @memberof PIXI
     */
    export class Shader extends glCore.GLShader {
        /**
         *
         * @param {WebGLRenderingContext} gl - The current WebGL rendering context
         * @param {string|string[]} vertexSrc - The vertex shader source as an array of strings.
         * @param {string|string[]} fragmentSrc - The fragment shader source as an array of strings.
         */
        constructor(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string) {
            super(gl, checkPrecision(vertexSrc), checkPrecision(fragmentSrc));
        }
    }
}
