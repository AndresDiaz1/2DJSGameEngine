import EngineCore from '../Core/EngineCore';
import SimpleShader from '../SimpleShader/SimpleShader';

export default class Renderable {
	private shader: SimpleShader;
	private color: number[];

	constructor(shader: SimpleShader) {
		this.shader = shader;
		this.color = [1, 1, 1, 1];
	}

	public draw(): void {
		const canvasContext = EngineCore.getCanvasContext() as WebGL2RenderingContext;
		this.shader.activateShader(this.color);
		canvasContext.drawArrays(canvasContext.TRIANGLE_STRIP, 0, 4);
	}

	public setColor(color: number[]): void {
		this.color = color;
	}

	public getColor(): number[] {
		return this.color;
	}
}
