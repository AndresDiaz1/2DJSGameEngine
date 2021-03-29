let gSquareVertexBuffer: WebGLBuffer;

function initSquareBuffer() {
    const verticesOfSqare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    // Step A: Create a buffer on the gGL context for our vertex positions
    gSquareVertexBuffer = gGl.createBuffer()!;

    // Step B: Activate vertexBuffer
    gGl.bindBuffer(gGl.ARRAY_BUFFER, gSquareVertexBuffer as WebGLBuffer);

     // Step C: Loads verticesOfSquare into the vertexBuffer
    gGl.bufferData(gGl.ARRAY_BUFFER, new Float32Array(verticesOfSqare), gGl.STATIC_DRAW);
}