export default class EngineCore {
  static instance: EngineCore;
  private canvasContext: WebGL2RenderingContext | null;

  private constructor(htmlCanvasID: string) {
    this.canvasContext = null;
    this.initializeWebGL(htmlCanvasID);
  }

  public static getInstance(htmlCanvasID?: string): EngineCore {
    if (!EngineCore.instance) {
      EngineCore.instance = new EngineCore(htmlCanvasID as string);
    }
    return EngineCore.instance;
  }

  private initializeWebGL(htmlCanvasID: string) {
    const canvas = <HTMLCanvasElement>document.getElementById(htmlCanvasID);
    this.canvasContext = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (this.canvasContext === null) {
      document.write('<br><b>WebGL is not supported!</b>');
      return;
    }
  }

  public getCanvasContext(): WebGL2RenderingContext | null {
    return this.canvasContext;
  }

  public clearCanvas(color: Array<number>) {
    this.canvasContext?.clearColor(color[0], color[1], color[2], color[3]);
    this.canvasContext?.clear(this.canvasContext.COLOR_BUFFER_BIT);
  }
}
