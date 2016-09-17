import { ApiModule } from '../src/module';


let sandbox,
  moduleTest;

process.env.EXPRESSMODULE_HTTPS = 'false';

describe('/src/module', () => {

  beforeEach(() => {

    return sandbox = sinon.sandbox.create();
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

  describe.only('supertest', () => {

    it('should respond to OPTIOSN', (done) => {
      moduleTest = new ApiModule();
      //console.log(moduleTest.expressApp._router.stack);
      request(moduleTest.expressApp)
        .options('/api/v1')
        .end((err, res) => {
          console.log(err, res.body);
          return done();
        });
    });

  });

});
