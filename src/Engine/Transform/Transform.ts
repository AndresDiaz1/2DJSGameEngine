import { mat4, vec2, vec3 } from "gl-matrix";

export default class Transform {
	private position: vec2;
	private scale: vec2;
	private rotation: number; // Rotation in radians
	private xPos: number;
	private yPos: number;
	private width: number;
	private height: number;

	constructor() {
		this.position = vec2.fromValues(0, 0);
		this.scale = vec2.fromValues(1, 1);
		this.rotation = 0.0;
		(this.xPos = 0), (this.yPos = 0), (this.width = 0), (this.height = 0);
	}

	public setXYPosition(xPos: number, yPos: number) {
		this.xPos = xPos;
		this.yPos = yPos;
	}

	public getXPosition(): number {
		return this.xPos;
	}

	public getYPosition(): number {
		return this.yPos;
	}

	public setPosition(position: vec2) {
		this.position = position;
	}

	public getPosition(): vec2 {
		return this.position;
	}

	public setWidthHeightSize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}

	public setScale(scale: vec2) {
		this.scale = scale;
	}

	public getScale(): vec2 {
		return this.scale;
	}

	public setRotationInRad(rotation: number) {
		this.rotation = rotation;
		while (this.rotation > 2 * Math.PI) {
			this.rotation -= 2 * Math.PI;
		}
	}

	public setRotationInDegrees(rotation: number) {
		this.setRotationInRad((rotation * Math.PI) / 180.0);
	}

	public getRotation(): number {
		return this.rotation;
	}

	public getXForm(): mat4 {
		// Creates a blank identity matrix
		const matrix = mat4.create();

		// Step 1: compute translation, for now z is always at 0.0
		mat4.translate(
			matrix,
			matrix,
			vec3.fromValues(this.getXPosition(), this.getYPosition(), 0.0)
		);

		// Step 2: concatenate with rotation.
		mat4.rotateZ(matrix, matrix, this.getRotation());

		// Step 3: concatenate with scaling
		mat4.scale(
			matrix,
			matrix,
			vec3.fromValues(this.getWidth(), this.getHeight(), 1.0)
		);

		return matrix;
	}
}
