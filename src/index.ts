let gGl: WebGL2RenderingContext  | null;

function initializeGL() {
    const canvas = <HTMLCanvasElement> document.getElementById("GLCanvas");
    gGl = canvas.getContext("webgl2");

    if (gGl !== null) {
        gGl.clearColor(0.0, 0.8, 0.0, 1.0);
    }
}

function clearCanvas() {
    gGl?.clear(gGl.COLOR_BUFFER_BIT);
}

function doGLDraw() {
    initializeGL();
    clearCanvas();
}