import Course from "../models/Course";
import database from "../config/Database";
import {IStudent} from "../models/Student";

const mongoose = require("mongoose");

class CourseController {

    async getCourse() : Promise<IStudent>{

        let result :boolean = await database.connect();
        return new Promise<any>( (res) => {
            if(result == false) res(null);

            Course.find((err, data : IStudent) => {
                if(err){
                    console.log(err);
                    res(null);
                } else res(data);
            });

        });
    }

    async saveCourse(body: any) : Promise<boolean>{

        let result :boolean = await database.connect();
        return new Promise<boolean>((res)=>{

            if(result == false) res(false);

            new Course(body).save(async err => {
                if(err){
                    console.log(err);
                    res(false);
                }
                else{
                    await database.disconnect();
                    res(true);
                }
            });
        })
    }
}

export default new CourseController();