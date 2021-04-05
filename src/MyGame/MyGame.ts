import EngineCore from '../Engine/Core/EngineCore';
import SimpleShader from '../Engine/SimpleShader/SimpleShader';
import EngineVertexBuffer from '../Engine/VertexBuffer/VertexBuffer';

export default function MyGame(htmlCanvasID: string): void {
	// Step A: Initialize the webGL Context and the VertexBuffer
	const engineCore: EngineCore = new EngineCore(htmlCanvasID);
	const vertexBuffer = new EngineVertexBuffer();
	vertexBuffer.initialize();

	// Step B: Create, load and compile the shaders
	const shader = new SimpleShader(
		'src/GLSLShaders/SimpleVS.glsl',
		'src/GLSLShaders/SimpleFS.glsl'
	);

	// Step C: Draw!
	// Step C1: Clear the canvas
	engineCore.clearCanvas([0, 0.8, 0, 1]); //Green rectangle

	// Step C2: Activate the proper shader
	shader.activateShader([0, 0, 1, 1]);

	const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
	canvasContext.drawArrays(canvasContext.TRIANGLE_STRIP, 0, 4);
}
