namespace glCore {
    export module shader {
        /**
         * Extracts the uniforms
         * @class
         * @memberof PIXI.glCore.shader
         * @param gl {WebGLRenderingContext} The current WebGL rendering context
         * @param program {WebGLProgram} The shader program to get the uniforms from
         * @return uniforms {Object}
         */
        export function extractUniforms(gl, program) {
            var uniforms: any = {};

            var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

            for (var i = 0; i < totalUniforms; i++) {
                var uniformData = gl.getActiveUniform(program, i);
                var name = uniformData.name.replace(/\[.*?\]/, "");
                var type = mapType(gl, uniformData.type);

                uniforms[name] = {
                    type: type,
                    size: uniformData.size,
                    location: gl.getUniformLocation(program, name),
                    value: defaultValue(type, uniformData.size)
                };
            }

            return uniforms;
        }
    }
}
