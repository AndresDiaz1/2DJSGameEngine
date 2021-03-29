import GEngineCore from './Engine_Core';

const engine_Core = new GEngineCore({
  VertexBuffer: {
    initialize: () => console.log('Initialize'),
  },
});

document.getElementById = jest
  .fn()
  .mockReturnValue(document.createElement('CANVAS'));

describe('GEngineCore', () => {
  test('Should retrieve the canvas context', () => {
    const consoleLog = spyOn(console, 'log');
    HTMLCanvasElement.prototype.getContext = jest
      .fn()
      .mockReturnValue('Canvas Context');
    engine_Core.initializeWebGL('1');
    expect(document.getElementById).toBeCalledWith('1');
    expect(consoleLog).toHaveBeenCalledWith('Initialize');
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
