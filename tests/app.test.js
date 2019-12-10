jest.mock('../src/startup/Startup');
import Startup from '../src/startup/Startup';

it('should run a passing test', () => {
    require('../src/app');
    expect(Startup).toHaveBeenCalled();
})