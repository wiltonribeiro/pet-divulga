import Route from "../models/Route";
import courseController from "../controllers/CourseController";
import e = require("express");
import authController from "../controllers/AuthController";
import Error from '../models/ErrorCode';

class CourseRoute implements Route{

    applyRoute(app: e.Application): void {

        app.get('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);

            if(isValid){
                try {
                    let data = await courseController.getCourse();
                    res.send(data);
                }catch (e) {
                    if(e instanceof Error){
                        res.sendStatus(e.code);
                        res.send(e);
                    }
                }
            } else res.sendStatus(403);

        });

        app.post('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);

            if(isValid) {
                try{
                    await courseController.saveCourse(req.body);
                    res.sendStatus(200);
                }catch (e) {
                    if(e instanceof Error){
                        res.sendStatus(e.code);
                        res.send(e);
                    }
                }
            }else {
                res.sendStatus(403);
            }

        });

    }
}

export default new CourseRoute();