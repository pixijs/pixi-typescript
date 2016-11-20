namespace glCore {
    /**
     * Helper class to create a webGL Framebuffer
     *
     * @class
     * @memberof PIXI.glCore
     * @param gl {WebGLRenderingContext} The current WebGL rendering context
     * @param width {Number} the width of the drawing area of the frame buffer
     * @param height {Number} the height of the drawing area of the frame buffer
     */
    export class GLFramebuffer {
        gl: WebGLRenderingContext;
        framebuffer: WebGLFramebuffer;
        /**
         * The stencil buffer
         *
         * @member {WebGLRenderbuffer}
         */
        stencil: WebGLRenderbuffer = null;

        texture: GLTexture = null;

        width: number;
        height: number;

        constructor(gl: WebGLRenderingContext, width: number, height: number) {
            /**
             * The current WebGL rendering context
             *
             * @member {WebGLRenderingContext}
             */
            this.gl = gl;

            /**
             * The frame buffer
             *
             * @member {WebGLFramebuffer}
             */
            this.framebuffer = gl.createFramebuffer();

            /**
             * The stencil buffer
             *
             * @member {WebGLRenderbuffer}
             */
            this.stencil = null;

            /**
             * The stencil buffer
             *
             * @member {PIXI.glCore.GLTexture}
             */
            this.texture = null;

            /**
             * The width of the drawing area of the buffer
             *
             * @member {Number}
             */
            this.width = width || 100;
            /**
             * The height of the drawing area of the buffer
             *
             * @member {Number}
             */
            this.height = height || 100;
        }

        enableTexture(texture?: GLTexture) {
            let gl = this.gl;

            this.texture = texture || new GLTexture(gl);

            this.texture.bind();

            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            this.bind();

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
        }

        enableStencil() {
            if (this.stencil)return;

            let gl = this.gl;

            this.stencil = gl.createRenderbuffer();

            gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);

            // TODO.. this is depth AND stencil?
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencil);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
        }

        clear(r: number, g: number, b: number, a: number) {
            this.bind();

            let gl = this.gl;

            gl.clearColor(r, g, b, a);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        bind() {
            let gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        }

        unbind() {
            let gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        /**
         * Resizes the drawing area of the buffer to the given width and height
         * @param  width  {Number} the new width
         * @param  height {Number} the new height
         */
        resize(width: number, height: number) {
            let gl = this.gl;

            this.width = width;
            this.height = height;

            if (this.texture) {
                this.texture.uploadData(null, width, height);
            }

            if (this.stencil) {
                // update the stencil buffer width and height
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencil);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
            }
        }

        /**
         * Destroys this buffer
         */
        destroy() {
            let gl = this.gl;

            //TODO
            if (this.texture) {
                this.texture.destroy();
            }

            gl.deleteFramebuffer(this.framebuffer);

            this.gl = null;

            this.stencil = null;
            this.texture = null;
        };

        /**
         * Creates a frame buffer with a texture containing the given data
         * @static
         * @param gl {WebGLRenderingContext} The current WebGL rendering context
         * @param width {Number} the width of the drawing area of the frame buffer
         * @param height {Number} the height of the drawing area of the frame buffer
         * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
         */
        static createRGBA(gl: WebGLRenderingContext, width: number, height: number, data?: ArrayBuffer | ArrayBufferView) {
            let texture = GLTexture.fromData(gl, null, width, height);
            texture.enableNearestScaling();
            texture.enableWrapClamp();

            //now create the framebuffer object and attach the texture to it.
            let fbo = new GLFramebuffer(gl, width, height);
            fbo.enableTexture(texture);

            fbo.unbind();

            return fbo;
        }

        /**
         * Creates a frame buffer with a texture containing the given data
         * @static
         * @param gl {WebGLRenderingContext} The current WebGL rendering context
         * @param width {Number} the width of the drawing area of the frame buffer
         * @param height {Number} the height of the drawing area of the frame buffer
         * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
         */
        static createFloat32(gl: WebGLRenderingContext, width: number, height: number, data?: ArrayBufferView) {
            // create a new texture..
            let texture = GLTexture.fromData(gl, data, width, height);
            texture.enableNearestScaling();
            texture.enableWrapClamp();

            //now create the framebuffer object and attach the texture to it.
            let fbo = new GLFramebuffer(gl, width, height);
            fbo.enableTexture(texture);

            fbo.unbind();

            return fbo;
        }

    }
}
