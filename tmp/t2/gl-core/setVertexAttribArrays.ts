namespace glCore {
// var GL_MAP = {};

    /**
     * @param gl {WebGLRenderingContext} The current WebGL context
     * @param attribs {*}
     * @param state {*}
     */
    export function setVertexAttribArrays(gl: WebGLRenderingContext, attribs: any, state: any) {
        let i: number;
        if (state) {
            let tempAttribState = state.tempAttribState,
                attribState = state.attribState;

            for (i = 0; i < tempAttribState.length; i++) {
                tempAttribState[i] = false;
            }

            // set the new attribs
            for (i = 0; i < attribs.length; i++) {
                tempAttribState[attribs[i].attribute.location] = true;
            }

            for (i = 0; i < attribState.length; i++) {
                if (attribState[i] !== tempAttribState[i]) {
                    attribState[i] = tempAttribState[i];

                    if (state.attribState[i]) {
                        gl.enableVertexAttribArray(i);
                    }
                    else {
                        gl.disableVertexAttribArray(i);
                    }
                }
            }

        }
        else {
            for (i = 0; i < attribs.length; i++) {
                let attrib = attribs[i];
                gl.enableVertexAttribArray(attrib.attribute.location);
            }
        }
    }

}
