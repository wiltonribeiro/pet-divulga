import User from "../models/User";
import Student, {IStudent} from "../models/Student";
import Database from "../config/Database";
import mongoose = require('mongoose');
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

        switch (type){
            case "student":{
                let result = await this.loginStudent(body.email, body.password);
                await Database.disconnect();
                return result;
            }
            default:{
                throw new Error(400,"Tipo de usuário inexistente");
            }
        }

    }

    private async loginStudent(email :string, password :string) : Promise<any> {
        return new Promise<any>( async (response) =>{
            Student.findOne({email: email, password: password}, (err, res) => {
                if(res == null || err) throw new Error(401, "Usuário não encontrado");
                else{
                    response(res);
                }
            });
        });
    }

    private registerStudent(body :any) : Promise<boolean> {
        let user = new User();
        Student.schema.add(UserController.userDataSchema().obj);

        let student = new Student(body);
        student.course_id = require('mongoose').Types.ObjectId(body.course_id);
        student.user_id = user._id;

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

    private static userDataSchema() :mongoose.Schema {
        return new mongoose.Schema({
            name: {type: mongoose.Schema.Types.String, required: true},
            email: {type: mongoose.Schema.Types.String, required: true, unique: true},
            password: {type: mongoose.Schema.Types.String, required: true},
            registration: {type: mongoose.Schema.Types.String, required: true},
            about: {type: mongoose.Schema.Types.String, required: false},
            status: {type: mongoose.Schema.Types.Boolean, required: true},
            links: [{
                type: mongoose.Schema.Types.String, required: false
            }],
            publications: [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Publication'
            }]
        });
    }
}

export default new UserController();