"use strict";
let gGl;
function initializeGL() {
    const canvas = document.getElementById("GLCanvas");
    gGl = canvas.getContext("webgl2");
    if (gGl !== null) {
        gGl.clearColor(0.0, 0.8, 0.0, 1.0);
        // A. initialize the vertex buffer
        initSquareBuffer();
        // B. now load and compile the vertex and fragment shaders
        initSimpleShader("VertexShader", "FragmentShader");
    }
    else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}
function drawSquare() {
    gGl.clear(gGl.COLOR_BUFFER_BIT);
    // Step A: Activate the shader to use
    gGl.useProgram(gSimpleShader);
    // Step B: Enable the vertex position attribute
    gGl.enableVertexAttribArray(gShaderVertexPositionAttribute);
    // Step C: Draw with the above settings
    gGl.drawArrays(gGl.TRIANGLE_STRIP, 0, 4);
}
function doGLDraw() {
    initializeGL(); // Binds gGL context to WebGL functionality
    drawSquare(); // Clears the GL area and draws one square
}
//# sourceMappingURL=index.js.map