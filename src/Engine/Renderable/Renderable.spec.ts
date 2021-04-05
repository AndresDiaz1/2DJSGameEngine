import mockCanvasContext from "../../mocks/CanvasContext";
import EngineCore from "../Core/EngineCore";
import SimpleShader from "../SimpleShader/SimpleShader";
import Transform from "../Transform/Transform";
import Renderable from "./Renderable";

jest
	.spyOn(EngineCore, "getCanvasContext")
	.mockReturnValue(mockCanvasContext as any);
window.alert = jest.fn();

describe("Renderable", () => {
	test("Should instantiate", () => {
		const shader = new SimpleShader("1", "1");
		const renderable = new Renderable(shader);
		expect(renderable).toBeInstanceOf(Renderable);
	});
	test("Should draw", () => {
		const mockDrawArrays = jest.spyOn(mockCanvasContext, "drawArrays");
		const shader = new SimpleShader("1", "1");
		const renderable = new Renderable(shader);
		renderable.draw();
		expect(mockDrawArrays).toHaveBeenCalled();
	});
	test("Should get and set color", () => {
		const shader = new SimpleShader("1", "1");
		const renderable = new Renderable(shader);
		const color = [1, 2, 3, 4];
		renderable.setColor(color);
		expect(renderable.getColor()).toBe(color);
	});

	test("Should getTransform return instance of Transform", () => {
		const shader = new SimpleShader("1", "1");
		const renderable = new Renderable(shader);
		expect(renderable.getTransform()).toBeInstanceOf(Transform);
	});
});
