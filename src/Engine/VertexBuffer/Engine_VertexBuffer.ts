export default class GEngineVertexBuffer {
  private vertexOfSquare: Array<number>;
  private gl: WebGL2RenderingContext;
  private mSquareVertexBuffer: WebGLBuffer | null;

  constructor(gl: WebGL2RenderingContext) {
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
    this.gl = gl;
    this.mSquareVertexBuffer = null;
  }

  public getGLVertexRef() {
    // reference to the vertex positions for the square in the gl context
    return this.mSquareVertexBuffer;
  }

  public initialize() {
    // Step A: Create a buffer on the gGL context for our vertex positions
    this.mSquareVertexBuffer = this.gl.createBuffer() as WebGLBuffer;

    // Step B: Activate vertexBuffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mSquareVertexBuffer);

    // Step C: Loads verticesOfSquare into the vertexBuffer
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.vertexOfSquare),
      this.gl.STATIC_DRAW
    );
  }
}
