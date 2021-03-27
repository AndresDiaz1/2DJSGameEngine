"use strict";
let gGl;
function initializeGL() {
    const canvas = document.getElementById("GLCanvas");
    gGl = canvas.getContext("webgl2");
    if (gGl !== null) {
        gGl.clearColor(0.0, 0.8, 0.0, 1.0);
    }
}
function clearCanvas() {
    gGl === null || gGl === void 0 ? void 0 : gGl.clear(gGl.COLOR_BUFFER_BIT);
}
function doGLDraw() {
    initializeGL();
    clearCanvas();
}
//# sourceMappingURL=index.js.map