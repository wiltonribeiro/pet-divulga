import Route from "../models/Route";
import authController from "../controllers/AuthController";
import e = require("express");
import User from '../models/User';

class UserRoute implements Route {
    applyRoute(app: e.Application): void {

        app.get('/user', (req, res) =>{
            res.send(authController.generateToken());
        });

        app.post('/user/login/:type', (req, res) =>{
            switch (req.params.type){
                case "student":{

                    break;
                }
                case "admin":{

                    break;
                }
                case "technician":{

                    break;
                }
                case "professor":{

                    break;
                }
                case "advisor": {

                    break;
                }
                default :{
                    res.sendStatus(404);
                    break;
                }
            }
        });

        app.post('/user/register/:type', async (req, res) =>{
            let token = req.headers.authorization;
            try {
                await authController.isValidToken(token);
                switch (req.params.type){
                    case "student":{
                        let user = new User(req.body);
                        res.sendStatus(200);
                        break;
                    }
                    case "admin":{

                        break;
                    }
                    case "advisor": {
                        break;
                    }
                    default :{
                        res.sendStatus(404);
                        break;
                    }
                }

            } catch (e) {
                res.sendStatus(403);
            }
        });

        app.post('user/delete/:userId', (req, res) =>{

        });
    }
}

export default new UserRoute();