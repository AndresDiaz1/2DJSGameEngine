import GEngineVertexBuffer from './Engine_VertexBuffer';

export default class GEngineCore {
  private mGl: WebGL2RenderingContext | null;
  private gEngineVertexBuffer: GEngineVertexBuffer;

  constructor() {
    this.mGl = null;
    this.gEngineVertexBuffer = new GEngineVertexBuffer(this);
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
    this.gEngineVertexBuffer.initialize();
  }

  public clearCanvas(color: Array<number>) {
    this.mGl?.clearColor(color[0], color[1], color[2], color[3]);
    this.mGl?.clear(this.mGl.COLOR_BUFFER_BIT);
  }
}
