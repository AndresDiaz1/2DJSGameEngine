import EngineCore from '../Core/Engine_Core.js';

export default class EngineVertexBuffer {
  static instance: EngineVertexBuffer;
  private vertexOfSquare: Array<number>;
  private mSquareVertexBuffer: WebGLBuffer | null;

  private constructor() {
    this.mSquareVertexBuffer = null;
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

  public static getInstance(): EngineVertexBuffer {
    if (!EngineVertexBuffer.instance)
      EngineVertexBuffer.instance = new EngineVertexBuffer();
    return EngineVertexBuffer.instance;
  }

  public initialize() {
    const canvasContext = EngineCore.getInstance().getCanvasContext() as WebGL2RenderingContext;

    // Step A: Create a buffer on the gGL context for our vertex positions
    this.mSquareVertexBuffer = canvasContext.createBuffer() as WebGLBuffer;

    // Step B: Activate vertexBuffer
    canvasContext.bindBuffer(
      canvasContext.ARRAY_BUFFER,
      this.mSquareVertexBuffer
    );

    // Step C: Loads verticesOfSquare into the vertexBuffer
    canvasContext.bufferData(
      canvasContext.ARRAY_BUFFER,
      new Float32Array(this.vertexOfSquare),
      canvasContext.STATIC_DRAW
    );
  }

  public getVertexRef() {
    return this.mSquareVertexBuffer;
  }
}
