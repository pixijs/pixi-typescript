/**
 * Created by martijncroezen on 9-7-2015.
 * note: I haven't implemented all returntypes n stuff..
 */
///<reference path="pixi.d.ts"/>
declare module PIXI
{

	export module spine
	{


		export class Animation
		{
			constructor(name, timelines, duration);

			apply(skeleton, lastTime, time, loop, events);

			mix(skeleton, lastTime, time, loop, events, alpha);

			binarySearch(values, target, step);

			binarySearch1(values, target);

			linearSearch(values, target, step);

			name;
			timelines;
			duration;

		}

		export class AnimationState
		{
			data;
			tracks;
			events:Event[];
			onStart:Function;
			onEnd:Function;
			onComplete:Function;
			onEvent:Function;
			timeScale:number;

			constructor(stateData);

			update(delta);

			apply(skeleton);

			clearTracks();

			clearTrack(trackIndex);

			protected _expandToIndex(index);

			setCurrent(index, entry);

			setAnimationByName(trackIndex, animationName, loop);

			setAnimation(trackIndex, animation, loop);

			addAnimationByName(trackIndex, animationName, loop, delay);

			addAnimation(trackIndex, animation, loop, delay);

			getCurrent(trackIndex);

		}


		export class Spine extends PIXI.Container
		{

			constructor(spineData:any);

			fromAtlas(resourceName);

			update(dt);

			autoUpdateTransform();

			createSprite(slot, attachment)

			createMesh(slot, attachment)

			spineData:any;
			skeleton:Skeleton;
			stateData:AnimationStateData;
			state:AnimationState;
			slotContainers:PIXI.Container[];
			autoUpdate:boolean;


		}


		export class AnimationStateData
		{
			constructor(skeletonData);

			defaultMix:number;
			skeletonData:SkeletonData;
			animationToMixTime:any;

			setMixByName(fromName, toName, duration);

			setMix(from, to, duration);

			getMix(from, to);
		}

		export class AttachmentType
		{
			region:number;
			boundingbox:number;
			mesh:number;
			skinnedmesh:number;
		}

		export class Bone
		{
			data:BoneData
			skeleton:Skeleton
			parent:Bone;

			constructor(boneData, skeleton, parent);

			x:number;
			y:number;
			rotation:number;
			rotationIK:number;
			scaleX:number;
			scaleY:number;
			flipX:boolean;
			flipY:boolean;
			m00:number;
			m01:number;
			worldX:number;
			m10:number;
			m11:number;
			worldY:number;
			worldRotation:number;
			worldScaleX:number;
			worldScaleY:number;
			worldFlipX:boolean;
			worldFlipY:boolean;

			updateWorldTransform()

			setToSetupPose();

			worldToLocal(world);

			localToWorld(local);

		}


		export class BoneData
		{
			name:string;
			parent;

			constructor(name, parent);

			length:number;
			x:number;
			y:number;
			rotation:number;
			scaleX:number;
			scaleY:number;
			inheritScale:boolean;
			inheritRotation:boolean;
			flipX:boolean;
			flipY:boolean;
		}


		export class BoundingBoxAttachment
		{
			constructor(name);

			name:string;
			vertices;
			type:number;

			computeWorldVertices(x, y, bone, worldVertices);
		}


		export class ColorTimeline
		{
			curves:Curves;
			frames;//:[];
			slotIndex:number;

			constructor(frameCount);

			getFrameCount();

			setFrame(frameIndex, time, r, g, b, a);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}

		export class Curves
		{
			constructor(frameCount)

			curves:number[];

			setLinear(frameIndex);

			setStepped(frameIndex);

			setCurve(frameIndex, cx1, cy1, cx2, cy2);

			getCurvePercent(frameIndex, percent);
		}


		export class DrawOrderTimeline
		{
			constructor(frameCount);

			frames;// = []; // time, ...
			drawOrders;// = [];
			getFrameCount();

			setFrame(frameIndex, time, drawOrder);

			apply(skeleton, lastTime, time, firedEvents, alpha);

		}

		export class Event
		{
			constructor(data);

			data:any;
			intValue:number;
			floatValue:number;
			stringValue:string;
		}


		export class EventData
		{
			constructor(name);

			name:string;

			intValue:number;
			floatValue:number;
			stringValue:string;
		}

		export class EventTimeline
		{
			constructor(frameCount);

			frames;// = []; // time, ...
			events;// = [];
			getFrameCount();

			setFrame(frameIndex, time, event);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}


		export class FfdTimeline
		{
			constructor(frameCount);

			curves:Curves;
			framesl;// = [];
			frameVertices;// = [];
			slotIndex:number;
			attachment:number;

			getFrameCount();

			setFrame(frameIndex, time, vertices);

			apply(skeleton, lastTime, time, firedEvents, alpha);

		}

		export class FlipXTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames;// = []; // time, flip, ...
			boneIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, vertices);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}

		export class FlipYTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames;// = []; // time, flip, ...
			boneIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, vertices);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}

		export class IkConstraint
		{
			constructor(data, skeleton);

			data;
			mix;
			bendDirection:number;
			bones:Bone[];
			target:Bone;

			apply();

			apply1(bone, targetX, targetY, alpha);

			apply2(parent, child, targetX, targetY, bendDirection, alpha);
		}

		export class IkConstraintData
		{
			constructor(name);

			name:string;
			bones:Bone[];
			target;
			bendDirection:number;
			mix;
		}

		export class IkConstraintTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames:number[];
			ikConstraintIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, mix, bendDirection);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}


		export class MeshAttachment
		{
			constructor(name);

			name:string;
			type:number;
			vertices;
			uvs;
			regionUVs;
			triangles;
			hullLength:number;
			r:number;
			g:number;
			b:number;
			a:number;
			path;
			rendererObject;
			regionU:number;
			regionV:number;
			regionU2:number;
			regionV2:number;
			regionRotate:boolean;
			regionOffsetX:number;
			regionOffsetY:number;
			regionWidth:number;
			regionHeight:number;
			regionOriginalWidth:number;
			regionOriginalHeight:number;
			edges;
			width:number;
			height:number;

			updateUVs()

			computeWorldVertices(x, y, slot, worldVertices);
		}


		export class RegionAttachment
		{
			constructor(name);

			name:string;
			offset;
			uvs;
			type:number;
			x:number;
			y:number;
			rotation:number;
			scaleX:number;
			scaleY:number;
			width:number;
			height:number;
			r:number;
			g:number;
			b:number;
			a:number;
			path;
			rendererObject;
			regionOffsetX:number;
			regionOffsetY:number;
			regionWidth:number;
			regionHeight:number;
			regionOriginalWidth:number;
			regionOriginalHeight:number;

			setUVs(u, v, u2, v2, rotate);

			updateOffset();

			computeVertices(x, y, bone, vertices);
		}


		export class RotateTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames;

			boneIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, angle);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}


		export class ScaleTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames;
			boneIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, x, y);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}

		export class Skeleton
		{
			constructor(skeletonData);

			data:SkeletonData;
			bones:Bone[];
			slots:Slot[];
			drawOrder;
			ikConstraints:IkConstraint[];
			boneCache;
			x:number;
			y:number;
			skin;
			r:number;
			g:number;
			b:number;
			a:number;
			time:number;
			flipX:boolean;
			flipY:boolean;

			updateCache();

			updateWorldTransform();

			setToSetupPose();

			setBonesToSetupPose();

			setSlotsToSetupPose();

			getRootBone();

			findBone(boneName);

			findBoneIndex(boneName);

			findSlot(slotName);

			findSlotIndex(slotName);

			setSkinByName(skinName);

			setSkin(newSkin);

			getAttachmentBySlotName(slotName, attachmentName);

			getAttachmentBySlotIndex(slotIndex, attachmentName);

			setAttachment(slotName, attachmentName);

			findIkConstraint(ikConstraintName);

			update(delta);

			resetDrawOrder();

		}

		export class SkeletonBounds
		{
			polygonPool;
			polygons;
			boundingBoxes;
			minX:number;
			minY:number;
			maxX:number;
			maxY:number;

			update(skeleton, updateAabb);

			aabbCompute();

			aabbContainsPoint(x, y);

			aabbIntersectsSegment(x1, y1, x2, y2);

			aabbIntersectsSkeleton(bounds);

			containsPoint(x, y);

			intersectsSegment(x1, y1, x2, y2);

			polygonContainsPoint(polygon, x, y);

			polygonIntersectsSegment(polygon, x1, y1, x2, y2);

			getPolygon(attachment);

			getWidth();

			getHeight();
		}

		export class SkeletonData
		{
			bones:Bone[];
			slots:Slot[];
			skins:Skin[];
			events:Event[];
			animations;
			ikConstraints:IkConstraint[];
			name;
			defaultSkin;
			width:number;
			height:number;
			version;
			hash;

			findBone(boneName)

			findBoneIndex(boneName)

			findSlot(slotName)

			findSlotIndex(slotName)

			findSkin(skinName)

			findEvent(eventName)

			findAnimation(animationName)

			findIkConstraint(ikConstraintName)
		}


		export class SkeletonJsonParser
		{
			constructor(attachmentLoader);

			attachmentLoader;
			scale:number;

			readSkeletonData(root, name)

			readAttachment(skin, name, map)

			readAnimation(name, map, skeletonData)

			readCurve(timeline, frameIndex, valueMap)

			toColor(hexString, colorIndex)

			getFloatArray(map, name, scale)

			getIntArray(map, name)
		}


		export class Skin
		{
			constructor(name);

			name:string;
			attachments;

			addAttachment(slotIndex, name, attachment)

			getAttachment(slotIndex, name)

			protected _attachAll(skeleton, oldSkin)

		}


		export class SkinnedMeshAttachment
		{
			constructor(name);

			name:string;
			type:number;
			bones;
			weights;
			uvs;
			regionUVs;
			triangles;
			hullLength:number;
			r:number;
			g:number;
			b:number;
			a:number;
			path;
			rendererObject;
			regionU:number;
			regionV:number;
			regionU2:number;
			regionV2:number;
			regionRotate:boolean;
			regionOffsetX:number;
			regionOffsetY:number;
			regionWidth:number;
			regionHeight:number;
			regionOriginalWidth:number;
			regionOriginalHeight:number;
			edges;
			width:number;
			height:number;

			updateUVs(u, v, u2, v2, rotate)

			computeWorldVertices(x, y, slot, worldVertices)

		}

		export class Slot
		{
			constructor(slotData, bone);

			data:SlotData;
			bone:Bone;
			r:number;
			g:number;
			b:number;
			a:number;
			_attachmentTime:number;
			attachment;
			attachmentVertices;

			setAttachment(attachment);

			setAttachmentTime(time);

			getAttachmentTime();

			setToSetupPose();

		}

		export class SlotData
		{
			constructor(name, boneData);

			name:string;
			boneData:BoneData;

			static PIXI_BLEND_MODE_MAP:{
				multiply:number;
				screen:number;
				additive:number;
				normal:number;
			}
			r:number;
			g:number;
			b:number;
			a:number;
			attachmentName;
			blendMode:number;


		}

		export class TrackEntry
		{
			next:TrackEntry;
			previous:TrackEntry;
			animation:Animation;
			loop:boolean;
			delay:number;
			time:number;
			lastTime:number;
			endTime:number;
			timeScale:number;
			mixTime:number;
			mixDuration:number;
			mix:number;
			onStart:Function;
			onEnd:Function;
			onComplete:Function;
			onEvent:Function;
		}


		export class TranslateTimeline
		{
			constructor(frameCount);

			curves:Curves[];
			frames;
			boneIndex:number;

			getFrameCount();

			setFrame(frameIndex, time, x, y);

			apply(skeleton, lastTime, time, firedEvents, alpha);

		}

		export class Atlas
		{
			constructor(atlasText, baseUrl, crossOrigin);

			pages:any[];
			regions:any[];

			texturesLoading:number;

			findRegion(name);

			dispose();

			updateUVs(page);

			findRegion(name);

			dispose();

			updateUVs(page);

			Format:{
				alpha: number;
				intensity: number;
				luminanceAlpha: number;
				rgb565: number;
				rgba4444: number;
				rgb888: number;
				rgba8888: number;
			};

			TextureFilter:{
				nearest: number;
				linear: number;
				mipMap: number;
				mipMapNearestNearest: number;
				mipMapLinearNearest: number;
				mipMapNearestLinear: number;
				mipMapLinearLinear:number;
			};

			TextureWrap:{
				mirroredRepeat: number;
				clampToEdge: number;
				repeat:number;
			}
		}

		export class AtlasAttachmentParser
		{
			constructor(atlas);

			newRegionAttachment(skin, name, path):RegionAttachment;

			newMeshAttachment(skin, name, path):SkinnedMeshAttachment;

			newSkinnedMeshAttachment(skin, name, path):SkinnedMeshAttachment;

			newBoundingBoxAttachment(skin, name):BoundingBoxAttachment;
		}

		export class AtlasPage
		{
			name;
			format;
			minFilter;
			magFilter;
			uWrap;
			vWrap;
			rendererObject;
			width:number;
			height:number
		}

		export class AtlasReader
		{
			constructor(text);

			lines:string[];
			index:number;
			trim:string;
			readLine:string;

			readValue():string;

			readTuple(tuple):number;
		}

		export class AtlasRegion
		{
			page;
			name;
			x:number;
			y:number;
			width:number;
			height:number;
			u:number;
			v:number;
			u2:number;
			v2:number;
			offsetX:number;
			offsetY:number;
			originalWidth:number;
			originalHeight:number;
			index:number;
			rotate:boolean;
			splits;
			pads;
		}

		export class AttachmentTimeline
		{
			constructor(frameCount);

			curves:Curves;
			frames:number[];
			attachmentNames:string [];

			slotIndex:number;

			getFrameCount():number;

			setFrame(frameIndex, time, attachmentName);

			apply(skeleton, lastTime, time, firedEvents, alpha);
		}


		export class atlasParser
		{
			constructor(resource, next);

			AnimCache:any;
			enableCaching:boolean;
		}

	}

}