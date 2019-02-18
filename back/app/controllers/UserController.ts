import User, {IUser} from "../models/User";
import Student, {IStudent} from "../models/Student";
import Database from "../config/Database";
import Error from '../models/ErrorCode';
class UserController {

    async registerUser(type : String, body :any) : Promise<boolean>{

        let result :boolean = await Database.connect();
        if (!result)  throw new Error(500,"Falha ao conectar-se com o banco de dados");

        switch (type){
            case "student":{
                let result = await this.registerStudent(body);
                await Database.disconnect();
                return result;
            }
            default:{
                throw new Error(400,"Tipo de usuário inexistente");
            }
        }
    }

    async loginUser(type : String, body :any) : Promise<any>{

        let result :boolean = await Database.connect();
        if (!result)  throw new Error(500,"Falha ao conectar-se com o banco de dados");

        let email = body.email;
        let password = body.password;

        return new Promise<any>((resolve, reject) => {

            User.findOne({email: email, password: password}).lean().exec(async (err, userData) => {

                let json :any = null;

                if(userData == null || err) reject(new Error(401, "Usuário não encontrado"));
                else {
                    switch (type){
                        case "student":{
                            let studentData = await this.loginStudent(userData._id).catch(err1 => reject(err1));
                            json = Object.assign({},userData,studentData);
                            break;
                        }
                        default:{
                            reject(new Error(400,"Tipo de usuário inexistente"));
                        }
                    }
                    await Database.disconnect();
                    resolve(json);
                }
            });
        });
    }

    private async loginStudent(_id: any) : Promise<IUser> {
        return new Promise<any>( (resolve, reject) => {
            Student.findById(_id).populate('course_id').lean().exec((_, studentData) => {
                if(studentData == null) reject(new Error(401, 'Tipo de usuário inconssitente ao solicitado'));
                resolve(studentData);
            });
        });
    }

    private registerStudent(body :any) : Promise<boolean> {
        let user = new User(body);

        let student = new Student();
        student._id = require('mongoose').Types.ObjectId(user._id);
        student.course_id = require('mongoose').Types.ObjectId(body.course_id);

        return new Promise<boolean>(async (resolve) => {

           await user.save(async err => {
               if (err) {
                   console.log(err);
                   resolve(false);
               } else {
                   await student.save(err1 => {
                       if(err1) {
                           console.log(err1);
                           resolve(false);
                       } else
                           resolve(true);
                   })
               }
           });
        });
    }
}

export default new UserController();