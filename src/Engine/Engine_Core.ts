export default class GEngineCore {
  private mGl: WebGL2RenderingContext | null;
  private gEngine: any;

  constructor(gEngine: any) {
    this.mGl = null;
    this.gEngine = gEngine;
  }

  public getGl(): WebGL2RenderingContext | null {
    return this.mGl;
  }

  public initializeWebGL(htmlCanvasID: string) {
    const canvas = <HTMLCanvasElement>document.getElementById(htmlCanvasID);
    this.mGl = canvas.getContext('webgl2');

    if (this.mGl === null) {
      document.write('<br><b>WebGL is not supported!</b>');
      return;
    }
    this.gEngine.VertexBuffer.initialize();
  }

  public clearCanvas(color: Array<number>) {
    this.mGl?.clearColor(color[0], color[1], color[2], color[3]);
    this.mGl?.clear(this.mGl.COLOR_BUFFER_BIT);
  }
}
