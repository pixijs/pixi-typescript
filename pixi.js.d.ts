// Type definitions for Pixi.js v4.1.0
// Project: https://github.com/pixijs/pixi.js/
// Definitions by: clark-stevenson <https://github.com/pixijs/pixi-typescript>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module PIXI {

    export var VERSION: string;
    export var PI_2: number;
    export var RAD_TO_DEG: number;
    export var DEG_TO_RAD: number;
    export var TARGET_FPMS: number;
    export var RENDERER_TYPE: {
        UNKNOWN: number;
        WEBGL: number;
        CANVAS: number;
    };
    export var BLEND_MODES: {
        NORMAL: number;
        ADD: number;
        MULTIPLY: number;
        SCREEN: number;
        OVERLAY: number;
        DARKEN: number;
        LIGHTEN: number;
        COLOR_DODGE: number;
        COLOR_BURN: number;
        HARD_LIGHT: number;
        SOFT_LIGHT: number;
        DIFFERENCE: number;
        EXCLUSION: number;
        HUE: number;
        SATURATION: number;
        COLOR: number;
        LUMINOSITY: number;

    };
    export var DRAW_MODES: {
        POINTS: number;
        LINES: number;
        LINE_LOOP: number;
        LINE_STRIP: number;
        TRIANGLES: number;
        TRIANGLE_STRIP: number;
        TRIANGLE_FAN: number;
    };
    export var SCALE_MODES: {
        DEFAULT: number;
        LINEAR: number;
        NEAREST: number;
    };
    export var RETINA_PREFIX: RegExp;
    export var RESOLUTION: number;
    export var FILTER_RESOLUTION: number;
    export var DEFAULT_RENDER_OPTIONS: {
        view: HTMLCanvasElement;
        resolution: number;
        antialias: boolean;
        forceFXAA: boolean;
        autoResize: boolean;
        transparent: boolean;
        backgroundColor: number;
        clearBeforeRender: boolean;
        preserveDrawingBuffer: boolean;
        roundPixels: boolean;
    };
    export var SHAPES: {
        POLY: number;
        RECT: number;
        CIRC: number;
        ELIP: number;
        RREC: number;
    };
    export var SPRITE_BATCH_SIZE: number;

    export function autoDetectRenderer(width: number, height: number, options?: PIXI.RendererOptions, noWebGL?: boolean): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    export var loader: PIXI.loaders.Loader;

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////ACCESSIBILITY////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module accessibility {

        //accessibility
        export class AccessibilityManager {

            constructor(renderer: PIXI.SystemRenderer);

            protected div: HTMLElement;
            protected pool: HTMLElement[];
            protected renderId: number;
            debug: boolean;
            renderer: PIXI.SystemRenderer;
            protected children: AccessibleTarget[];
            protected isActive: boolean;

            protected activate(): void;
            protected deactivate(): void;
            protected updateAccessibleObjects(displayObject: DisplayObject): void;
            protected update(): void;
            protected capHitArea(hitArea: HitArea): void;
            protected addChild(displayObject: DisplayObject): void;
            protected _onClick(e: interaction.InteractionEvent): void;
            protected _onFocus(e: interaction.InteractionEvent): void;
            protected _onFocusOut(e: interaction.InteractionEvent): void;
            protected _onKeyDown(e: interaction.InteractionEvent): void;
            protected _onMouseMove(): void;

            destroy(): void;

        }
        export interface AccessibleTarget {

            accessible: boolean;
            accessibleTitle: string;
            accessibleHint: string;
            tabIndex: number;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////CORE//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    //c2d

    export class ComputedGeometry2d extends Geometry2D {

        protected _transformUid: number;
        protected _transformVersion: number;
        protected _geometryUid: number;
        protected _geometryVersion: number;

        applyTransformStatic(geometry: Geometry2D, transform: Transform2d): boolean;
        applyTransform(geometry: Geometry2D, transform: Transform2d): void;
        applyMatrix(geometry: Geometry2D, matrix: Matrix): void;

    }
    export class ComputedTransform2d {

        static IDENTITY: ComputedTransform2d;

        matrix2d: Matrix;
        matrix: Matrix;
        version: number;
        uid: number;
        is3d: boolean;
        updated: boolean;
        protected _dirtyLocalUid: number;
        protected _dirtyLocalVersion: number;
        protected _dirtyParentUid: number;
        protected _dirtyParentVersion: number;
        computedRayCast: Raycast2d;
        protected _dirtyRaycastUid: number;
        protected _dirtyRaycastVersion: number;
        protected _dirtyRaycastMyVersion: number;

        protected getIdentityMatrix(): Matrix;
        protected getIdentityTransform(): ComputedTransform2d;
        updateTransform(parentTransform: ComputedTransform2d, localTransform: ComputedTransform2d): boolean;
        protected updateRaycast(parentRaycast: Raycast2d): Raycast2d;
        protected updateChildTransform(childTransform: ComputedTransform2d, localTransform: ComputedTransform2d): ComputedTransform2d;
        protected updateChildReverseTransform(childTransform: ComputedTransform2d, localTransform: ComputedTransform2d): ComputedTransform2d;
        protected checkChildReverseTransform(childTransform: ComputedTransform2d, localTransform: ComputedTransform2d): boolean;
        updateChildGeometry(computedGeometry: ComputedTransform2d, geometry: ComputedGeometry2d): ComputedGeometry2d;
        updateChildRaycast(computedRaycast: Raycast2d, parentRaycast: Raycast2d): Raycast2d;

    }
    export class DisplayPoint {

        protected _point: Point;
        uid: number;
        is3d: boolean;
        version: number;
        valid: boolean;

        x: number;
        y: number;

        set(x: number, y: number): void;
        copy(point: Point): void;
        childApplyTransform(child: Raycast2d, transform: ComputedTransform2d): void;

    }
    export class Geometry {

        vertices: number[];
        indices: number[];
        stride: number;
        is3d: boolean;
        uid: number;
        version: number;
        protected _bounds: Rectangle;
        protected _dirtyBounds: number;

        getBounds(): Rectangle;
        size: number;
        valid: boolean;

    }
    export class Geometry2D extends Geometry {

        setRectCoords(offset: number, x1: number, y1: number, x2: number, y2: number): number;
        static fromBuffers(vertices: number[], indices: number[]): Geometry2D;

        containsPoint(point: Point, useIndices?: boolean): boolean;

    }
    export class GeometrySet {

        constructor(local: Geometry2D);

        local: Geometry2D;
        computed: ComputedGeometry2d;
        projected: ComputedTransform2d;
        valid: boolean;

        getBounds(computed: ComputedGeometry2d, projected: ComputedTransform2d): Rectangle;

    }
    export class GeometrySetProxy extends GeometrySet {

        original: GeometrySet;
        value: boolean;

        wrap(original: GeometrySet): GeometrySetProxy;

    }
    export class ObservablePoint2d {

        constructor(cb: Function, scope?: any, x?: number, y?: number);

        x: number;
        y: number;
        cb: () => void;
        scope: any;

        set(x: number, y: number): void;
        copy(p: Point | DisplayPoint | ObservablePoint2d): void;
        destroy(): void;

    }
    export class Raycast2d {

        protected _raycastUid: number;
        protected _raycastVersion: number;
        protected _transformUid: number;
        protected _transformVersion: number;
        protected _point: Point;

        is3d: boolean;
        valid: boolean
        intersects: boolean;
        version: number;
        uid: number;

        x: number;
        y: number;

        applyTransformStatic(raycast: Raycast2d, transform: ComputedTransform2d): boolean;
        childApplyTransform(child: Raycast2d, transform: ComputedTransform2d): Raycast2d;
        applyTransform(raycast: Raycast2d, transform: ComputedTransform2d): Matrix;

    }
    export class Transform2d {

        constructor(isStatic: boolean);

        matrix2d: Matrix;
        isStatic: boolean;
        position: ObservablePoint2d;
        scale: ObservablePoint2d;
        skew: ObservablePoint2d;
        pivot: Point;
        protected _rotation: number;
        protected _sr: number;
        protected _cr: number;
        protected _cy: number;
        protected _sy: number;
        protected _nsx: number;
        protected _cx: number;
        protected _dirtyVersion: number;
        version: number;
        uid: number;

        updateSkew(): void;
        makeDirty(): void;
        update(): boolean;
        makeComputedTransform(computedTransform?: ComputedTransform2d): ComputedTransform2d;
        destroy(): void;

        rotation: number;
        matrix: Matrix;

    }

    //display

    export class Camera2d extends Container {

        //CameraProxy start
        protected createProxy(): CameraProxy;
        //CameraProxy end

        projection: Transform2d;
        worldProjection: ComputedTransform2d;
        proxyCache: any;
        onZOrder: Function;
        protected _displayList: DisplayObject[];
        protected _displayListFlag: DisplayObject[];
        enableDisplayList: boolean;
        protected displayListSort(a: DisplayObject, b: DisplayObject): void;
        viewport: Rectangle;
        autoUpdateViewport: boolean;
        enableBoundsCulling: boolean;
        protected initProjection(): void;
        x: number;
        y: number;
        position: Point;
        scale: Point;
        pivot: Point;
        skew: Point;
        rotation: number;
        protected _proxyContainer(containerFrom: Container, containerTo: Container): void;
        protected _proxySwapBuffer(): void;
        proxyContainer(containerFrom: Container, containerTo: Container): void;
        renderWebGL(renderer: WebGLRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;
        protected _addInList(container: Container, parentZIndex: number, parentZOrder: Function): void;
        protected updateDisplayList(): void;
        protected updateBoundsCulling(viewport: Rectangle, container: Container): void;

    }
    export class CameraProxy extends ContainerProxy {

        constructor(original: Camera2d | CameraProxy);

        enableDisplayList: boolean;

        protected createProxy(): CameraProxy;

    }
    export class Container extends DisplayObject {

        //ContainerProxy start
        protected createProxy(): ContainerProxy;
        //ContainerProxy end

        //begin extras.getChildByName
        getChildByName(name: string): DisplayObject;
        //end extras.getChildByName

        children: DisplayObject[];
        updatePostOrder: number;

        width: number;
        height: number;

        protected onChildrenChange: (...args: any[]) => void;
        addChild(...child: DisplayObject[]): DisplayObject;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        getChildIndex(child: DisplayObject): number;
        setChildIndex(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        removeChild(...args: DisplayObject[]): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        protected containerUpdateTransform(): void;
        protected _getChildBounds(): Rectangle;
        getBounds(): Rectangle;
        protected containerGetBounds(): Rectangle;
        getLocalBounds(): Rectangle;
        protected _renderWebGL(renderer: PIXI.WebGLRenderer): void;
        protected _renderCanvas(renderer: PIXI.CanvasRenderer): void;
        renderWebGL(renderer: PIXI.WebGLRenderer): void;
        renderCanvas(renderer: PIXI.CanvasRenderer): void;
        destroy(destroyChildren?: boolean): void;

        once(event: 'added', fn: (displayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        once(event: 'removed', fn: (DisplayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: 'added', fn: (displayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        on(event: 'removed', fn: (DisplayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class ContainerProxy extends DisplayObjectProxy {

        children: DisplayObject[];
        updateTransform(): ComputedTransform2d;
        containerUpdateTransform(): void;
        protected _getChildBounds(): Rectangle;
        getBounds(): Rectangle;
        containerGetBounds(): Rectangle;
        getLocalBounds(): Rectangle;
        protected _renderWebGL(renderer: PIXI.WebGLRenderer): void;
        protected _renderCanvas(renderer: PIXI.CanvasRenderer): void;
        renderWebGL(renderer: PIXI.WebGLRenderer): void;
        renderCanvas(renderer: PIXI.CanvasRenderer): void;
        protected createProxy(): ContainerProxy;
        destroy(destroyChildren?: boolean): void;

    }
    export class DisplayObject extends utils.EventEmitter implements interaction.InteractiveTarget {

        //begin extras.cacheAsBitmap
        protected _cacheAsBitmap: boolean;
        protected _originalRenderWebGL: WebGLRenderer;
        protected _originalRenderCanvas: CanvasRenderer;
        protected _originalUpdateTransform: boolean;
        protected _originalHitTest: any;
        protected _originalDestroy: any;
        protected _cachedSprite: any;
        cacheAsBitmap: boolean;
        protected _renderCachedWebGL(renderer: WebGLRenderer): void;
        protected _initCachedDisplayObject(renderer: WebGLRenderer): void;
        protected _renderCachedCanvas(renderer: CanvasRenderer): void;
        protected _initCachedDisplayObjectCanvas(renderer: CanvasRenderer): void;
        protected _getCachedBounds(): Rectangle;
        protected _destroyCachedDisplayObject(): void;
        protected _cacheAsBitmapDestroy(): void;
        //end extras.cacheAsBitmap

        //begin extras.getChildByName
        name: string;
        //end extras.getChildByName

        //begin extras.getGlobalPosition
        getGlobalPosition(point?: Point): Point;
        //end extras.getGlobalPosition

        //begin c2d.DisplayPoint
        childApplyTransform(child: Raycast2d, transform: ComputedTransform2d): void;
        //end c2d.DisplayPoint

        //begin accessible target
        accessible: boolean;
        accessibleTitle: string;
        accessibleHint: string;
        tabIndex: number;
        //end accessible target

        //begin interactive target
        interactive: boolean;
        buttonMode: boolean;
        interactiveChildren: boolean;
        defaultCursor: string;
        //end interactive target

        uid: number;
        transform: Transform2d;
        computedTransform: ComputedTransform2d;
        projectedTransform: ComputedTransform2d;
        worldProjection: ComputedTransform2d;
        geometry: Geometry2D;
        computedGeometry: ComputedGeometry2d;
        projectedGeometry: ComputedGeometry2d
        protected _localBounds: GeometrySet;
        alpha: number;
        visible: boolean;
        renderable: boolean;
        parent: Container;
        worldAlpha: number;
        filterArea: Rectangle;
        protected _bounds: Rectangle;
        protected _currentBounds: Rectangle;
        isRaycastCheckingBoundsFirst: boolean;
        isRaycastPossible: boolean;
        protected _mask: Rectangle;
        proxyContext: DisplayObjectProxy;
        updateOrder: number;
        displayOrder: number;
        inheritZIndex: boolean;
        protected _zIndex: number;
        zOrder: number;
        zIndex: number;
        x: number;
        y: number;
        projectionMatrix: Matrix;
        projectionMatrix2d: Matrix;
        localTransform: Matrix;
        position: Point;
        scale: Point;
        pivot: Point;
        skew: Point;
        rotation: number;
        worldVisible: boolean;
        mask: PIXI.Graphics | PIXI.Sprite;
        filters: Filter[];

        initTransform(isStatic?: boolean): void;
        updateTransform(): ComputedTransform2d | void;
        updateGeometry(): ComputedGeometry2d;
        updateProjectedGeometry(): ComputedGeometry2d;
        updateProjectedTransform(): ComputedTransform2d;
        displayObjectUpdateTransform(): void;
        getBounds(): Rectangle;
        getLocalBounds(): Rectangle;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from: Point, point?: Point): Point;
        raycast(point: DisplayPoint, ignoreBoundsCheck?: boolean): Point;
        containsPoint(point: Point): boolean;
        containsLocalPoint(point: Point): boolean;
        renderWebGL(renderer: WebGLRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;
        setParent(container: Container): Container;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, pivotX?: number, pivotY?: number): DisplayObject;
        destroy(): void;

        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

        /*
        on(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        on(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;

        once(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        once(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
        */

    }
    export class DisplayObjectProxy extends DisplayObject implements interaction.InteractiveTargetProxy {

        constructor(original: DisplayObject);

        original: DisplayObject;
        protected _localBoundsProxy: GeometrySetProxy;

        updateOrder: number;
        displayOrder: number;
        worldAlpha: number;
        protected _events: any;

        swapContext(): void;
        getOriginal(): DisplayObject;

    }

    //graphics

    export class GraphicsData {

        constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: Circle | Rectangle | Ellipse | Polygon);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        protected _lineTint: number;
        fillColor: number;
        fillAlpha: number;
        protected _fillTint: number;
        fill: boolean;
        shape: Circle | Rectangle | Ellipse | Polygon;
        type: number;

        clone(): GraphicsData;

        destroy(); void;

    }
    export class Graphics extends Container {

        static _SPRITE_TEXTURE: Texture;

        fillAlpha: number;
        lineWidth: number;
        lineColor: number;
        protected graphicsData: GraphicsData[];
        tint: number;
        protected _prevTint: number;
        blendMode: number;
        protected currentPath: GraphicsData;
        protected _webGL: any;
        isMask: boolean;
        boundsPadding: number;
        protected _localBounds: GeometrySet;
        protected dirty: boolean;
        protected glDirty: boolean;
        protected boundsDirty: boolean;
        protected cachedSpriteDirty: boolean;
        protected _spriteRect: Rectangle;
        protected _fastRect: boolean;
        isRaycastCheckingBoundsFirst: boolean;
        isRaycastPossible: boolean;

        clone(): Graphics;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;
        beginFill(color: number, alpha?: number): Graphics;
        endFill(): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(path: number[] | Point[]): Graphics;
        clear(): Graphics;
        protected _renderSpriteRect(renderer: PIXI.SystemRenderer): void;
        drawShape(shape: Circle | Rectangle | Ellipse | Polygon | RoundedRectangle): GraphicsData;
        generateCanvasTexture(scaleMode: number, resolution: number): Texture;
        destroy(): void;

    }
    export class CanvasGraphicsRenderer {

        constructor(renderer: SystemRenderer);

        render(graphics: Graphics): void;
        protected updateGraphicsTint(graphics: Graphics): void;
        destroy(): void;

    }
    export class GraphicsRenderer extends ObjectRenderer {

        constructor(renderer: PIXI.CanvasRenderer);

        protected graphicsDataPool: GraphicsData[];
        protected primitiveShader: PrimitiveShader;
        gl: WebGLRenderingContext;

        static CONTEXT_UID: number;

        onContextChange(): void;
        destroy(): void;
        render(graphics: Graphics): void;
        protected updateGraphics(graphics: PIXI.Graphics): void;
        getWebGLData(webGL: WebGLRenderingContext, type: number): WebGLGraphicsData;

    }
    export class WebGLGraphicsData {

        constructor(gl: WebGLRenderingContext, shader: glCore.GLShader, attribsState: any);

        gl: WebGLRenderingContext;
        color: number[];
        points: Point[];
        indices: number[];
        buffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        dirty: boolean;
        glPoints: number[];
        glIndices: number[];
        shader: glCore.GLShader;
        vao: any;

        reset(): void;
        upload(): void;
        destroy(): void;

    }
    export class PrimitiveShader extends glCore.GLShader { }

    //math

    export module GroupD8 {

        export function add(rotationSecond: number, rotationFirst: number): number;
        export function byDirection(dx: number, dy: number): number;
        export function inv(rotation: number): number;
        export function isSwapWidthHeight(rotation: number): boolean;
        export function matrixAppendRotationInv(matrix: Matrix, rotation: number, tx: number, ty: number): void;
        export function rotate180(rotation: number): number;
        export function sub(rotationSecond: number, rotationFirst: number): number;
        export function uX(ind: number): number;
        export function uY(ind: number): number;
        export function vX(ind: number): number;
        export function vY(ind: number): number;

        export var E: number;
        export var SE: number;
        export var S: number;
        export var SW: number;
        export var W: number;
        export var NW: number;
        export var N: number;
        export var NE: number;
        export var MIRROR_HORIZONTAL: number;
        export var MIRROR_VERTICAL: number;

    }
    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        fromArray(array: number[]): void;
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        toArray(transpose?: boolean, out?: number[]): number[];
        apply(pos: Point, newPos?: Point): Point;
        applyInverse(pos: Point, newPos?: Point): Point;
        translate(x: number, y: number): Matrix;
        scale(x: number, y: number): Matrix;
        rotate(angle: number): Matrix;
        append(matrix: Matrix): Matrix;
        setTransform(x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): PIXI.Matrix;
        prepend(matrix: Matrix): Matrix;
        invert(): Matrix;
        identity(): Matrix;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;

        static IDENTITY: Matrix;
        static TEMP_MATRIX: Matrix;

    }
    export class Point {

        constructor(x?: number, y?: number);

        x: number;
        y: number;

        clone(): Point;
        copy(p: Point): void;
        equals(p: Point): boolean;
        set(x?: number, y?: number): void;

    }
    export interface Shape {
    }
    export interface HitArea extends Shape {

        contains(x: number, y: number): boolean;

    }
    export class Circle implements HitArea {

        constructor(x?: number, y?: number, radius?: number);

        x: number;
        y: number;
        radius: number;
        type: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Ellipse implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Polygon implements HitArea {

        constructor(points: Point[] | number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        closed: boolean;
        points: number[];
        type: number;

        clone(): Polygon;
        contains(x: number, y: number): boolean;

    }
    export class Rectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        copy(rectangle: Rectangle): Rectangle;
        contains(x: number, y: number): boolean;
        pad(paddingX: number, paddingY: number): void;
        fit(rectangle: Rectangle): void;
        enlarge(rect: Rectangle): void;

    }
    export class RoundedRectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;

        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    }

    //renderers

    export interface RendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        autoResize?: boolean;
        antialias?: boolean;
        resolution?: number;
        clearBeforeRendering?: boolean;
        backgroundColor?: number;
        roundPixels?: boolean;

    }
    export class SystemRenderer extends utils.EventEmitter {

        constructor(system: string, width?: number, height?: number, options?: RendererOptions);

        type: number;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        blendModes: any; //todo?
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        roundPixels: boolean;
        protected _backgroundColor: number;
        protected _backgroundColorRgba: number[];
        protected _backgroundColorString: string;
        protected _tempDisplayObjectParent: Container;
        protected _lastObjectRendered: DisplayObject;
        backgroundColor: number;

        resize(width: number, height: number): void;
        generateTexture(displayObject: DisplayObject, scaleMode: number, resolution: number): RenderTexture;
        render(...args: any[]): void;
        destroy(removeView?: boolean): void;

    }
    export class CanvasRenderer extends SystemRenderer {

        constructor(width?: number, height?: number, options?: RendererOptions);

        rootContext: CanvasRenderingContext2D;
        rootResolution: number;
        refresh: boolean;
        maskManager: CanvasMaskManager;
        smoothProperty: string;

        render(displayObject: DisplayObject, renderTexture: RenderTexture, clear: boolean, transform: Transform2d, skipUpdateTransform: boolean): void;
        setBlendMode(blendMode: number): void;
        destroy(removeView?: boolean): void;
        resize(w: number, h: number): void;

        on(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class CanvasMaskManager {

        constructor(renderer: CanvasRenderer);

        pushMask(maskData: any): void;
        renderGraphics(graphics: Graphics): void;
        popMask(renderer: WebGLRenderer | CanvasRenderer): void;
        destroy(): void;

    }
    export class CanvasRenderTarget {

        constructor(width: number, height: number, resolution: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;

        width: number;
        height: number;

        clear(): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }
    export interface WebGLRendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        autoResize?: boolean;
        antialias?: boolean;
        resolution?: number;
        clearBeforeRendering?: boolean;
        backgroundColor?: number;
        roundPixels?: boolean;
        forceFXAA?: boolean;

    }
    export class WebGLRenderer extends SystemRenderer {

        constructor(width?: number, height?: number, options?: WebGLRendererOptions);

        protected _contextOptions: {
            alpha: boolean;
            antiAlias: boolean;
            premultipliedAlpha: boolean;
            stencil: boolean;
            preseveDrawingBuffer: boolean;
        };
        maskManager: MaskManager;
        stencilManager: StencilManager;
        emptyRenderer: ObjectRenderer;
        currentRenderer: ObjectRenderer;
        gl: WebGLRenderingContext;
        state: WebGLState;
        renderingToScreen: boolean;
        filterManager: FilterManager;
        protected drawModes: any;
        protected _activeShader: glCore.GLShader;
        protected _activeRenderTarget: RenderTarget;
        protected _activeTextureLocation: number;
        protected _activeTexture: Texture;
        protected _initContext(): void;
        render(displayObject: DisplayObject, renderTexture: RenderTexture, clear: boolean, transform: Transform2d, skipUpdateTranform: boolean): void;
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        flush(): void;
        resize(width: number, height: number): void;
        setBlendMode(blendMode: number): void;
        clear(clearColor?: number): void;
        setTransform(matrix: Matrix): void;
        bindRenderTexture(renderTexture: RenderTexture, transform: Transform2d): WebGLRenderer;
        bindProjection(worldProjection: ComputedTransform2d): boolean;
        bindRenderTarget(renderTarget: RenderTarget): WebGLRenderer;
        bindShader(shader: glCore.GLShader): WebGLRenderer;
        bindTexture(texture: Texture, location: number): WebGLRenderer;
        protected createVao(): glCore.VertexArrayObject;
        reset(): WebGLRenderer;
        handleContextLost(event: WebGLContextEvent): void;
        handleContextRestored(): void;
        destroy(removeView?: boolean): void;

        on(event: "context", fn: (gl: WebGLRenderingContext) => void, context?: any): utils.EventEmitter;
        on(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "context", fn: (gl: WebGLRenderingContext) => void, context?: any): utils.EventEmitter;
        once(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class WebGLState {

        constructor(gl: WebGLRenderingContext);

        activeState: number[];
        defaultState: number[];
        stackIndex: number;
        stack: number[];
        gl: WebGLRenderingContext;
        maxAttribs: number;
        attribState: glCore.AttribState;
        nativeVaoExtension: any;

        push(): void;
        pop(): void;
        setState(state: number[]): void;
        setBlend(value: number): void;
        setBlendMode(value: number): void;
        setDepthTest(value: number): void;
        setCullFace(value: number): void;
        setFrontFace(value: number): void;
        resetAttributes(): void;
        resetToDefault(): void;

    }
    export class TextureManager {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        gl: WebGLRenderingContext;
        protected _managedTextures: WebGLTexture[];

        bindTexture(): void;
        getTexture(): WebGLTexture;
        updateTexture(texture: BaseTexture): WebGLTexture;
        destroyTexture(texture: BaseTexture, _skipRemove?: boolean): void;
        removeAll(): void;
        destroy(): void;

    }
    export class TextureGarbageCollector {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        count: number;
        checkCount: number;
        maxIdle: number;
        checkCountMax: number;
        mode: number;

        update(): void;
        run(): void;
        unload(): void;

    }
    export abstract class ObjectRenderer extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        start(): void;
        stop(): void;
        flush(): void;

        render(...args: any[]): void;

    }
    export class Quad {

        constructor(gl: WebGLRenderingContext);

        gl: WebGLRenderingContext;
        vertices: number[];
        uvs: number[];
        interleaved: number[];
        indices: number[];
        vertexBuffer: WebGLBuffer;
        vao: glCore.VertexArrayObject;
        initVao(shader: glCore.GLShader): void;
        map(targetTextureFrame: Rectangle, destinationFrame: Rectangle): Quad;
        draw(): Quad;
        upload(): Quad;
        destroy(): void;

    }
    export class RenderTarget {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number, resolution: number, root?: boolean);

        gl: WebGLRenderingContext;
        frameBuffer: WebGLFramebuffer;
        texture: Texture;
        clearColor: number[];
        size: Rectangle;
        resolution: number;
        projection2d: Transform2d;
        worldProjection: ComputedTransform2d;
        transform: Matrix;
        frame: Rectangle;
        defaultFrame: WebGLRenderbuffer;
        destinationFrame: WebGLRenderbuffer;
        sourceFrame: WebGLRenderbuffer;
        stencilBuffer: WebGLRenderbuffer;
        stencilMaskStack: StencilMaskStack[];
        filterStack: [{
            renderTarget: RenderTarget,
            filter: any[];
            bounds: Rectangle
        }];
        scaleMode: number;
        root: boolean;
        projectionMatrix: Matrix;

        setWorldProjection(worldProjection: ComputedTransform2d): void;
        checkWorldProjection(worldProjection: ComputedTransform2d): boolean;
        clear(clearColor?: number[]): void;
        attachStencilBuffer(): void;
        setFrame(destinationFrame: Rectangle, sourceFrame: Rectangle): void;
        activate(worldProjection: ComputedTransform2d): void;
        calculateProjection(destinationFrame: Rectangle, sourceFrame: Rectangle): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }
    export class StencilMaskStack {

        stencilStack: any[];
        reverse: boolean;
        count: number;

    }
    export class BlendModeManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        currentBlendMode: number;

        setBlendMode(blendMode: number): boolean;

    }
    export class FilterManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        gl: WebGLRenderingContext;
        quad: Quad;
        stack: {
            renderTarget: RenderTarget;
            sourceFrame: Rectangle;
            destinationFrame: Rectangle;
            filters: Filter[];
            target: any;
            resolution: number;
        }[];
        stackIndex: number;
        shaderCache: any;

        pushFilter(target: RenderTarget, filters: Filter[]): void;
        popFilter(): void;
        applyFilter(shader: glCore.GLShader | Filter, inputTarget: RenderTarget, outputTarget: RenderTarget, clear?: boolean): void;
        syncUniforms(shader: glCore.GLShader, filter: Filter): void;
        getRenderTarget(): RenderTarget;
        returnRenderTarget(renderTarget: RenderTarget): RenderTarget;
        calculateScreenSpaceMatrix(outputMatrix: Matrix): Matrix;
        calculateNormalisedScreenSpaceMatrix(outputMatrix: Matrix): Matrix;
        calculateSpriteMatrix(outputMatrix: Matrix, sprite: Sprite): Matrix;
        destroy(): void;
        getPotRenderTarget(gl: WebGLRenderingContext, minWidth: number, minHeight: number, resolution: number): RenderTarget;
        freePotRenderTarget(renderTarget: RenderTarget): void;

    }
    export class MaskManager extends WebGLManager {

        scissor: boolean;
        enableScissor: boolean;
        alphaMaskPool: number[];
        alphaMaskIndex: number;
        pushMask(target: RenderTarget, maskData: any): void;
        popMask(target: RenderTarget, maskData: any): void;
        pushSpriteMask(target: RenderTarget, maskData: any): void;
        popSpriteMask(): void;
        pushStencilMask(maskData: any): void;
        popStencilMask(): void;
        pushScissorMask(target: RenderTarget, maskData: any): void;
        popScissorMask(): void;

    }
    export class StencilManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        stencilMaskStack: StencilMaskStack[];

        setMaskStack(stencilMasStack: StencilMaskStack[]): void;
        pushStencil(graphics: Graphics): void;
        popStencil(): void;
        destroy(): void;

    }
    export class WebGLManager {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        onContextChange(): void;
        destroy(): void;

    }
    export class Filter {

        constructor(vertexSrc: string, fragmentSrc: string, uniforms: any);

        vertextSrc: string;
        fragmentSrc: string;
        protected uniformData: WebGLUniformLocation;
        uniforms: any;
        glShaders: WebGLShader[];
        glShaderKey: string;
        padding: number;
        resolution: number;
        apply(filterManager: FilterManager, input: RenderTarget, output: RenderTarget, clear?: boolean): void;

        static defaultVertexSrc: string;
        static defaultFragmentSrc: string;

    }
    export class SpriteMaskFilter extends Filter {
        constructor(sprite: Sprite);
        maskSprite: Sprite;
        maskMatrix: Matrix;
    }

    //sprites

    export class Sprite extends Container {

        constructor(texture?: Texture);

        protected _anchor: ObservablePoint2d;
        protected _size: ObservablePoint2d;
        protected _texture: Texture;
        tint: number;
        blendMode: number;
        shader: glCore.GLShader | Filter;
        protected cachedTint: number;
        texture: Texture;
        protected textureDirty: boolean;
        geometry: Geometry2D;
        isRayCastPossible: boolean;
        width: number;
        height: number;
        anchor: ObservablePoint2d;
        size: ObservablePoint2d;

        protected calculateVertices(): void;
        protected makeDirty(): void;
        protected _renderWebGL(renderer: WebGLRenderer);
        protected checkVertices(): void;
        protected _renderCanvas(renderer: CanvasRenderer);
        containsLocalPoint(point: Point): boolean;
        destroy(destroyTexture?: boolean, destroyBaseTexture?: boolean): void;

        static from(source: Texture): Sprite;
        static fromFrame(frameId: string): Sprite;
        static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

    }
    export class BatchBuffer {

        vertices: ArrayBuffer;
        float32View: number[];
        uint32View: number[];

        destroy(): void;

    }
    export class SpriteRenderer extends ObjectRenderer {

        vertSize: number;
        vertByteSize: number;
        size: number;
        buffers: BatchBuffer[];
        indices: number[];
        shader: glCore.GLShader;
        textureCount: number;
        currentIndex: number;
        tick: number;
        groups: any[];
        sprites: Sprite[];
        vertexBuffers: number[];
        vaos: any[];
        vaoMax: number;
        vertexCount: number;

        protected onPrerender(): void;
        render(object: Sprite): void;
        flush(): void;
        start(): void;
        stop(): void;
        destroy(): void;

    }
    export class CanvasSpriteRenderer extends ObjectRenderer {

        constructor(renderer: WebGLRenderer);

        render(object: Sprite): void;
        destroy(): void;

    }
    export class CanvasTinter {

        static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static roundColor(color: number): number;

        static cacheStepsPerColorChannel: number;
        static convertTintToImage: boolean;
        static canUseMultiply: boolean;
        static tintMethod: Function;

    }

    //text

    export interface TextStyle {

        font?: string;
        fill?: string | CanvasGradient | CanvasPattern;
        align?: string;
        stroke?: string | number;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        letterSpacing?: number;
        breakWords?: boolean;
        lineHeight?: number;
        dropShadow?: boolean;
        dropShadowColor?: string | number;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        dropShadowBlur?: number;
        padding?: number;
        textBaseline?: string;
        lineJoin?: string;
        miterLimit?: number;

    }
    export class Text extends Sprite {

        constructor(text?: string, style?: TextStyle, resolution?: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;
        protected _text: string;
        protected _style: TextStyle;
        static fontPropertiesCache: any;
        static fontPropertiesCanvas: HTMLCanvasElement;
        static fontPropertiesContext: CanvasRenderingContext2D;
        width: number;
        height: number;
        style: TextStyle;
        text: string;

        protected updateText(): void;
        protected drawLetterSpacing(text: string, x: number, y: number, isStroke: boolean): void;
        protected updateTexture(): void;
        protected _renderWebGL(renderer: WebGLRenderer): void;
        protected _renderCanvas(renderer: CanvasRenderer): void;
        protected determineFontProperties(fontStyle: TextStyle): TextStyle;
        protected wordWrap(text: string): boolean;
        getBounds(): Rectangle;
        destroy(): void;

        dirty: boolean;

    }

    //textures

    export class BaseRenderTexture extends BaseTexture {

        constructor(width?: number, height?: number, scaleMode?: number, resolution?: number);

        width: number;
        height: number;
        resolution: number;
        scaleMode: number;
        hasLoaded: boolean;
        protected _glRenderTargets: any;
        protected _canvasRenderTarget: any;
        valid: boolean;

        resize(width?: number, height?: number): boolean;
        destroy(): void;

        once(event: 'update', fn: (baseRenderTexture: BaseRenderTexture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: 'update', fn: (baseRenderTexture: BaseRenderTexture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class BaseTexture extends utils.EventEmitter {

        constructor(source: HTMLImageElement | HTMLCanvasElement, scaleMode?: number, resolution?: number);

        protected uuid: number;
        protected touched: number;
        resolution: number;
        width: number;
        height: number;
        realWidth: number;
        realHeight: number;
        scaleMode: number;
        hasLoaded: boolean;
        isLoading: boolean;
        source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        premultipliedAlpha: boolean;
        imageUrl: string;
        protected isPowerOfTwo: boolean;
        mipmap: boolean;
        wrap: boolean;
        protected _glTextures: WebGLTexture[];
        protected _enabled: number;
        protected _id: number;

        update(): void;
        loadSource(source: HTMLImageElement | HTMLCanvasElement): void;
        protected _sourceLoaded(): void;
        destroy(): void;
        dispose(): void;
        updateSourceImage(newSrc: string): void;

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): BaseTexture;

        on(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: 'update', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'loaded', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'error', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: 'dispose', fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class RenderTexture extends BaseTexture {

        constructor(baseRenderTexture: BaseTexture, frame: Rectangle);

        protected legacyRenderer: any;
        valid: boolean;

        resize(width: number, height: number, doNotResizeBaseTexture?: boolean): void;

        static create(width?: number, height?: number, scaleMode?: number, resolution?: number): RenderTexture;

    }
    export class Texture extends utils.EventEmitter {

        constructor(baseTexture: BaseTexture, frame?: Rectangle, orig?: Rectangle, trim?: Rectangle, rotate?: number);

        noFrame: boolean;
        baseTexture: BaseTexture;
        protected _frame: Rectangle;
        trim: Rectangle;
        valid: boolean;
        requiresUpdate: boolean;
        protected _uvs: TextureUvs;
        orig: Rectangle;
        protected _rotate: boolean;
        frame: Rectangle;
        rotate: number;
        width: number;
        height: number;

        update(): void;
        protected onBaseTextureLoaded(baseTexture: BaseTexture): void;
        protected onBaseTextureUpdated(baseTexture: BaseTexture): void;
        destroy(destroyBase?: boolean): void;
        clone(): Texture;
        protected _updateUvs(): void;

        static fromImage(imageUrl: string, crossOrigin?: boolean, scaleMode?: number): Texture;
        static fromFrame(frameId: string): Texture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): Texture;
        static fromVideo(video: HTMLVideoElement | string, scaleMode?: number): Texture;
        static fromVideoUrl(videoUrl: string, scaleMode?: number): Texture;
        static from(source: any): Texture;

        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;

        static EMPTY: Texture;

        on(event: 'update', fn: (texture: Texture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: 'update', fn: (texture: Texture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class TextureUvs {

        x0: number;
        y0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;

        uvsUint32: number[];

        protected set(frame: Rectangle, baseFrame: Rectangle, rotate: number): void;

    }
    export class VideoBaseTexture extends BaseTexture {

        constructor(source: HTMLVideoElement, scaleMode?: number);

        autoUpdate: boolean;

        protected _onUpdate(): void;
        protected _onCanPlay(): void;
        protected _onPlayStart(): void;
        protected _onPlayStop(): void;
        destroy(): void;

        static fromVideo(video: HTMLVideoElement, scaleMode?: number): VideoBaseTexture;
        static fromUrl(videoSrc: string | any | string[] | any[]): VideoBaseTexture;
        static fromUrls(videoSrc: string | any | string[] | any[]): VideoBaseTexture;

    }

    //ticker

    module ticker {

        export var shared: Ticker;

        export class Ticker {

            protected _tick(time: number): void;
            protected _emitter: utils.EventEmitter;
            protected _requestId: number;
            protected _maxElapsedMS: number;

            protected _requestIfNeeded(): void;
            protected _cancelIfNeeded(): void;
            protected _startIfPossible(): void;

            autoStart: boolean;
            deltaTime: number;
            elapsedMS: number;
            lastTime: number;
            speed: number;
            started: boolean;

            FPS: number;
            minFPS: number;

            add(fn: (deltaTime: number) => void, context?: any): Ticker;
            addOnce(fn: (deltaTime: number) => void, context?: any): Ticker;
            remove(fn: (deltaTime: number) => void, context?: any): Ticker;
            start(): void;
            stop(): void;
            update(): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRACT///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export class Extract {

        protected renderer: CanvasRenderer;

        constructor(renderer: CanvasRenderer);

        image(target?: DisplayObject | RenderTexture): HTMLImageElement;
        base64(target?: DisplayObject | RenderTexture): string;
        canvas(target?: DisplayObject | RenderTexture): HTMLCanvasElement;
        pixels(renderTexture?: DisplayObject | RenderTexture): number[];

        destroy(): void;

    }
    export class WebGLExtract {

        protected renderer: CanvasRenderer;

        constructor(renderer: CanvasRenderer);

        image(target?: DisplayObject | RenderTexture): HTMLImageElement;
        base64(target?: DisplayObject | RenderTexture): string;
        canvas(target?: DisplayObject | RenderTexture): HTMLCanvasElement;
        pixels(renderTexture?: DisplayObject | RenderTexture): number[];

        destroy(): void;

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRAS////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module extras {

        export interface BitmapTextStyle {

            font?: string | {

                name?: string;
                size?: number;

            };
            align?: string;
            tint?: number;

        }
        export class BitmapText extends Container {

            constructor(text: string, style?: BitmapTextStyle);

            textWidth: number;
            textHeight: number;
            protected _glyphs: Sprite[];
            protected _font: string | {
                tint?: number;
                align?: string;
                name: string;
                size: number;
            };
            font: string | {
                tint?: number;
                align?: string;
                name: string;
                size: number;
            };
            protected _text: string;
            maxWidth: number;
            maxLineHeight: number;
            dirty: boolean;

            protected updateText(): void;

            tint: number;
            align: string;
            updateTransform(): void;
            getLocalBounds(): Rectangle;
            validate(): void;
            text: string;

            static fonts: any;

        }
        export class MovieClip extends Sprite {

            constructor(textures: Texture[] | { texture: Texture, time?: number }[]);

            protected _textures: Texture[];
            protected _durations: number[];
            textures: Texture[] | { texture: Texture, time?: number }[];
            animationSpeed: number;
            loop: boolean;
            onComplete: () => void;
            protected _currentTime: number;
            playing: boolean;
            totalFrames: number;
            currentFrame: number;
            stop(): void;
            play(): void;
            gotoAndStop(frameName: number): void;
            gotoAndPlay(frameName: number): void;
            protected update(deltaTime: number): void;
            destroy(): void;

            static fromFrames(frame: string[]): MovieClip;
            static fromImages(images: string[]): MovieClip;

        }
        export class TilingSprite extends Sprite {

            tileScale: Point;
            tilePosition: Point;
            protected _uvs: TextureUvs[];
            protected _canvasPattern: CanvasPattern;
            protected _glDatas: any[];

            constructor(texture: Texture, width: number, height: number);

            protected _renderWebGL(renderer: WebGLRenderer): void;
            protected _renderCanvas(renderer: CanvasRenderer): void;
            protected calculateVertices(): void;
            containsLocalPoint(point: Point): boolean;
            destroy(): void;

            //This is really unclean but is the only way :(
            //See http://stackoverflow.com/questions/29593905/typescript-declaration-extending-class-with-static-method/29595798#29595798
            //Thanks bas!
            static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;
            static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;
            static fromImage(imageId: string, width?: number, height?: number, crossorigin?: boolean, scaleMode?: number): TilingSprite;

            protected _tileScaleOffset: Point;

        }
        export class TilingShader extends glCore.GLShader { }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////FILTERS///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module filters {

        export class FXAAFilter extends Filter {

            applyFilter(renderer: WebGLRenderer, input: RenderTarget, output: RenderTarget): void;

        }
        export class BlurFilter extends Filter {

            protected blurXFilter: BlurXFilter;
            protected blurYFilter: BlurYFilter;

            padding: number;

            blur: number;
            passes: number;
            blurX: number;
            blurY: number;

        }
        export class BlurXFilter extends Filter {

            passes: number;
            resolution: number;
            strength: number;
            blur: number;

        }
        export class BlurYFilter extends Filter {

            passes: number;
            resolution: number;
            strength: number;
            blur: number;

        }
        export class ColorMatrixFilter extends Filter {

            protected _loadMatrix(matrix: number[], multiply?: boolean): void;
            protected _multiply(out: number[], a: number[], b: number[]): void;
            protected _colorMatrix(matrix: number[]): void;

            matrix: number[];

            brightness(b: number, multiply?: boolean): void;
            greyscale(scale: number, multiply?: boolean): void;
            blackAndWhite(multiply?: boolean): void;
            hue(rotation: number, multiply?: boolean): void;
            contrast(amount: number, multiply?: boolean): void;
            saturate(amount: number, multiply?: boolean): void;
            desaturate(multiply?: boolean): void;
            negative(multiply?: boolean): void;
            sepia(multiply?: boolean): void;
            technicolor(multiply?: boolean): void;
            polaroid(multiply?: boolean): void;
            toBGR(multiply?: boolean): void;
            kodachrome(multiply?: boolean): void;
            browni(multiply?: boolean): void;
            vintage(multiply?: boolean): void;
            colorTone(desaturation: number, toned: number, lightColor: string, darkColor: string, multiply?: boolean): void;
            night(intensity: number, multiply?: boolean): void;
            predator(amount: number, multiply?: boolean): void;
            lsd(multiply?: boolean): void;
            reset(): void;

        }
        export class DisplacementFilter extends Filter {

            constructor(sprite: Sprite, scale?: number);

            scale: Point;
            map: Texture;

        }
        export class GodrayFilter extends Filter {

            offset: Point;
            radius: number;
            angle: number;

        }
        export class GrayFilter extends Filter {

            gray: number;

        }
        export class TwistFilter extends Filter {

            offset: Point;
            radius: number;
            angle: number;

        }

        //pixi-filters.d.ts todo
        //https://github.com/pixijs/pixi-filters/
        export class AsciiFilter extends Filter {
            size: number;
        }
        export class BloomFilter extends Filter {

            blur: number;
            blurX: number;
            blurY: number;

        }
        export class BlurDirFilter extends Filter {
            constructor(dirX: number, dirY: number);
            defaultFilter: Filter;
            passes: number;
            dirX: number;
            dirY: number;
            strength: number;
            blur: number;
        }
        export class ColorStepFilter extends Filter {

            step: number;

        }
        export class ConvolutionFilter extends Filter {

            constructor(matrix: number[], width: number, height: number);

            matrix: number[];
            width: number;
            height: number;

        }
        export class CrossHatchFilter extends Filter {

        }
        export class DotScreenFilter extends Filter {

            scale: number;
            angle: number;

        }
        export class BlurYTintFilter extends Filter {

            blur: number;

        }
        export class DropShadowFilter extends Filter {

            blur: number;
            blurX: number;
            blurY: number;
            color: number;
            alpha: number;
            distance: number;
            angle: number;

        }
        export class InvertFilter extends Filter {

            invert: number;

        }
        export class NoiseFilter extends Filter {

            noise: number;

        }
        export class PixelateFilter extends Filter {

            size: Point;

        }
        export class RGBSplitFilter extends Filter {

            red: number;
            green: number;
            blue: number;

        }
        export class SepiaFilter extends Filter {

            sepia: number;

        }
        export class SmartBlurFilter extends Filter {
        }
        export class ShockwaveFilter extends Filter {

            center: number[];
            params: any;
            time: number;

        }
        export class TiltShiftAxisFilter extends Filter {

            blur: number;
            gradientBlur: number;
            start: number;
            end: number;

            updateDelta(): void;

        }
        export class TiltShiftFilter extends Filter {

            blur: number;
            gradientBlur: number;
            start: number;
            end: number;

        }
        export class TiltShiftXFilter extends Filter {

            updateDelta(): void;

        }
        export class TiltShiftYFilter extends Filter {

            updateDelta(): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////INTERACTION///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module interaction {

        export interface InteractionEvent {

            stopped: boolean;
            target: any;
            type: string;
            data: InteractionData;
            stopPropagation(): void;

        }
        export class InteractionData {

            global: DisplayPoint;

            protected _target: DisplayObject;
            target: DisplayObject;
            targetProxy: DisplayObject;
            originalEvent: Event;

            getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

        }
        export class InteractionManager {

            constructor(renderer: SystemRenderer, options?: { autoPreventDefault?: boolean; interactionFrequency?: number; });

            renderer: SystemRenderer;
            autoPreventDefault: boolean;
            interactionFrequency: number;
            mouse: InteractionData;
            eventData: {
                stopped: boolean;
                target: any;
                type: any;
                data: InteractionData;
                stopPropagination(): void;
            };
            interactiveDataPool: InteractionData[];
            protected interactionDOMElement: HTMLElement;
            protected moveWhenInside: boolean;
            protected eventsAdded: boolean;
            protected onMouseUp: (event: Event) => void;
            protected processMouseUp: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseDown: (event: Event) => void;
            protected processMouseDown: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseMove: (event: Event) => void;
            protected processMouseMove: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseOut: (event: Event) => void;
            protected processMouseOverOut: (displayObject: DisplayObject, hit: boolean) => void;
            protected onTouchStart: (event: Event) => void;
            protected processTouchStart: (DisplayObject: DisplayObject, hit: boolean) => void;
            protected onTouchEnd: (event: Event) => void;
            protected processTouchEnd: (displayObject: DisplayObject, hit: boolean) => void;
            protected onTouchMove: (event: Event) => void;
            protected processTouchMove: (displayObject: DisplayObject, hit: boolean) => void;
            last: number;
            defaultCursorStyle: string;
            currentCursorStyle: string;
            protected _tempPoint: Point;
            protected _queue: any[][];
            protected _eventDisplayOrder: number;
            resolution: number;
            protected setTargetElement(element: HTMLElement, resolution: number): void;
            protected addEvents(): void;
            protected removeEvents(): void;
            update(deltaTime: number): void;
            protected dispatchEvent(displayObject: DisplayObject, eventString: string, eventData: any): void;
            mapPositionToPoint(point: Point, x: number, y: number): void;
            protected _processInteractive(point: Point, displayObject: DisplayObject, hitTestOrder: boolean, interactive?: boolean): boolean;
            protected processInteractive(point: Point, displayObject: DisplayObject, func: (displayObject: DisplayObject, hit: boolean) => void, hitTest: boolean, interactive: boolean): boolean;
            protected _startInteractionProcess(): void;
            protected _queueAdd(displayObject: DisplayObject, order: number): void;
            protected _finishInteractionProcess(func: Function): void;
            protected getTouchData(touchEvent: InteractionData): InteractionData;
            protected returnTouchData(touchData: InteractionData): void;

            destroy(): void;

        }
        export interface InteractiveTarget {

            interactive: boolean;
            buttonMode: boolean;
            interactiveChildren: boolean;
            defaultCursor: string;

        }
        export interface InteractiveTargetProxy extends InteractiveTarget {
        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////LOADER/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //extends
    //https://github.com/englercj/resource-loader/
    //1.6.4

    export module loaders {

        export interface LoaderOptions {

            crossOrigin?: boolean | string;
            loadType?: number;
            xhrType?: string;
            metaData?: any;

        }
        export interface ResourceDictionary {

            [index: string]: PIXI.loaders.Resource;

        }
        export class Loader extends utils.EventEmitter {

            protected static _pixiMiddleware: Function[];
            static addPixiMiddleware(fn: Function): void;

            constructor(baseUrl?: string, concurrency?: number);

            baseUrl: string;
            progress: number;
            loading: boolean;
            resources: ResourceDictionary;

            add(name: string, url: string, options?: LoaderOptions, cb?: () => void): Loader;
            add(url: string, options?: LoaderOptions, cb?: () => void): Loader;
            //todo I am not sure of object literal notional (or its options) so just allowing any but would love to improve this
            add(obj: any, options?: LoaderOptions, cb?: () => void): Loader;

            on(event: 'complete', fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            on(event: 'error', fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'load', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'progress', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: 'start', fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            on(event: string, fn: Function, context?: any): utils.EventEmitter;

            once(event: 'complete', fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            once(event: 'error', fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'load', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'progress', fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: 'start', fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            once(event: string, fn: Function, context?: any): utils.EventEmitter;

            before(fn: Function): Loader;
            pre(fn: Function): Loader;

            after(fn: Function): Loader;
            use(fn: Function): Loader;

            reset(): void;

            load(cb?: (loader: loaders.Loader, object: any) => void): Loader;

        }
        export class Resource extends utils.EventEmitter {

            static LOAD_TYPE: {
                XHR: number;
                IMAGE: number;
                AUDIO: number;
                VIDEO: number;
            };

            static XHR_READ_STATE: {
                UNSENT: number;
                OPENED: number;
                HEADERS_RECIEVED: number;
                LOADING: number;
                DONE: number;
            };

            static XHR_RESPONSE_TYPE: {
                DEFAULT: number;
                BUFFER: number;
                BLOB: number;
                DOCUMENT: number;
                JSON: number;
                TEXT: number;
            };

            constructor(name?: string, url?: string | string[], options?: LoaderOptions);

            name: string;
            texture: Texture;
            textures: Texture[];
            url: string;
            data: any;
            crossOrigin: boolean | string;
            loadType: number;
            xhrType: string;
            error: Error;
            xhr: XMLHttpRequest;
            SVGMetadataElement: any;

            complete(): void;
            load(cb?: () => void): void;

        }
    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////MESH///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module mesh {

        export class Mesh extends Container {

            constructor(texture: Texture, vertices?: number[], uvs?: number[], indices?: number[], drawMode?: number);

            protected _texture: Texture;
            uvs: number[];
            dirty: boolean;
            indexDirty: boolean;
            dirtyVertex: boolean;
            protected _geometryVersion: number;
            blendMode: number;
            canvasPadding: number;
            drawMode: number;
            texture: Texture;
            shader: glCore.GLShader;
            protected _glDatas: any[];
            isRaycastCheckingBounds: boolean;
            isRaycastPossible: boolean;
            vertices: number[];
            indices: number[];
            protected _renderWebGL(renderer: WebGLRenderer): void;
            protected _renderCanvas(renderer: CanvasRenderer): void;
            protected _renderCanvasTriangleMesh(context: CanvasRenderingContext2D): void;
            protected _renderCanvasTriangles(context: CanvasRenderingContext2D): void;
            protected _renderCanvasDrawTriangle(context: CanvasRenderingContext2D, vertices: number[], uvs: number[], index0: number, index1: number, index2: number): void;
            protected renderMeshFlat(Mesh: Mesh): void;
            protected _onTextureUpdate(): void;
            containsLocalPoint(point: Point): boolean;

            static DRAW_MODES: {
                TRIANGLE_MESH: number;
                TRIANGLES: number;
            };

        }
        export class Plane extends Mesh {

            constructor(texture: Texture, segmentsX?: number, segmentsY?: number);
            protected _ready: boolean;
            segmentsX: number;
            segmentsY: number;
            drawMode: number;

            refresh(): void;

            protected _onTexureUpdate(): void;

        }
        export class Rope extends Mesh {

            constructor(texture: Texture, points: Point[]);

            points: Point[];
            colors: number[];
            protected _ready: boolean;
            refresh(): void;

            protected _onTextureUpdate(): void;
            updateTransform(): void;

        }

        export interface MeshShader extends glCore.GLShader { }

    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////PARTICLES////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module particles {

        export interface ParticleContainerProperties {

            scale?: boolean;
            position?: boolean;
            rotation?: boolean;
            uvs?: boolean;
            alpha?: boolean;

        }
        export class ParticleContainer extends Container {

            constructor(size?: number, properties?: ParticleContainerProperties, batchSize?: number);

            protected _properties: boolean[];
            protected _maxSize: number;
            protected _batchSize: number;
            protected _glBuffers: WebGLBuffer[];
            protected _bufferToUpdate: number;
            interactiveChildren: boolean;
            blendMode: number;
            roundPixels: boolean;
            baseTexture: BaseTexture;

            setProperties(properties: ParticleContainerProperties): void;
            protected onChildrenChange: (smallestChildIndex?: number) => void;

            destroy(): void;

        }
        export interface ParticleBuffer {

            constructor(gl: WebGLRenderingContext, properties: any, dynamicPropertyFlags: any[], size: number);

            gl: WebGLRenderingContext;
            vertSize: number;
            vertByteSize: number;
            size: number;
            dynamicProperties: any[];
            staticProperties: any[];
            staticStride: number;
            staticBuffer: any;
            staticData: any;
            dynamicStride: number;
            dynamicBuffer: any;
            dynamicData: any;

            bind(): void;
            destroy(): void;

        }
        export interface IParticleRendererProperty {
            attribute: number;
            size: number;
            uploadFunction: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
            offset: number;
        }
        export class ParticleRenderer extends ObjectRenderer {

            constructor(renderer: WebGLRenderer);

            shader: glCore.GLShader;
            indexBuffer: WebGLBuffer;
            properties: IParticleRendererProperty[];
            protected tempMatrix: Matrix;

            start(): void;
            generateBuffers(container: ParticleContainer): ParticleBuffer[];
            uploadVertices(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadPosition(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadRotation(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadUvs(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadAlpha(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            destroy(): void;

            indices: Uint16Array;

        }
        export interface ParticleShader extends glCore.GLShader { }

    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////pixi-gl-core/////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //pixi-gl-core https://github.com/pixijs/pixi-gl-core
    //SharedArrayBuffer as a type is not available yet. 
    //Need to fully define what an `Attrib` is. 
    export module glCore {

        export interface ContextOptions {
            /**
             * Boolean that indicates if the canvas contains an alpha buffer.
             */
            alpha?: boolean;
            /**
             * Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
             */
            depth?: boolean;
            /**
             * Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
             */
            stencil?: boolean;
            /**
             * Boolean that indicates whether or not to perform anti-aliasing.
             */
            antialias?: boolean;
            /**
             * Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
             */
            premultipliedAlpha?: boolean;
            /**
             * If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
             */
            preserveDrawingBuffer?: boolean;
            /**
             *  Boolean that indicates if a context will be created if the system performance is low.
             */
            failIfMajorPerformanceCaveat?: boolean;
        }
        export function createContext(view: HTMLCanvasElement, options?: ContextOptions): WebGLRenderingContext;
        export function setVertexAttribArrays(gl: WebGLRenderingContext, attribs: Attrib[], state?: WebGLState): WebGLRenderingContext;
        export class GLBuffer {

            static EMPTY_ARRAY_BUFFER: ArrayBuffer;

            constructor(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView | any, drawType: number);

            gl: WebGLRenderingContext;
            buffer: WebGLBuffer;
            type: number;
            drawType: number;
            data: ArrayBuffer | ArrayBufferView | any;

            upload(data: ArrayBuffer | ArrayBufferView | any, offset: number, dontBind: boolean): void;
            bind(): void;

            static createVertexBuffer(gl: WebGLRenderingContext, data: ArrayBuffer | ArrayBufferView | any, drawType: number): WebGLBuffer;
            static createIndexBuffer(gl: WebGLRenderingContext, data: ArrayBuffer | ArrayBufferView | any, drawType: number): WebGLBuffer;
            static create(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView | any, drawType: number): WebGLBuffer;

            destroy(): void;

        }
        export class GLFramebuffer {

            constructor(gl: WebGLRenderingContext, width: number, height: number);

            gl: WebGLRenderingContext;
            frameBuffer: WebGLFramebuffer;
            stencil: WebGLRenderbuffer;
            texture: GLTexture;
            width: number;
            height: number;

            enableTexture(texture: GLTexture): void;
            enableStencil(): void;
            clear(r: number, g: number, b: number, a: number): void;
            bind(): void;
            unbind(): void;
            resize(width: number, height: number): void;
            destroy(): void;

            static createRGBA(gl: WebGLRenderingContext, width: number, height: number, data: ArrayBuffer | ArrayBufferView | any): GLFramebuffer;
            static createFloat32(gl: WebGLRenderingContext, width: number, height: number, data: ArrayBuffer | ArrayBufferView | any): GLFramebuffer;

        }
        export class GLShader {

            constructor(gl: WebGLRenderingContext, vertexSrc: string | string[], fragmentSrc: string | string[]);

            gl: WebGLRenderingContext;
            program: WebGLProgram;
            uniforms: any;

            bind(): void;
            destroy(): void;

        }
        export class GLTexture {

            constructor(gl: WebGLRenderingContext, width: number, height: number, format: number, type: number);

            gl: WebGLRenderingContext;
            texture: WebGLTexture;
            mipmap: boolean;
            premultiplyAlpha: boolean;
            width: number;
            height: number;
            format: number;
            type: number;

            upload(source: HTMLImageElement | ImageData | HTMLVideoElement): void;
            uploadData(data: number, width: number, height: number): void;
            bind(): void;
            unbind(): void;
            minFilter(linear: boolean): void;
            magFilter(linear: boolean): void;
            enableMipmap(): void;
            enableLinearScaling(): void;
            enableNearestScaling(): void;
            enableWrapClamp(): void;
            enableWrapRepeat(): void;
            enableWrapMirrorRepeat(): void;
            destroy(): void;

            static fromSource(gl: WebGLRenderingContext, source: HTMLImageElement | ImageData | HTMLVideoElement, premultipleAlpha?: boolean): GLTexture;
            static fromData(gl: WebGLRenderingContext, data: number[], width: number, height: number): GLTexture;

        }
        export interface Attrib {

            attribute: {
                location: boolean;
                size: number;
            };
            normalized: boolean;
            stride: number;
            start: number;
            buffer: ArrayBuffer;

        }
        export interface WebGLRenderingContextAttribute {

            buffer: WebGLBuffer;
            attribute: any;
            type: number;
            normalized: boolean;
            stride: number;
            start: number;

        }
        export interface AttribState {
            tempAttribState: Attrib[];
            attribState: Attrib[];
        }

        export class VertexArrayObject {

            static FORCE_NATIVE: boolean;

            constructor(gl: WebGLRenderingContext, state: WebGLState);

            protected nativeVaoExtension: any;
            protected nativeState: AttribState;
            protected nativeVao: VertexArrayObject;
            gl: WebGLRenderingContext;
            attributes: Attrib[];
            indexBuffer: WebGLBuffer;
            dirty: boolean;

            bind(): VertexArrayObject;
            unbind(): VertexArrayObject;
            activate(): VertexArrayObject;
            addAttribute(buffer: WebGLBuffer, attribute: Attrib, type: number, normalized: boolean, stride: number, start: number): VertexArrayObject;
            addIndex(buffer: WebGLBuffer, options?: any): VertexArrayObject;
            clear(): VertexArrayObject;
            draw(type: number, size: number, start: number): VertexArrayObject;
            destroy(): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////UTILS//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module utils {

        export function uid(): number;
        export function hex2rgb(hex: number, out?: number[]): number[];
        export function hex2string(hex: number): string;
        export function rgb2hex(rgb: Number[]): number;
        export function canUseNewCanvasBlendModes(): boolean;
        export function getNextPowerOfTwo(number: number): number;
        export function isPowerOfTwo(width: number, height: number): boolean;
        export function getResolutionOfUrl(url: string): number;
        export function sayHello(type: string): void;
        export function isWebGLSupported(): boolean;
        export function sign(n: number): number;
        export function removeItems<T>(arr: T[], startIdx: number, removeCount: number): void;
        export var TextureCache: any;
        export var BaseTextureCache: any;

        //https://github.com/primus/eventemitter3
        export class EventEmitter {

            listeners(event: string): Function[];
            emit(event: string, ...args: any[]): boolean;
            on(event: string, fn: Function, context?: any): EventEmitter;
            once(event: string, fn: Function, context?: any): EventEmitter;
            removeListener(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            removeAllListeners(event: string): EventEmitter;

            off(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            addListener(event: string, fn: Function, context?: any): EventEmitter;

        }

    }

}

declare module 'pixi.js' {
    export = PIXI;
}
