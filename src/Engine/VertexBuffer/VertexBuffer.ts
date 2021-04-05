import EngineCore from '../Core/EngineCore';

export default class EngineVertexBuffer {
	private vertexOfSquare: Array<number>;
	static mSquareVertexBuffer: WebGLBuffer | null;

	constructor() {
		EngineVertexBuffer.mSquareVertexBuffer = null;
		this.vertexOfSquare = [
			0.5,
			0.5,
			0.0,
			-0.5,
			0.5,
			0.0,
			0.5,
			-0.5,
			0.0,
			-0.5,
			-0.5,
			0.0,
		];
	}

	public initialize(): void {
		const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;

		// Step A: Create a buffer on the gGL context for our vertex positions
		EngineVertexBuffer.mSquareVertexBuffer = canvasContext.createBuffer() as WebGLBuffer;

		// Step B: Activate vertexBuffer
		canvasContext.bindBuffer(
			canvasContext.ARRAY_BUFFER,
			EngineVertexBuffer.mSquareVertexBuffer
		);

		// Step C: Loads verticesOfSquare into the vertexBuffer
		canvasContext.bufferData(
			canvasContext.ARRAY_BUFFER,
			new Float32Array(this.vertexOfSquare),
			canvasContext.STATIC_DRAW
		);
	}

	static getVertexRef(): WebGLBuffer | null {
		return EngineVertexBuffer.mSquareVertexBuffer;
	}
}
