import { mat4, vec2 } from 'gl-matrix';
import EngineCore from '../Core/EngineCore';

export default class Camera {
	private WCCenter: vec2;
	private WCWidth: number;
	private viewport: number[];
	private nearPlane: number;
	private farPlane: number;
	private viewMatrix: mat4;
	private projMatrix: mat4;
	private vpMatrix: mat4;
	private backGroundColor: number[];

	constructor(WCCenter: vec2, WCWidth: number, viewportArray: number[]) {
		this.WCCenter = WCCenter;
		this.WCWidth = WCWidth;
		this.viewport = viewportArray; // [x, y, width, height]

		this.nearPlane = 0;
		this.farPlane = 1000;

		this.viewMatrix = mat4.create();
		this.projMatrix = mat4.create();
		this.vpMatrix = mat4.create();

		this.backGroundColor = [0.8, 0.8, 0.8, 1];
	}

	setWCCenter(xPos: number, yPos: number): void {
		this.WCCenter[0] = xPos;
		this.WCCenter[1] = yPos;
	}

	getWCCenter(): vec2 {
		return this.WCCenter;
	}

	setWCWidth(width: number): void {
		this.WCWidth = width;
	}

	getWCWidth(): number {
		return this.WCWidth;
	}

	setViewPort(viewportArray: number[]): void {
		this.viewport = viewportArray;
	}

	getViewPort(): number[] {
		return this.viewport;
	}

	setBackgroundColor(backgroundColor: number[]): void {
		this.backGroundColor = backgroundColor;
	}

	getBackgroundColor(): number[] {
		return this.backGroundColor;
	}

	setVPMatrix(vpMatrix: mat4): void {
		this.vpMatrix = vpMatrix;
	}

	getVPMatrix(): mat4 {
		return this.vpMatrix;
	}

	setupViewProjection(): void {
		const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
		// Step A: Set up and clear the Viewport
		// Step A1: Set up the viewport: area on canvas to be drawn

		canvasContext.viewport(
			this.viewport[0], // x position of bottom-left corner
			this.viewport[1], // y position of bottom-left corner
			this.viewport[2], // width of the area to be drawn
			this.viewport[3] // height of the area to be drawn
		);

		// Step A2: set up the corresponding scissor area to limit clear area
		canvasContext.scissor(
			this.viewport[0], // x position of bottom-left corner
			this.viewport[1], // y position of bottom-left corner
			this.viewport[2], // width of the area to be drawn
			this.viewport[3] // height of the area to be drawn
		);

		// Step A3: set the color to be clear to black
		canvasContext.clearColor(
			this.backGroundColor[0],
			this.backGroundColor[1],
			this.backGroundColor[2],
			this.backGroundColor[3]
		);

		// Step A4: enable and clear the scissor area
		canvasContext.enable(canvasContext.SCISSOR_TEST);
		canvasContext.clear(canvasContext.COLOR_BUFFER_BIT);
		canvasContext.disable(canvasContext.SCISSOR_TEST);

		// Step B: Set up the View-Projection transform operator
		// Step B1: define the view matrix
		mat4.lookAt(
			this.viewMatrix,
			[this.WCCenter[0], this.WCCenter[1], 10],
			[this.WCCenter[0], this.WCCenter[1], 0],
			[0, 1, 0]
		);

		// Step B2: define the projection matrix
		const halfWCWidth = 0.5 * this.WCWidth;
		const halfWCHeight = (halfWCWidth * this.viewport[3]) / this.viewport[2]; // WCHeight = WCWidth * viewportHeight / viewportWidth

		mat4.ortho(
			this.projMatrix,
			-halfWCWidth,
			halfWCWidth,
			-halfWCHeight,
			halfWCHeight,
			this.nearPlane,
			this.farPlane
		);

		// Step B3: concatnate view and project matrices
		mat4.multiply(this.vpMatrix, this.projMatrix, this.viewMatrix);
	}
}
