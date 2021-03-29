import GEngineCore from './Engine_Core';

export default class GEngineVertexBuffer {
  private vertexOfSquare: Array<number>;
  private gEngineCore: GEngineCore;
  private mSquareVertexBuffer: WebGLBuffer | null;

  constructor(gEngineCore: GEngineCore) {
    // First: define the vertices for a square
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
    this.gEngineCore = gEngineCore;
    this.mSquareVertexBuffer = null;
  }

  public getGLVertexRef() {
    // reference to the vertex positions for the square in the gl context
    return this.mSquareVertexBuffer;
  }

  public initialize() {
    const gl = this.gEngineCore.getGl() as WebGL2RenderingContext;
    // Step A: Create a buffer on the gGL context for our vertex positions
    this.mSquareVertexBuffer = gl.createBuffer() as WebGLBuffer;

    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mSquareVertexBuffer);

    // Step C: Loads verticesOfSquare into the vertexBuffer
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertexOfSquare),
      gl.STATIC_DRAW
    );
  }
}
