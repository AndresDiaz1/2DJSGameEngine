import GEngineCore from './Engine_Core';
import GEngineVertexBuffer from './Engine_VertexBuffer';

/*interface MockCanvasContext extends WebGL2RenderingContext {
  createBuffer: Function;
  bindBuffer: Function;
  bufferData: Function;
}*/

const engine_Core = new GEngineCore({
  VertexBuffer: {
    initialize: () => console.log('Initialize'),
  },
});

const engine_VertexBuffer = new GEngineVertexBuffer(engine_Core);
const mockCanvasContext = {
  createBuffer: jest.fn().mockReturnValue(true),
  bindBuffer: jest.fn(),
  bufferData: jest.fn(),
};

jest.spyOn(engine_Core, 'getGl').mockReturnValue(mockCanvasContext as any);

describe('GEngineVertexBuffer', () => {
  test('Should initialize', () => {
    engine_VertexBuffer.initialize();
    expect(engine_Core.getGl).toHaveBeenCalled();
    expect(mockCanvasContext.createBuffer).toHaveBeenCalled();
    expect(mockCanvasContext.bindBuffer).toHaveBeenCalled();
    expect(mockCanvasContext.bufferData).toHaveBeenCalled();
  });

  test('Should getGLVertexRef return mSquareVertexBuffer', () => {
    engine_VertexBuffer.initialize();
    expect(engine_VertexBuffer.getGLVertexRef()).toBe(true);
  });
});
