export default class EngineCore {
  static canvasContext: WebGL2RenderingContext | null;

  constructor(htmlCanvasID: string) {
    EngineCore.canvasContext = null;
    this.initializeWebGL(htmlCanvasID);
  }

  private initializeWebGL(htmlCanvasID: string) {
    const canvas = <HTMLCanvasElement>document.getElementById(htmlCanvasID);
    EngineCore.canvasContext = canvas.getContext(
      'webgl2'
    ) as WebGL2RenderingContext;
    if (EngineCore.canvasContext === null) {
      document.write('<br><b>WebGL is not supported!</b>');
      return;
    }
  }

  static getCanvasContext(): WebGL2RenderingContext | null {
    return EngineCore.canvasContext;
  }

  public clearCanvas(color: Array<number>) {
    EngineCore.canvasContext?.clearColor(
      color[0],
      color[1],
      color[2],
      color[3]
    );
    EngineCore.canvasContext?.clear(EngineCore.canvasContext.COLOR_BUFFER_BIT);
  }
}
