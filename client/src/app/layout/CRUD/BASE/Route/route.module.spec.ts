import { RouteModule } from './route.module';

describe('RouteModule', () => {
   let blackPageModule: RouteModule;

   beforeEach(() => {
      blackPageModule = new RouteModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});