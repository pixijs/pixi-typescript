namespace glCore {

    import compileProgram = shader.compileProgram
    import extractAttributes = shader.extractAttributes
    import extractUniforms = shader.extractUniforms
    import generateUniformAccessObject = shader.generateUniformAccessObject

    /**
     * Helper class to create a webGL Shader
     *
     * @class
     * @memberof PIXI.glCore
     * @param gl {WebGLRenderingContext}
     * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
     * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
     */
    export class Shader {
        gl: WebGLRenderingContext;
        program: WebGLProgram;

        /**
         * The attributes of the shader as an object containing the following properties
         * {
	 * 	type,
	 * 	size,
	 * 	location,
	 * 	pointer
	 * }
         * @member {Object}
         */
        attributes: any;

        /**
         * The uniforms of the shader as an object containing the following properties
         * {
	 * 	gl,
	 * 	data
	 * }
         * @member {Object}
         */
        uniforms: any;

        constructor(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string) {
            /**
             * The current WebGL rendering context
             *
             * @member {WebGLRenderingContext}
             */
            this.gl = gl;

            /**
             * The shader program
             *
             * @member {WebGLProgram}
             */
            // First compile the program..
            this.program = compileProgram(gl, vertexSrc, fragmentSrc);


            // next extract the attributes
            this.attributes = extractAttributes(gl, this.program);

            var uniformData = extractUniforms(gl, this.program);

            this.uniforms = generateUniformAccessObject(gl, uniformData);
        };

        /**
         * Uses this shader
         */
        bind() {
            this.gl.useProgram(this.program);
        }

        /**
         * Destroys this shader
         * TODO
         */
        destroy() {
            // var gl = this.gl;
        }
    }
}
