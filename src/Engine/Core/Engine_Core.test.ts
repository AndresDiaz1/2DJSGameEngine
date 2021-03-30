import mockCanvasContext from '../../mocks/CanvasContext';
import EngineCore from './Engine_Core';

document.getElementById = jest
  .fn()
  .mockReturnValue(document.createElement('CANVAS'));

describe('EngineCore', () => {
  test('Should retrieve the canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue(mockCanvasContext);
    new EngineCore('Canvas-ID');
    expect(document.getElementById).toBeCalledWith('Canvas-ID');
  });

  test('Should write No WebGL supported if can not retrieve canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
    const documentWrite = spyOn(document, 'write');
    new EngineCore('Canvas');
    expect(documentWrite).toHaveBeenCalledWith(
      '<br><b>WebGL is not supported!</b>'
    );
  });
  test('Should getGl return the canvas context', () => {
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue('Canvas Context');
    const engine_Core = new EngineCore('canvas');
    expect(EngineCore.getCanvasContext()).toBe('Canvas Context');
  });

  test('Should clearCanvas call clearColor and clear methods', () => {
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue(mockCanvasContext);
    const engine_Core = new EngineCore('canvas');
    engine_Core.clearCanvas([1, 2, 3, 4]);
    expect(mockCanvasContext.clearColor).toHaveBeenCalledWith(1, 2, 3, 4);
    expect(mockCanvasContext.clear).toHaveBeenCalled();
  });
});
