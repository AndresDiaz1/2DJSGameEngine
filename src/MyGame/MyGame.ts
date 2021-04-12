import Renderable from "../Engine/Renderable/Renderable";
import EngineCore from "../Engine/Core/EngineCore";
import SimpleShader from "../Engine/SimpleShader/SimpleShader";
import EngineVertexBuffer from "../Engine/VertexBuffer/VertexBuffer";
import { mat4 } from "gl-matrix";

export default function MyGame(htmlCanvasID: string): void {
	// Step A: Initialize the webGL Context and the VertexBuffer
	const engineCore: EngineCore = new EngineCore(htmlCanvasID);
	const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
	const vertexBuffer = new EngineVertexBuffer();
	vertexBuffer.initialize();

	// Step B: Create, load and compile the shaders
	const shader = new SimpleShader(
		"src/GLSLShaders/SimpleVS.glsl",
		"src/GLSLShaders/SimpleFS.glsl"
	);

	// Step C: Create the Renderable objects:
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

	// Step D: Clear the canvas
	engineCore.clearCanvas([0.9, 0.9, 0.9, 1]); //Green rectangle

	// Step E: Setting up Viewport: area on canvas to be drawn
	canvasContext.viewport(20, 40, 600, 300);

	// Set up the corresponding scissor area to limit clear area
	canvasContext.scissor(20, 40, 600, 300);

	// Enable the scissor area, clear and then disable the scissor area
	canvasContext.enable(canvasContext.SCISSOR_TEST);
	engineCore.clearCanvas([0.8, 0.8, 0.8, 1]); //clear the scissor area
	canvasContext.disable(canvasContext.SCISSOR_TEST);

	// Step F: Set up View and Projection matrices
	const viewMatrix = mat4.create();
	const projMatrix = mat4.create();

	/*
	 the mat4.lookAt() function defines the center of WC to be located at (20,60). Step F2 defines 
	the distances from the center position to the left and right boundaries to be 10 units and to the top and 
	bottom boundaries to be 5 units away. Together, these define the WC as follows:
	
	Center: (20,60)
	Top-left corner: (10, 65)
	Top-right corner: (30, 65)
	Bottom-right corner: (30, 55)
	Bottom-left corner: (10, 55)
	*/

	// define the view matrix
	mat4.lookAt(
		viewMatrix,
		[20, 60, 10], // camera position
		[20, 60, 0], // look at position
		[0, 1, 0] // orientation
	);

	//define the projection matrix
	mat4.ortho(
		projMatrix,
		-10, //distant to left of World Coordinate System (WC)
		10, // distanto to right of WC
		-5, //distant to bottom of WC
		5, //distant to top of WC
		0, //z-distant to near plane
		1000 //z-distant to far plane
	);

	// concatenate to form the View-Projection operator
	let vpMatrix = mat4.create();
	vpMatrix = mat4.multiply(vpMatrix, projMatrix, viewMatrix);

	// Step G: Draw the blue square, centre blue, slightly rotated square
	blueSqr.getTransform().setXYPosition(20, 60);
	blueSqr.getTransform().setRotationInRad(0.2);
	blueSqr.getTransform().setWidthHeightSize(5, 5);
	blueSqr.draw(vpMatrix);

	// Step H: Draw with the red shader centre red square
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
