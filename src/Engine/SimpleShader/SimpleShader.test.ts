import SimpleShader from './SimpleShader';
import GEngineCore from '../Core/Engine_Core';
import mockCanvasContext from '../../mocks/CanvasContext';

const engine_Core = new GEngineCore();
jest.spyOn(engine_Core, 'getGl').mockReturnValue(mockCanvasContext as any);
document.getElementById = jest
  .fn()
  .mockReturnValue(document.createElement('div'));
window.alert = () => {};

describe('SimpleShader', () => {
  test('Should construct', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    const simpleShader = new SimpleShader(
      engine_Core.getGl() as WebGL2RenderingContext,
      '1',
      '1'
    );
    expect(mockCanvasContext.vertexAttribPointer).toHaveBeenCalled();
  });

  test('Should display alert if error linking shader', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(false);
    const alertSpy = jest.spyOn(window, 'alert');
    const simpleShader = new SimpleShader(
      engine_Core.getGl() as WebGL2RenderingContext,
      '1',
      '1'
    );
    expect(alertSpy).toHaveBeenCalledWith('Error linking shader');
  });

  test('Should activateShader call useProgram and enableVertexAttribArray from canvas context', () => {
    mockCanvasContext.getProgramParameter = jest.fn().mockReturnValue(true);
    const simpleShader = new SimpleShader(
      engine_Core.getGl() as WebGL2RenderingContext,
      '1',
      '1'
    );
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
    const simpleShader = new SimpleShader(
      engine_Core.getGl() as WebGL2RenderingContext,
      '1',
      '1'
    );
    expect(simpleShader.getShader()).toBe('Compiled Shader');
  });
});
