import Route from "../models/Route";
import e = require("express");
import userController from '../controllers/UserController';

class UserRoute implements Route {


    applyRoute(app: e.Application): void {

        app.post('/user/login/:type', userController.loginUser);

        app.post('/user/register/:type', userController.registerUser);

        app.get('/user/:uid', userController.getUserById);

        app.get('/user/:uid/:type', userController.getUserByTypeAndId);

    }
}

export default new UserRoute();