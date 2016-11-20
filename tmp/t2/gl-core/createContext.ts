/**
 * Helper class to create a webGL Context
 *
 * @class
 * @memberof PIXI.glCore
 * @param canvas {HTMLCanvasElement} the canvas element that we will get the context from
 * @param options {Object} An options object that gets passed in to the canvas element containing the context attributes,
 *                         see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext for the options available
 * @return {WebGLRenderingContext} the WebGL context
 */
export function createContext(canvas: HTMLCanvasElement, options?: WebGLContextAttributes): WebGLRenderingContext {
    var gl = canvas.getContext('webgl', options) ||
        canvas.getContext('experimental-webgl', options);

    if (!gl) {
        // fail, not able to get a context
        throw new Error('This browser does not support webGL. Try using the canvas renderer');
    }

    return gl as WebGLRenderingContext;
}
