import Course, {ICourse} from "../models/Course";
import database from "../config/Database";
import Error from "../models/ErrorCode";

class CourseController {

    async getCourse() : Promise<ICourse>{

        let result :boolean = await database.connect();
        if(!result) throw new Error(500,"Falha ao conectar-se com o banco de dados");

        return new Promise<any>((res) => {
            Course.find( async (err, data : ICourse) => {
                if(err){
                    console.log(err);
                    throw new Error(500,err);
                } else{
                    await database.disconnect();
                    res(data);
                }
            });
        });
    }

    async saveCourse(body: any) : Promise<boolean>{

        let result :boolean = await database.connect();
        if(!result) throw new Error(500,"Falha ao conectar-se com o banco de dados");

        return new Promise<boolean>(async (res)=>{

            await new Course(body).save(async err => {
                if(err){
                    console.log(err);
                    throw new Error(500,err);
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