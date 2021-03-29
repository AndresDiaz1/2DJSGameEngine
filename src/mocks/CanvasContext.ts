const mockCanvasContext = {
  createBuffer: jest.fn().mockReturnValue(true),
  bindBuffer: jest.fn(),
  bufferData: jest.fn(),
  createShader: jest.fn(),
  shaderSource: jest.fn(),
  compileShader: jest.fn().mockReturnValue('Compiled-Shader'),
  getShaderParameter: jest.fn(),
  createProgram: jest.fn(),
  attachShader: jest.fn(),
  linkProgram: jest.fn(),
  getProgramParameter: jest.fn(),
  getAttribLocation: jest.fn(),
  vertexAttribPointer: jest.fn(),
  getShaderInfoLog: jest.fn(),
  useProgram: jest.fn(),
  enableVertexAttribArray: jest.fn(),
  clearColor: jest.fn(),
  clear: jest.fn(),
};

export default mockCanvasContext;
