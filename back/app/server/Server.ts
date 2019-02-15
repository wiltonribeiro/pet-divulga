import Route from '../models/Route';
import Express from  'express';
import env from '../config/environment';
const bodyParser =  require('body-parser');

export default class Server {

    initServer(routes :Route[]) :void {
        const app: Express.Application = Express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        routes.forEach((item) =>{
            item.applyRoute(app);
        });

        app.use(Express.json());

        app.listen(env.server.port, function () {
            console.log('Running port 80!');
        });
    }
}