import Route from "../models/Route";
import courseController from "../controllers/CourseController";
import e = require("express");
import authController from "../controllers/AuthController";

class CourseRoute implements Route{

    applyRoute(app: e.Application): void {

        app.get('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);

            if(isValid){
                courseController.getCourse().then((data)=>{
                    if(data) res.send(data);
                    else res.sendStatus(500);
                });
            } else {
                res.sendStatus(403);
            }
        });

        app.post('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await authController.isValidToken(token);

            if(isValid) {
                courseController.saveCourse(req.body).then((v) => {
                    if (v) res.sendStatus(200);
                    else res.sendStatus(500);
                });
            }else {
                res.sendStatus(403);
            }

        });

    }
}

export default new CourseRoute();