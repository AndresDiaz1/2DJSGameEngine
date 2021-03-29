import GEngineVertexBuffer from '../VertexBuffer/Engine_VertexBuffer';
import GEngineCore from './Engine_Core';

const engine_Core = new GEngineCore();
document.getElementById = jest
  .fn()
  .mockReturnValue(document.createElement('CANVAS'));

const engineVertexBufferMock = jest
  .spyOn(GEngineVertexBuffer.prototype, 'initialize')
  .mockImplementation(() => true);

describe('GEngineCore', () => {
  test('Should retrieve the canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue('Canvas Context');
    engine_Core.initializeWebGL('1');
    expect(document.getElementById).toBeCalledWith('1');
    expect(engineVertexBufferMock).toHaveBeenCalled();
  });

  test('Should write No WebGL supported if can not retrieve canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
    const documentWrite = spyOn(document, 'write');
    engine_Core.initializeWebGL('1');
    expect(documentWrite).toHaveBeenCalledWith(
      '<br><b>WebGL is not supported!</b>'
    );
  });
  test('Should getGl return the canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue('Canvas Context');
    engine_Core.initializeWebGL('1');
    expect(engine_Core.getGl()).toBe('Canvas Context');
  });
});
