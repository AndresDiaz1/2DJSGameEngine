import SimpleShader from './SimpleShader';
import mockCanvasContext from '../../mocks/CanvasContext';
import EngineCore from '../Core/Engine_Core';

jest
  .spyOn(EngineCore, 'getCanvasContext')
  .mockReturnValue(mockCanvasContext as any);

window.alert = () => {};

const xhrMock = {
  open: jest.fn(),
  setRequestHeader: jest.fn(),
  onreadystatechange: jest.fn(),
  send: jest.fn(),
  readyState: 4,
  responseText: null,
  status: 200,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.XMLHttpRequest = jest.fn(() => xhrMock);

const alertSpy = jest.spyOn(window, 'alert');

describe('SimpleShader', () => {
  test('Should construct', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    new SimpleShader('1', '1');
    expect(mockCanvasContext.vertexAttribPointer).toHaveBeenCalled();
  });

  test('Should display alert if no shaderSource', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    new SimpleShader('1', '1');
    expect(alertSpy).toHaveBeenCalled();
  });

  test('Should display alert if error linking shader', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(false);
    new SimpleShader('1', '1');
    expect(alertSpy).toHaveBeenCalledWith('Error linking shader');
  });

  test('Should activateShader call useProgram and enableVertexAttribArray from canvas context', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    const simpleShader = new SimpleShader('1', '1');
    simpleShader.activateShader();
    expect(mockCanvasContext.useProgram).toHaveBeenCalledWith(
      simpleShader.getShader()
    );
    expect(mockCanvasContext.enableVertexAttribArray).toHaveBeenCalled();
  });

  test('Should getShader return compiled shader', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    mockCanvasContext.createProgram = jest
      .fn()
      .mockReturnValue('Compiled Shader');
    const simpleShader = new SimpleShader('1', '1');
    expect(simpleShader.getShader()).toBe('Compiled Shader');
  });
});
