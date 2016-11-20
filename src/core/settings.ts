// import maxRecommendedTextures from './utils/maxRecommendedTextures';
// import canUploadSameBuffer from './utils/canUploadSameBuffer';

namespace core.settings {

    import IRendererOptions = core.renderers.IRendererOptions;
    /**
     * Target frames per millisecond.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 0.06
     */
    export let TARGET_FPMS = 0.06;

    /**
     * If set to true WebGL will attempt make textures mimpaped by default.
     * Mipmapping will only succeed if the base texture uploaded has power of two dimensions.
     *
     * @static
     * @memberof PIXI.settings
     * @type {boolean}
     * @default true
     */
    export let MIPMAP_TEXTURES = true;

    /**
     * Default resolution / device pixel ratio of the renderer.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    export let RESOLUTION = 1;

    /**
     * Default filter resolution.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 1
     */
    export let FILTER_RESOLUTION = 1;

    /**
     * The maximum textures that this device supports.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 32
     */
    // export let SPRITE_MAX_TEXTURES = maxRecommendedTextures(32);

    // TODO: maybe change to SPRITE.BATCH_SIZE: 2000
    // TODO: maybe add PARTICLE.BATCH_SIZE: 15000

    /**
     * The default sprite batch size.
     *
     * The default aims to balance desktop and mobile devices.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 4096
     */
    export let SPRITE_BATCH_SIZE = 4096;

    /**
     * The prefix that denotes a URL is for a retina asset.
     *
     * @static
     * @memberof PIXI.settings
     * @type {RegExp|string}
     * @example `@2x`
     * @default /@(.+)x/
     */
    export let RETINA_PREFIX = /@(.+)x/;

    /**
     * The default render options if none are supplied to {@link PIXI.WebGLRenderer}
     * or {@link PIXI.CanvasRenderer}.
     *
     * @static
     * @constant
     * @memberof PIXI.settings
     * @type {object}
     * @property {HTMLCanvasElement} view=null
     * @property {number} resolution=1
     * @property {boolean} antialias=false
     * @property {boolean} forceFXAA=false
     * @property {boolean} autoResize=false
     * @property {boolean} transparent=false
     * @property {number} backgroundColor=0x000000
     * @property {boolean} clearBeforeRender=true
     * @property {boolean} preserveDrawingBuffer=false
     * @property {boolean} roundPixels=false
     */
    export let RENDER_OPTIONS : IRendererOptions = {
        view: null,
        antialias: false,
        forceFXAA: false,
        autoResize: false,
        transparent: false,
        backgroundColor: 0x000000,
        clearBeforeRender: true,
        preserveDrawingBuffer: false,
        roundPixels: false,
    };

    /**
     * Default transform type.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default PIXI.TRANSFORM_MODE.STATIC
     */
    export let TRANSFORM_MODE = 0;

    /**
     * Default Garbage Collection mode.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default PIXI.GC_MODES.AUTO
     */
    export let GC_MODE = 0;

    /**
     * Default Garbage Collection max idle.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 3600
     */
    export let GC_MAX_IDLE = 60 * 60;

    /**
     * Default Garbage Collection maximum check count.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default 600
     */
    export let GC_MAX_CHECK_COUNT = 60 * 10;

    /**
     * Default wrap modes that are supported by pixi.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default PIXI.WRAP_MODES.CLAMP
     */
    export let WRAP_MODE = 0;

    /**
     * The scale modes that are supported by pixi.
     *
     * @static
     * @memberof PIXI.settings
     * @type {number}
     * @default PIXI.SCALE_MODES.LINEAR
     */
    export let SCALE_MODE = 0;

    /**
     * Default specify float precision in shaders.
     *
     * @static
     * @memberof PIXI.settings
     * @type {string}
     * @default PIXI.PRECISION.MEDIUM
     */
    export let PRECISION = 'mediump';

    /**
     * Can we upload the same buffer in a single frame?
     *
     * @static
     * @constant
     * @memberof PIXI
     * @type {boolean}
     */
    // export let CAN_UPLOAD_SAME_BUFFER = canUploadSameBuffer();
}
