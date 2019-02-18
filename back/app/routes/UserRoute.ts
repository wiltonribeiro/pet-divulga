import Route from "../models/Route";
import authController from "../controllers/AuthController";
import e = require("express");
import UserController from '../controllers/UserController';
import Error from '../models/ErrorCode';

class UserRoute implements Route {
    applyRoute(app: e.Application): void {

        //pegar usuario
        app.get('/user', (req, res) =>{

        });

        app.post('/user/login/:type', async (req, res) =>{
            try{
                let result = await  UserController.loginUser(req.params.type, req.body);
                result.token =  authController.generateToken();
                res.send(result);
            }catch (e) {
                res.status(e.code).send({"message":e.message});
            }
        });

        app.post('/user/register/:type', async (req, res) => {
            try{
                await UserController.registerUser(req.params.type, req.body);
                res.sendStatus(200);
            }catch (e) {
                if(e instanceof Error)
                    res.status(e.code).send({"message":e.message});
                else
                    res.sendStatus(500);
            }
        });

        app.post('user/delete/:userId', (req, res) =>{
            //TODO
        });
    }
}

export default new UserRoute();