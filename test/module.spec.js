import { ApiModule } from '../src/module';


let sandbox,
  moduleTest;

describe('/src/module', () => {

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    return moduleTest = new ApiModule();
  });

  afterEach(() => {
    return sandbox.restore();
  });


  describe('constructor', () => {

    it('should be an object', () => {
      return moduleTest.should.be.an('object');
    });

    it('should be instance of ApiModule', () => {
      return expect(moduleTest instanceof ApiModule).to.equal(true);
    });

  });

  describe('get', () => {

    it('should return itself', () => {
      return expect(moduleTest.get() instanceof ApiModule).equal(true);
    });

  });

});
