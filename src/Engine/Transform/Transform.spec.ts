import Transform from "./Transform";

const transform = new Transform();

describe("Transform", () => {
	test("Should set X and Y positions", () => {
		transform.setXYPosition(1, 2);
		expect(transform.getXPosition()).toBe(1);
		expect(transform.getYPosition()).toBe(2);
	});

	test("Should set Position", () => {
		transform.setPosition([1, 2]);
		expect(transform.getPosition()).toStrictEqual([1, 2]);
	});

	test("Should set width and height", () => {
		transform.setWidthHeightSize(11, 22);
		expect(transform.getWidth()).toBe(11);
		expect(transform.getHeight()).toBe(22);
	});

	test("Should set scale", () => {
		transform.setScale([11, 22]);
		expect(transform.getScale()).toStrictEqual([11, 22]);
	});

	test("Should set rotation in Rad", () => {
		transform.setRotationInRad(2.35);
		expect(transform.getRotation()).toBe(2.35);
	});

	test("Should set rotation in Rad negative number", () => {
		transform.setRotationInRad(9.35);
		expect(transform.getRotation()).toBe(3.0668146928204134);
	});

	test("Should set rotation in degrees", () => {
		transform.setRotationInDegrees(45);
		expect(transform.getRotation()).toBe(0.7853981633974483);
	});

	test("Should set transformations", () => {
		expect(transform.getXForm().toString()).toStrictEqual(
			"7.77817440032959,7.77817440032959,0,0,-15.55634880065918,15.55634880065918,0,0,0,0,1,0,1,2,0,1"
		);
	});
});
