import GEngineVertexBuffer from '../VertexBuffer/Engine_VertexBuffer';

export default class SimpleShader {
  private mCompiledShader: WebGLProgram;
  private mShaderVertexPositionAttribute;
  private gl: WebGL2RenderingContext;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderId: string,
    fragentShaderId: string
  ) {
    this.gl = gl;

    // Step A: load and compile vertex and fragment shaders
    const vertexShader: WebGLShader = this.loadAndCompileShader(
      vertexShaderId,
      this.gl.VERTEX_SHADER
    );
    const fragmentShader: WebGLShader = this.loadAndCompileShader(
      fragentShaderId,
      this.gl.VERTEX_SHADER
    );

    // Step B: Create and link the shaders into a program.
    this.mCompiledShader = this.gl.createProgram() as WebGLProgram;
    this.gl.attachShader(this.mCompiledShader, vertexShader);
    this.gl.attachShader(this.mCompiledShader, fragmentShader);
    this.gl.linkProgram(this.mCompiledShader);

    // Step C: check for error
    if (!this.gl.getProgramParameter(this.mCompiledShader, this.gl.LINK_STATUS))
      alert('Error linking shader');

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = this.gl.getAttribLocation(
      this.mCompiledShader,
      'aSquareVertexPosition'
    );
    // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    const vertexBuffer = new GEngineVertexBuffer(this.gl);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.getGLVertexRef());

    // Step F: Describe the characteristic of the vertex position attribute
    this.gl.vertexAttribPointer(
      this.mShaderVertexPositionAttribute,
      3, // each element is a 3-float (x,y.z)
      this.gl.FLOAT, // data type is FLOAT
      false, // if the content is normalized vectors
      0, // number of bytes to skip in between elements
      0 // offsets to the first element
    );
  }

  private loadAndCompileShader(id: string, shaderType: number): WebGLShader {
    // Step A: Get the shader source from index.html
    const shaderText = document.getElementById(id);
    const shaderSource = shaderText?.firstChild?.textContent as string;

    // Step B: Create the shader based on the shader type: vertex or fragment
    const compiledShader = this.gl.createShader(shaderType) as WebGLShader;

    // Step C: Compile the created shader
    this.gl.shaderSource(compiledShader, shaderSource);
    this.gl.compileShader(compiledShader);

    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!this.gl.getShaderParameter(compiledShader, this.gl.COMPILE_STATUS)) {
      alert(
        `A shader compiling error ocurred: ${this.gl.getShaderInfoLog(
          compiledShader
        )}`
      );
    }
    return compiledShader;
  }

  activateShader() {
    this.gl.useProgram(this.mCompiledShader);
    this.gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  }

  getShader() {
    return this.mCompiledShader;
  }
}
