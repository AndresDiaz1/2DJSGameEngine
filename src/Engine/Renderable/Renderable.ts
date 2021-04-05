import EngineCore from '../Core/EngineCore';
import SimpleShader from '../SimpleShader/SimpleShader';
import Transform from '../Transform/Transform';

export default class Renderable {
	private shader: SimpleShader;
	private color: number[];
	private xForm: Transform;

	constructor(shader: SimpleShader) {
		this.shader = shader;
		this.color = [1, 1, 1, 1];
		this.xForm = new Transform();
	}

	public draw(): void {
		const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
		this.shader.activateShader(this.color);
		// always activate the shader first!
		this.shader.loadObjectTransform(this.xForm.getXForm());
		canvasContext.drawArrays(canvasContext.TRIANGLE_STRIP, 0, 4);
	}

	public setColor(color: number[]): void {
		this.color = color;
	}

	public getColor(): number[] {
		return this.color;
	}

	public getTransform(): Transform {
		return this.xForm;
	}
}
