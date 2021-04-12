import { mat4, vec2 } from "gl-matrix";
import Camera from "./Camera";

const camera = new Camera(
	vec2.fromValues(20, 60), // center of the WC
	20, // width of WC
	[20, 40, 600, 300] // viewport (orgX, orgY, width, height)
);

describe("Camera", () => {
	test("set and get WCCenter", () => {
		camera.setWCCenter(10, 20);
		expect(camera.getWCCenter().toString()).toStrictEqual("10,20");
	});

	test("set and get WCWidth", () => {
		camera.setWCWidth(10);
		expect(camera.getWCWidth()).toBe(10);
	});

	test("set and get ViewPort", () => {
		camera.setViewPort([1, 2, 3, 4]);
		expect(camera.getViewPort().toString()).toStrictEqual("1,2,3,4");
	});

	test("set and get BackgroundColor", () => {
		camera.setBackgroundColor([1, 0, 0, 1]);
		expect(camera.getBackgroundColor().toString()).toStrictEqual("1,0,0,1");
	});

	test("set and get VPMatrix", () => {
		const vpMatrix = mat4.lookAt(
			mat4.create(),
			[1, 2, 10],
			[1, 2, 0],
			[0, 1, 0]
		);
		camera.setVPMatrix(vpMatrix);
		expect(camera.getVPMatrix().toString()).toStrictEqual(vpMatrix.toString());
	});
});
