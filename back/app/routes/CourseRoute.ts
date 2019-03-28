import Route from "../models/Route";
import courseController from "../controllers/CourseController";
import e = require("express");

class CourseRoute implements Route{

    applyRoute(app: e.Application): void {

        app.get('/course', courseController.getCourse);

        app.post('/course', courseController.saveCourse);

    }
}

export default new CourseRoute();