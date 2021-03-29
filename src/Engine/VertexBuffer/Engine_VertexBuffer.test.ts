import GEngineCore from '../Core/Engine_Core';
import GEngineVertexBuffer from './Engine_VertexBuffer';
import mockCanvasContext from '../../mocks/CanvasContext';

const engine_Core = new GEngineCore();
jest.spyOn(engine_Core, 'getGl').mockReturnValue(mockCanvasContext as any);
const engine_VertexBuffer = new GEngineVertexBuffer(engine_Core.getGl() as any);
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
