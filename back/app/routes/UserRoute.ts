import Route from "../models/Route";
import authController from "../controllers/AuthController";
import e = require("express");
import UserController from '../controllers/UserController';

class UserRoute implements Route {
    applyRoute(app: e.Application): void {

        app.get('/user', (req, res) =>{
            res.send(authController.generateToken());
        });

        app.post('/user/login/:type', (req, res) =>{

        });

        app.post('/user/register/:type', async (req, res) => {
            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);
            if(!isValid) res.sendStatus(403);
            else{
                UserController.registerUser(req.params.type, req.body).then((result) => {
                   if(result) res.sendStatus(200);
                   else res.sendStatus(500);
                });
            }
        });

        app.post('user/delete/:userId', (req, res) =>{

        });
    }
}

export default new UserRoute();