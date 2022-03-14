import * as Hapi from '@hapi/hapi';
import TaskRoutes from './api/tasks/routes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    console.info('Router - Start adding routes');

    await new TaskRoutes().register(server);

    console.info('Router - Finish adding routes');
  }
}
