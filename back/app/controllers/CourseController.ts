import {Request, Response} from "express";
import Auth from "../core/Auth";
import courseRepository from "../repository/CourseRepository";

class CourseController {

    async getCourse(req: Request, res: Response) {

        let token = req.headers.authorization;
        let isValid :boolean = await new Auth().isValidToken(token);

        if(isValid){
            try {
                let data = await courseRepository.getCourse();
                res.send(data);
            }catch (e) {
                res.status(e.code).send({"message":e.message});
            }
        } else
            res.sendStatus(403);

    }

    async saveCourse(req: Request, res: Response){

        let token = req.headers.authorization;
        let isValid :boolean = await new Auth().isValidToken(token);

        if(isValid) {

            try{
                await courseRepository.saveCourse(req.body);
                res.sendStatus(200);
            }catch (e) {
                res.status(e.code ? e.code : 500).send({"message":e.message});
            }

        } else
            res.sendStatus(403);
    }
}

export default new CourseController();