let EMPTY_ARRAY_BUFFER = new ArrayBuffer(0);

namespace glCore {
    /**
     * Helper class to create a webGL buffer
     *
     * @class
     * @memberof PIXI.glCore
     * @param gl {WebGLRenderingContext} The current WebGL rendering context
     * @param type {gl.ARRAY_BUFFER | gl.ELEMENT_ARRAY_BUFFER} @mat
     * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data
     * @param drawType {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
    export class GLBuffer {

        constructor(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView, drawType: number) {
            /**
             * The current WebGL rendering context
             *
             * @member {WebGLRenderingContext}
             */
            this.gl = gl;

            /**
             * The WebGL buffer, created upon instantiation
             *
             * @member {WebGLBuffer}
             */
            this.buffer = gl.createBuffer();

            /**
             * The type of the buffer
             *
             * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
             */
            this.type = type || gl.ARRAY_BUFFER;

            /**
             * The draw type of the buffer
             *
             * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
             */
            this.drawType = drawType || gl.STATIC_DRAW;

            this.data = EMPTY_ARRAY_BUFFER;

            if (data) {
                this.upload(data);
            }


        }

        gl: WebGLRenderingContext;
        buffer: WebGLBuffer;
        type: number;
        drawType: number;
        data: ArrayBuffer | ArrayBufferView;

        upload(data: ArrayBuffer | ArrayBufferView, offset?: number, dontBind?: boolean) {
            // todo - needed?
            if (!dontBind) this.bind();

            let gl = this.gl;

            data = data || this.data;
            offset = offset || 0;

            if (this.data.byteLength >= data.byteLength) {
                gl.bufferSubData(this.type, offset, data);
            }
            else {
                gl.bufferData(this.type, data, this.drawType);
            }

            this.data = data;
        }

        bind() {
            let gl = this.gl;
            gl.bindBuffer(this.type, this.buffer);
        }

        destroy() {
            this.gl.deleteBuffer(this.buffer);
        }

        static createVertexBuffer(gl: WebGLRenderingContext, data?: ArrayBuffer | ArrayBufferView, drawType?: number) {
            return new GLBuffer(gl, gl.ARRAY_BUFFER, data, drawType);
        }

        static createIndexBuffer(gl: WebGLRenderingContext, data?: ArrayBuffer | ArrayBufferView, drawType?: number) {
            return new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType);
        }

        static create(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView, drawType: number) {
            return new GLBuffer(gl, type, data, drawType);
        }
    }
}
