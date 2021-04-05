import mockCanvasContext from '../../mocks/CanvasContext';
import EngineCore from '../Core/EngineCore';
import EngineVertexBuffer from './VertexBuffer';


jest
.spyOn(EngineCore, 'getCanvasContext')
.mockReturnValue(mockCanvasContext as any);
const engine_VertexBuffer = new EngineVertexBuffer();

describe('GEngineVertexBuffer', () => {
	test('Should initialize', () => {
		engine_VertexBuffer.initialize();
		expect(EngineCore.getCanvasContext).toHaveBeenCalled();
		expect(mockCanvasContext.createBuffer).toHaveBeenCalled();
		expect(mockCanvasContext.bindBuffer).toHaveBeenCalled();
		expect(mockCanvasContext.bufferData).toHaveBeenCalled();
	});

	test('Should getGLVertexRef return mSquareVertexBuffer', () => {
		engine_VertexBuffer.initialize();
		expect(EngineVertexBuffer.getVertexRef()).toBe(true);
	});
});