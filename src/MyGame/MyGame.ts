import EngineCore from '../Engine/Core/Engine_Core.js';
import SimpleShader from '../Engine/SimpleShader/SimpleShader.js';
import EngineVertexBuffer from '../Engine/VertexBuffer/Engine_VertexBuffer.js';

function MyGame(htmlCanvasID: string) {
  // Step A: Initialize the webGL Context and the VertexBuffer
  const engineCore: EngineCore = EngineCore.getInstance(htmlCanvasID);
  const vertexBuffer = EngineVertexBuffer.getInstance();
  vertexBuffer.initialize();

  // Step B: Create, load and compile the shaders
  const shader = new SimpleShader(
    'src/GLSLShaders/SimpleVS.glsl',
    'src/GLSLShaders/WhiteFS.glsl'
  );

  // Step C: Draw!
  // Step C1: Clear the canvas
  engineCore.clearCanvas([0, 0.8, 0, 1]); //Green rectangle

  // Step C2: Activate the proper shader
  shader.activateShader();

  const canvasContext = engineCore.getCanvasContext() as WebGL2RenderingContext;
  canvasContext.drawArrays(canvasContext.TRIANGLE_STRIP, 0, 4);
}

window.addEventListener('load', () => {
  MyGame('GLCanvas');
});
