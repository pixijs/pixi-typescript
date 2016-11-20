namespace glCore {

    /**
     * Helper class to work with WebGL VertexArrayObjects (vaos)
     * Only works if WebGL extensions are enabled (they usually are)
     *
     * @class
     * @memberof PIXI.glCore
     * @param gl {WebGLRenderingContext} The current WebGL rendering context
     */
    export class VertexArrayObject {
        /**
         * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
         * If you find on older devices that things have gone a bit weird then set this to true.
         */
        /**
         * Lets the VAO know if you should use the WebGL extension or the native methods.
         * Some devices behave a bit funny when using the newer extensions (im looking at you ipad 2!)
         * If you find on older devices that things have gone a bit weird then set this to true.
         * @static
         * @property {Boolean} FORCE_NATIVE
         */
        static FORCE_NATIVE = false;

        nativeVaoExtension: any = null;
        // VAO - overwrite the state..
        nativeState: any;

        nativeVao: any;

        maxAttribs: number;


        /**
         * The current WebGL rendering context
         *
         * @member {WebGLRenderingContext}
         */
        gl: WebGLRenderingContext;

        /**
         * An array of attributes
         *
         * @member {Array}
         */
        attributes: any;

        /**
         * @member {PIXI.glCore.GLBuffer}
         */
        indexBuffer: GLBuffer;

        /**
         * A boolean flag
         *
         * @member {Boolean}
         */
        dirty: boolean = false;

        constructor(gl: WebGLRenderingContext, state: any) {
            this.nativeVaoExtension = null;

            if (!VertexArrayObject.FORCE_NATIVE) {
                this.nativeVaoExtension = gl.getExtension('OES_vertex_array_object') ||
                    gl.getExtension('MOZ_OES_vertex_array_object') ||
                    gl.getExtension('WEBKIT_OES_vertex_array_object');
            }

            this.nativeState = state;

            if (this.nativeVaoExtension) {
                this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();

                let maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

                // VAO - overwrite the state..
                this.nativeState = {
                    tempAttribState: new Array(maxAttribs),
                    attribState: new Array(maxAttribs)
                };
            }

            /**
             * The current WebGL rendering context
             *
             * @member {WebGLRenderingContext}
             */
            this.gl = gl;

            /**
             * An array of attributes
             *
             * @member {Array}
             */
            this.attributes = [];

            /**
             * @member {PIXI.glCore.GLBuffer}
             */
            this.indexBuffer = null;

            /**
             * A boolean flag
             *
             * @member {Boolean}
             */
            this.dirty = false;
        }

        /**
         * Binds the buffer
         */
        bind(): VertexArrayObject {
            if (this.nativeVao) {
                this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);

                if (this.dirty) {
                    this.dirty = false;
                    this.activate();
                }
            }
            else {

                this.activate();
            }

            return this;
        }

        /**
         * Unbinds the buffer
         */
        unbind(): VertexArrayObject {
            if (this.nativeVao) {
                this.nativeVaoExtension.bindVertexArrayOES(null);
            }

            return this;
        }

        /**
         * Uses this vao
         */
        activate(): VertexArrayObject {

            let gl = this.gl;
            let lastBuffer: GLBuffer = null;

            for (let i = 0; i < this.attributes.length; i++) {
                let attrib = this.attributes[i];

                if (lastBuffer !== attrib.buffer) {
                    attrib.buffer.bind();
                    lastBuffer = attrib.buffer;
                }

                //attrib.attribute.pointer(attrib.type, attrib.normalized, attrib.stride, attrib.start);
                gl.vertexAttribPointer(attrib.attribute.location,
                    attrib.attribute.size, attrib.type || gl.FLOAT as number,
                    attrib.normalized || false,
                    attrib.stride || 0,
                    attrib.start || 0);


            }

            setVertexAttribArrays(gl, this.attributes, this.nativeState);

            this.indexBuffer.bind();

            return this;
        }

        /**
         *
         * @param buffer     {PIXI.gl.GLBuffer}
         * @param attribute  {*}
         * @param type       {String}
         * @param normalized {Boolean}
         * @param stride     {Number}
         * @param start      {Number}
         */
        addAttribute(buffer: GLBuffer, attribute: any, type: number, normalized: boolean, stride: number, start: number): VertexArrayObject {
            this.attributes.push({
                buffer: buffer,
                attribute: attribute,

                location: attribute.location,
                type: type || this.gl.FLOAT,
                normalized: normalized || false,
                stride: stride || 0,
                start: start || 0
            });

            this.dirty = true;

            return this;
        }

        /**
         *
         * @param buffer   {PIXI.gl.GLBuffer}
         */
        addIndex(buffer: GLBuffer/*, options*/): VertexArrayObject {
            this.indexBuffer = buffer;

            this.dirty = true;

            return this;
        }

        /**
         * Unbinds this vao and disables it
         */
        clear(): VertexArrayObject {
            // var gl = this.gl;

            // TODO - should this function unbind after clear?
            // for now, no but lets see what happens in the real world!
            if (this.nativeVao) {
                this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao);
            }

            this.attributes.length = 0;
            this.indexBuffer = null;

            return this;
        }

        /**
         * @param type  {Number}
         * @param size  {Number}
         * @param start {Number}
         */
        draw(type: number, size: number, start: number): VertexArrayObject {
            let gl = this.gl;
            gl.drawElements(type, size, gl.UNSIGNED_SHORT, start || 0);

            return this;
        }

        /**
         * Destroy this vao
         */
        destroy() {
            // lose references
            this.gl = null;
            this.indexBuffer = null;
            this.attributes = null;
            this.nativeState = null;

            if (this.nativeVao) {
                this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao);
            }

            this.nativeVaoExtension = null;
            this.nativeVao = null;
        }
    }
}
