import EngineCore from '../Core/EngineCore';
import EngineVertexBuffer from '../VertexBuffer/VertexBuffer';

export default class SimpleShader {
	private compiledShader: WebGLProgram;
	private shaderVertexPositionAttribute;
	private canvasContext: WebGL2RenderingContext;
	private pixelColor: WebGLUniformLocation | null;
	private modelTransform: WebGLUniformLocation | null;
	private viewProjTransform: WebGLUniformLocation | null;

	constructor(vertexShaderId: string, fragentShaderId: string) {
		this.canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
		this.pixelColor = null;
		this.modelTransform = null;
		// Step A: load and compile vertex and fragment shaders
		const vertexShader = this.loadAndCompileShader(
			vertexShaderId,
			this.canvasContext.VERTEX_SHADER
		);
		const fragmentShader = this.loadAndCompileShader(
			fragentShaderId,
			this.canvasContext.FRAGMENT_SHADER
		);

		// Step B: Create and link the shaders into a program.
		this.compiledShader = this.canvasContext.createProgram() as WebGLProgram;
		this.canvasContext.attachShader(
			this.compiledShader,
			vertexShader as WebGLShader
		);
		this.canvasContext.attachShader(
			this.compiledShader,
			fragmentShader as WebGLShader
		);

		this.canvasContext.linkProgram(this.compiledShader);

		// Step C: check for error
		if (
			!this.canvasContext.getProgramParameter(
				this.compiledShader,
				this.canvasContext.LINK_STATUS
			)
		) {
			alert('Error linking shader');
		}

		// Step D: Gets a reference to the aSquareVertexPosition attribute within the shaders.
		this.shaderVertexPositionAttribute = this.canvasContext.getAttribLocation(
			this.compiledShader,
			'aSquareVertexPosition'
		);
		const vertexBufferRef = EngineVertexBuffer.getVertexRef();
		// Step E: Activates the vertex buffer loaded in EngineCore_VertexBuffer.js
		this.canvasContext.bindBuffer(
			this.canvasContext.ARRAY_BUFFER,
			vertexBufferRef
		);

		// Step F: Describe the characteristic of the vertex position attribute
		this.canvasContext.vertexAttribPointer(
			this.shaderVertexPositionAttribute,
			3, // each element is a 3-float (x,y.z)
			this.canvasContext.FLOAT, // data type is FLOAT
			false, // if the content is normalized vectors
			0, // number of bytes to skip in between elements
			0
		); // offsets to the first element

		// Step G: Gets a reference to the uniform variable uPixelColor in the fragment shader
		this.pixelColor = this.canvasContext.getUniformLocation(
			this.compiledShader,
			'uPixelColor'
		) as WebGLUniformLocation;

		this.modelTransform = this.canvasContext.getUniformLocation(
			this.compiledShader,
			'uModelTransform'
		);

		this.viewProjTransform = this.canvasContext.getUniformLocation(
			this.compiledShader,
			'uViewProjTransform'
		);
	}

	private loadAndCompileShader(
		filePath: string,
		shaderType: number
	): WebGLShader | null {
		// Step A: Get the shader source from index.html
		const xmlReq = new XMLHttpRequest();
		xmlReq.open('GET', filePath, false);
		try {
			xmlReq.send();
		} catch (error) {
			alert(
				'Failed to load shader: ' +
					filePath +
					' [Hint: you cannot double click index.html to run this project. ' +
					'The index.html file must be loaded by a web-server.]'
			);
			return null;
		}
		const shaderSource = xmlReq.responseText;

		if (shaderSource === null) {
			alert('WARNING: Loading of:' + filePath + ' Failed!');
			return null;
		}

		// Step B: Create the shader based on the shader type: vertex or fragment
		const compiledShader = this.canvasContext.createShader(
			shaderType
		) as WebGLShader;

		// Step C: Compile the created shader
		this.canvasContext.shaderSource(compiledShader, shaderSource);
		this.canvasContext.compileShader(compiledShader);

		// Step D: check for errors and return results (null if error)
		// The log info is how shader compilation errors are typically displayed.
		// This is useful for debugging the shaders.
		if (
			!this.canvasContext.getShaderParameter(
				compiledShader,
				this.canvasContext.COMPILE_STATUS
			)
		) {
			alert(
				`A shader compiling error ocurred: ${this.canvasContext.getShaderInfoLog(
					compiledShader
				)}`
			);
		}
		return compiledShader;
	}

	activateShader(pixelColor: number[], vpMatrix: Float32List): void {
		this.canvasContext.useProgram(this.compiledShader);
		this.canvasContext.uniformMatrix4fv(
			this.viewProjTransform,
			false,
			vpMatrix
		);
		this.canvasContext.enableVertexAttribArray(
			this.shaderVertexPositionAttribute
		);
		this.canvasContext.uniform4fv(this.pixelColor, pixelColor);
	}

	getShader(): WebGLProgram {
		return this.compiledShader;
	}

	public loadObjectTransform(modelTransform: Float32List): void {
		this.canvasContext.uniformMatrix4fv(
			this.modelTransform,
			false,
			modelTransform
		);
	}
}
