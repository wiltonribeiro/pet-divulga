import Route from "../models/Route";
import courseController from "../controllers/CourseController";
import e = require("express");
import Auth from "../core/Auth";

class CourseRoute implements Route{

    applyRoute(app: e.Application): void {

        app.get('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await new Auth().isValidToken(token);

            if(isValid){
                try {
                    let data = await courseController.getCourse();
                    res.send(data);
                }catch (e) {
                    res.status(e.code).send({"message":e.message});
                }
            } else
                res.sendStatus(403);

        });

        app.post('/course', async (req, res) => {

            let token = req.headers.authorization;
            let isValid :boolean = await new Auth().isValidToken(token);

            if(isValid) {
                try{
                    await courseController.saveCourse(req.body);
                    res.sendStatus(200);
                }catch (e) {
                    res.status(e.code).send({"message":e.message});
                }
            } else
                res.sendStatus(403);

        });

    }
}

export default new CourseRoute();