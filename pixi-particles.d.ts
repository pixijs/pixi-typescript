// Type definitions for pixi-particles
// Project: https://github.com/pixijs/pixi-particles
// Definitions by: clark-stevenson <https://github.com/pixijs/pixi-typescript>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path="pixi.js.d.ts"/>
declare module PIXI {

    export module particles {

        export interface EmitterConfig {

            alpha?: {
                start?: number;
                end?: number;
            };
            speed?: {
                start?: number;
                end?: number;
            };
            acceleration?: PIXI.Point;
            scale?: {
                start?: number;
                end?: number;
                minimumScaleMultiplier?: number;
            };
            color?: {
                start?: number;
                end?: number;
            };
            startRotation?: {
                min?: number;
                max?: number;
            };
            rotationSpeed?: {
                min?: number;
                max?: number;
            };
            lifetime?: {
                min?: number;
                max?: number;
            };
            blendMode?: number;
            ease?: (time: number) => void;
            extraData?: any;
            spawnType?: string;
            frequency?: number;
            emitterLifetime?: number;
            maxParticles?: number;
            addAtBack?: boolean;
            pos?: PIXI.Point;

        }

        export class Emitter {

            constructor(particleParent: PIXI.DisplayObject, particleImages?: PIXI.Texture | PIXI.Texture[] | string | string[], config?: EmitterConfig);

            protected _particleConstructor: Particle;

            particleImages: PIXI.Texture | PIXI.Texture[] | string | string[];
            startAlpha: number;
            endAlpha: number;
            startSpeed: number;
            endSpeed: number;
            acceleration: PIXI.Point;
            startScale: number;
            endScale: number;
            minimumScaleMultiplier: number;
            startColor: number;
            endColor: number;
            minLifetime: number;
            maxLifetime: number;
            minStartRotation: number;
            maxStartRotation: number;
            minRotationSpeed: number;
            maxRotationSpeed: number;
            particleBlendMode: number;
            customEase: number;
            extraData: any;
            protected _frequency: number;
            maxParticles: number;
            emitterLifetime: number;
            spawnPos: PIXI.Point;
            protected _spawnFunc: Function;
            spawnRect: PIXI.Rectangle;
            spawnCircle: PIXI.Circle;
            particlesPerWave: number;
            particleSpacing: number;
            angleStart: number;
            rotation: number;
            ownerPos: PIXI.Point;
            protected _prevEmitterPos: PIXI.Point;
            protected _prevPosIsValid: boolean;
            protected _posChanged: boolean;
            protected _parentIsPC: boolean;
            protected _parent: PIXI.DisplayObject | PIXI.ParticleContainer;
            addAtBack: boolean;
            particleCount: number;
            protected _emit: boolean;
            protected _spawnTimer: boolean;
            protected _emitterLife: number;
            protected _activeParticlesFirst: Particle;
            protected _activeParticlesLast: Particle;
            protected _poolFirst: Particle;
            protected _origConfig: EmitterConfig;
            protected _origArt: PIXI.Texture | PIXI.Texture[] | string | string[];

            frequency: number;
            particleConstructor: Function;
            parent: PIXI.DisplayObject;

            init(art: PIXI.Texture | PIXI.Texture[], config: EmitterConfig): void;
            recycle(particle: Particle): void;
            rotate(newRot: number): void;
            updateSpawnPos(x: number, y: number): void;
            updateOwnerPos(x: number, y: number): void;
            resetPositionTracking(): void;

            emit: boolean;

            update(delta: number): void;

            protected _spawnPoint(p: Particle, emitPosX: number, emitPosY: number): void;
            protected _spawnRect(p: Particle, emitPosX: number, emitPosY: number): void;
            protected _spawnCircle(p: Particle, emitPosX: number, emitPosY: number): void;
            protected _spawnRing(p: Particle, emitPosX: number, emitPosY: number): void;
            protected _spawnBurst(p: Particle, emitPosX: number, emitPosY: number, i: number): void;

            cleanup(): void;
            destroy(): void;

        }

        export class Particle extends PIXI.Sprite {

            constructor(emitter: Emitter);

            emitter: Emitter;
            velocity: PIXI.Point;
            maxLife: number;
            age: number;
            ease: (time: number) => void;
            extraData: any;
            startAlpha: number;
            endAlpha: number;
            startSpeed: number;
            endSpeed: number;
            acceleration: PIXI.Point;
            startScale: number;
            endScale: number;
            startColor: number;
            protected _sR: number;
            protected _sG: number;
            protected _sB: number;
            endColor: number;
            protected _eR: number;
            protected _eG: number;
            protected _eB: number;
            protected _doAlpha: boolean;
            protected _doScale: boolean;
            protected _doSpeed: boolean;
            protected _doAcceleration: boolean;
            protected _doColor: boolean;
            protected _doNormalMovement: boolean;
            protected _oneOverLife: number;
            protected next: Particle;
            protected prev: Particle;

            protected init(): void;

            applyArt(art: PIXI.Texture): void;
            update(delta: number): number;
            kill(): void;
            destroy(): void;

            static parseArt(art: PIXI.Texture[]): PIXI.Texture[];
            static parseData(extraData: any): any;

        }

        export class ParticleUtils {

            static DEG_TO_RAGS: number;
            static useAPI3: boolean;
            static rotatePoint(angle: number, p: PIXI.Point): void;
            static combineRGBComponents(r: number, g: number, b: number): number;
            static normalize(point: PIXI.Point): PIXI.Point;
            static scaleBy(point: PIXI.Point, value: number): void;
            static length(point: PIXI.Point): number;
            static hexToRGB(color: string, output: number[]): number[];
            static generateEase(segments: any[]): (time: number) => void;
            static getBlendMode(name: string): number;

        }

        export class PathParticle {

            constructor(emitter: Emitter);

            path: Function;
            initialRotation: number;
            initialPosition: PIXI.Point;
            movement: number;

            static helperPoint: PIXI.Point;

            init(): void;
            update(delata: number): void;
            destroy(): void;

            static parseArt(art: PIXI.Texture[]): PIXI.Texture[];
            static parseData(extraData: any): any;

        }

    }

}