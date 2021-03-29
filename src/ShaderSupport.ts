let gSimpleShader: WebGLProgram; 
let gShaderVertexPositionAttribute: number;

function loadAndCompileShader(id: string, shaderType: number): WebGLShader{
    let shaderText: HTMLElement , shaderSource: string, compiledShader: WebGLShader;

    // Step A: Get the shader source from index.html
    shaderText = document.getElementById(id)!;
    shaderSource = shaderText?.firstChild?.textContent!;

     // Step B: Create the shader based on the source type: vertex or fragment
    compiledShader = gGl.createShader(shaderType)!;

     // Step C: Compile the created shader
    gGl?.shaderSource(compiledShader, shaderSource);
    gGl?.compileShader(compiledShader);

     // Step D: check for error and return result
    if (!gGl?.getShaderParameter(compiledShader, gGl.COMPILE_STATUS)){
        alert(`A shader compiler error ${gGl.getShaderInfoLog(compiledShader)}`)
    }
    return compiledShader;
}

function initSimpleShader(vertexShaderID: string, fragmentShaderId: string){
    // Step A: load and compile the vertex and fragment shaders
    const vertexShader = loadAndCompileShader(vertexShaderID, gGl.VERTEX_SHADER);
    const fragmentShader = loadAndCompileShader(fragmentShaderId, gGl.FRAGMENT_SHADER);

    // Step B: Create and link the shaders into a program.
    gSimpleShader = gGl.createProgram()!;
    gGl.attachShader(gSimpleShader, vertexShader);
    gGl.attachShader(gSimpleShader, fragmentShader);
    gGl.linkProgram(gSimpleShader);

    // Step C: check for error
    if(!gGl.getProgramParameter(gSimpleShader, gGl.LINK_STATUS)) alert ("Error linking sahder");

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    gShaderVertexPositionAttribute = gGl.getAttribLocation(gSimpleShader, "aSquareVertexPosition");

    // Step E: Activates the vertex buffer loaded in VertexBuffer.ts
    gGl.bindBuffer(gGl.ARRAY_BUFFER, gSquareVertexBuffer);

     // Step F: Describe the characteristic of the vertex position attribute
    gGl.vertexAttribPointer(gShaderVertexPositionAttribute,
        3,          // each vertex element is a 3-float (x,y,z)
        gGl.FLOAT,  // data type is float
        false,      // if the content is normalized vectors
        0,          // number of bytes to skip in between elements
        0);         // offsets to the first element
}