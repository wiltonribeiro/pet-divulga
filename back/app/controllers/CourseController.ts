import Course, {ICourse} from "../models/Course";
import database from "../config/Database";
import Error from "../models/ErrorCode";

class CourseController {

    async getCourse() : Promise<ICourse>{

        return new Promise<any>((res, rej) => {
            Course.find( async (err, data : ICourse) => {
                if(err){
                    rej(new Error(500, err));
                } else{
                    res(data);
                }
            });
        });
    }

    async saveCourse(body: any) : Promise<boolean>{
        return new Promise<boolean>(async (res, rej)=>{

            await new Course(body).save(async err => {
                if(err){
                    rej(new Error(500, err));
                }
                else{
                    res(true);
                }
            });
        })
    }
}

export default new CourseController();