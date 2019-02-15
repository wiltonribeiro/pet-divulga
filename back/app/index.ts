import Server from './server/Server';
import userRoute from './routes/UserRoute';
import defaultUser from './routes/DefaultRoute';

new Server().initServer([userRoute, defaultUser]);