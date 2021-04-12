import Renderable from "../Engine/Renderable/Renderable";
import EngineCore from "../Engine/Core/EngineCore";
import SimpleShader from "../Engine/SimpleShader/SimpleShader";
import EngineVertexBuffer from "../Engine/VertexBuffer/VertexBuffer";
import { vec2 } from "gl-matrix";
import Camera from "../Engine/Camera/Camera";

export default function MyGame(htmlCanvasID: string): void {
	// Step A: Initialize the webGL Context and the VertexBuffer
	const engineCore: EngineCore = new EngineCore(htmlCanvasID);
	const vertexBuffer = new EngineVertexBuffer();
	vertexBuffer.initialize();

	// StepB: initialize camera
	const camera = new Camera(
		vec2.fromValues(20, 60), // center of the WC
		20, // width of WC
		[20, 40, 600, 300] // viewport (orgX, orgY, width, height)
	);

	// Step C: Create, load and compile the shaders
	const shader = new SimpleShader(
		"src/GLSLShaders/SimpleVS.glsl",
		"src/GLSLShaders/SimpleFS.glsl"
	);

	// Step D: Create the Renderable objects:
	const blueSqr = new Renderable(shader);
	blueSqr.setColor([0.25, 0.25, 0.95, 1]);

	const redSqr = new Renderable(shader);
	redSqr.setColor([1, 0.25, 0.25, 1]);

	const topLeftSqr = new Renderable(shader);
	topLeftSqr.setColor([0.9, 0.1, 0.1, 1]);

	const topRightSqr = new Renderable(shader);
	topRightSqr.setColor([0.1, 0.9, 0.1, 1]);

	const bottomRightSqr = new Renderable(shader);
	bottomRightSqr.setColor([0.1, 0.1, 0.9, 1]);

	const bottomLeftSqr = new Renderable(shader);
	bottomLeftSqr.setColor([0.1, 0.1, 0.1, 1]);

	// Step E: Clear the canvas
	engineCore.clearCanvas([0.9, 0.9, 0.9, 1]); //Green rectangle

	camera.setupViewProjection();
	const vpMatrix = camera.getVPMatrix();

	// Step F: Draw the blue square, centre blue, slightly rotated square
	blueSqr.getTransform().setXYPosition(20, 60);
	blueSqr.getTransform().setRotationInRad(0.2);
	blueSqr.getTransform().setWidthHeightSize(5, 5);
	blueSqr.draw(vpMatrix);

	// Step G: Draw with the red shader centre red square
	redSqr.getTransform().setXYPosition(20, 60);
	redSqr.getTransform().setWidthHeightSize(2, 2);
	redSqr.draw(vpMatrix);

	// top left
	topLeftSqr.getTransform().setXYPosition(10, 65);
	topLeftSqr.draw(vpMatrix);

	// top right
	topRightSqr.getTransform().setXYPosition(30, 65);
	topRightSqr.draw(vpMatrix);

	// bottom right
	bottomRightSqr.getTransform().setXYPosition(30, 55);
	bottomRightSqr.draw(vpMatrix);

	//bottom left
	bottomLeftSqr.getTransform().setXYPosition(10, 55);
	bottomLeftSqr.draw(vpMatrix);
}
