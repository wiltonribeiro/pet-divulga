import Server from './server/Server';
import userRoute from './routes/UserRoute';
import defaultUser from './routes/DefaultRoute';
import courseRoute from './routes/CourseRoute';
import Database from "./config/Database";

let server = new Server();
let db = new Database();


db.connect().then(() => {
    server.initServer([userRoute, defaultUser, courseRoute])
}).catch((err) => {
    console.log(err);
});

process.on('SIGINT', async () => {
   await db.disconnect();
});