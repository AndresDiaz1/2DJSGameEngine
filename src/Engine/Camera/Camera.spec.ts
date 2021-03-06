import { mat4, vec2 } from "gl-matrix";
import mockCanvasContext from "../../mocks/CanvasContext";
import EngineCore from "../Core/EngineCore";
import Camera from "./Camera";

const camera = new Camera(
	vec2.fromValues(20, 60), // center of the WC
	20, // width of WC
	[20, 40, 600, 300] // viewport (orgX, orgY, width, height)
);

jest
	.spyOn(EngineCore, "getCanvasContext")
	.mockReturnValue(mockCanvasContext as any);

describe("Camera", () => {
	test("Should set and get WCCenter", () => {
		camera.setWCCenter(10, 20);
		expect(camera.getWCCenter().toString()).toStrictEqual("10,20");
	});

	test("Should set and get WCWidth", () => {
		camera.setWCWidth(10);
		expect(camera.getWCWidth()).toBe(10);
	});

	test("Should set and get ViewPort", () => {
		camera.setViewPort([1, 2, 3, 4]);
		expect(camera.getViewPort().toString()).toStrictEqual("1,2,3,4");
	});

	test("Should set and get BackgroundColor", () => {
		camera.setBackgroundColor([1, 0, 0, 1]);
		expect(camera.getBackgroundColor().toString()).toStrictEqual("1,0,0,1");
	});

	test("Should set and get VPMatrix", () => {
		const vpMatrix = mat4.lookAt(
			mat4.create(),
			[1, 2, 10],
			[1, 2, 0],
			[0, 1, 0]
		);
		camera.setVPMatrix(vpMatrix);
		expect(camera.getVPMatrix().toString()).toStrictEqual(vpMatrix.toString());
	});

	test("Should setupViewProjection multiply to create the view projection matrix", () => {
		const spyMat4Multiply = jest.spyOn(mat4, "multiply");
		camera.setupViewProjection();
		expect(spyMat4Multiply).toHaveBeenCalled();
	});
});
