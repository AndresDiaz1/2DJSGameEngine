import Renderable from "../Engine/Renderable/Renderable";
import EngineCore from "../Engine/Core/EngineCore";
import SimpleShader from "../Engine/SimpleShader/SimpleShader";
import EngineVertexBuffer from "../Engine/VertexBuffer/VertexBuffer";

export default function MyGame(htmlCanvasID: string): void {
	// Step A: Initialize the webGL Context and the VertexBuffer
	const engineCore: EngineCore = new EngineCore(htmlCanvasID);
	const vertexBuffer = new EngineVertexBuffer();
	vertexBuffer.initialize();

	// Step B: Create, load and compile the shaders
	const shader = new SimpleShader(
		"src/GLSLShaders/SimpleVS.glsl",
		"src/GLSLShaders/SimpleFS.glsl"
	);

	// Step C: Create the Renderable objects:
	const whiteSqr = new Renderable(shader);
	whiteSqr.setColor([1, 1, 1, 1]);

	const redSqr = new Renderable(shader);
	redSqr.setColor([1, 0, 0, 1]);

	// Step D: Clear the canvas
	engineCore.clearCanvas([0, 0.8, 0, 1]); //Green rectangle

	// Step E: compute the white square transform

	whiteSqr.getTransform().setXYPosition(-0.25, 0.25);
	whiteSqr.getTransform().setRotationInRad(0.2);
	whiteSqr.getTransform().setWidthHeightSize(1.2, 1.2);

	// Step F: draw the white square with the computed transform
	whiteSqr.draw();

	// Step G: compute the red square transform
	redSqr.getTransform().setXYPosition(0.25, -0.25);
	redSqr.getTransform().setRotationInDegrees(45);
	redSqr.getTransform().setWidthHeightSize(0.4, 0.4);

	// Step H: draw the red square with the computed transform
	redSqr.draw();
}
