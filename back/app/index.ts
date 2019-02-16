import Server from './server/Server';
import userRoute from './routes/UserRoute';
import defaultUser from './routes/DefaultRoute';
import courseRoute from './routes/CourseRoute';

new Server().initServer([userRoute, defaultUser, courseRoute]);