import Renderable from '../Engine/Renderable/Renderable';
import EngineCore from '../Engine/Core/EngineCore';
import SimpleShader from '../Engine/SimpleShader/SimpleShader';
import EngineVertexBuffer from '../Engine/VertexBuffer/VertexBuffer';
import { mat4, vec3 } from 'gl-matrix';

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

	// Step C: Create the Renderable objects:
	const whiteSqr = new Renderable(shader);
	whiteSqr.setColor([1, 1, 1, 1]);

	const redSqr = new Renderable(shader);
	redSqr.setColor([1, 0, 0, 1]);

	// Step D: Clear the canvas
	engineCore.clearCanvas([0, 0.8, 0, 1]); //Green rectangle

	// Step E: compute the white square transform
	const xForm = mat4.create();

	mat4.translate(xForm, xForm, vec3.fromValues(-0.25, 0.25, 0.0));
	mat4.rotateZ(xForm, xForm, 0.2);
	mat4.scale(xForm, xForm, vec3.fromValues(1.2, 1.2, 1.0));

	// Step F: draw the white square with the computed transform
	whiteSqr.draw(xForm);

	// Step G: compute the red square transform
	mat4.identity(xForm); //restart
	mat4.translate(xForm, xForm, vec3.fromValues(0.25, -0.25, 0.0));
	mat4.rotateZ(xForm, xForm, -0.785);
	mat4.scale(xForm, xForm, vec3.fromValues(0.4, 0.4, 1.0));

	// Step H: draw the red square with the computed transform
	redSqr.draw(xForm);
}
