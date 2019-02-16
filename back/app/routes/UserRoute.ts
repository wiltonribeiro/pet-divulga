import Route from "../models/Route";
import authController from "../controllers/AuthController";
import e = require("express");
import UserController from '../controllers/UserController';
import Error from '../models/ErrorCode';

class UserRoute implements Route {
    applyRoute(app: e.Application): void {

        app.get('/user', (req, res) =>{
            //TODO
            res.send(authController.generateToken());
        });

        app.post('/user/login/:type', async (req, res) =>{

            // let token = req.headers.authorization;
            // let isValid :boolean = await authController.isValidToken(token);

            // if(isValid){
                try{
                    let result = await  UserController.loginUser(req.params.type, req.body);
                    res.send(result);
                }catch (e) {
                    if(e instanceof Error){
                        res.sendStatus(e.code);
                    } else res.sendStatus(500);
                }
            // } else {
            //     res.sendStatus(403);
            // }

        });

        app.post('/user/register/:type', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);

            try{
                if(!isValid) res.sendStatus(403);
                else{
                    await UserController.registerUser(req.params.type, req.body);
                    res.sendStatus(200);
                }
            }catch (e) {
                if(e instanceof Error){
                    res.sendStatus(e.code);
                } else res.sendStatus(500);
            }
        });

        app.post('user/delete/:userId', (req, res) =>{
            //TODO
        });
    }
}

export default new UserRoute();