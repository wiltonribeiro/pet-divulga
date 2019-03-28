import Error from "../models/ErrorCode";
import User, {IUser} from "../models/User";
import {IStudent} from "../models/Student";
import Student from "../models/Student";
import Advisor, {IAdvisor} from "../models/Advisor";

class UserRepository {

    async loginUser(email :string, password :string) : Promise<IUser> {
        return new Promise<IUser>(async (resolve, reject) => {
            await User.findOne({email: email, password: password}).lean().exec(async (err, userData : IUser) => {
                if(userData == null)
                    reject(new Error(401, "Usuário não encontrado"));
                else if(err)
                    reject(new Error(500, err));
                else
                    resolve(userData);
            });
        });
    }

    async getUser(uid : String) : Promise<IStudent>{
        return new Promise<any>(async (resolve, reject) => {
            await User.findById(uid).lean().exec((err, userData : IStudent) => {
                if(userData == null)
                    reject(new Error(401, 'Tipo de usuário inconssitente ao solicitado'));
                else if(err)
                    reject(new Error(500, err));
                else
                    resolve(userData);
            });
        });
    }

    async getStudent(uid :string) : Promise<IStudent> {
        return new Promise<any>(async (resolve, reject) => {
            await Student.findById(uid).populate('course_id').lean().exec((err, studentData : IStudent) => {
                if(studentData == null)
                    reject(new Error(401, 'Tipo de usuário inconssitente ao solicitado'));
                else if(err)
                    reject(new Error(500, err));
                else
                    resolve(studentData);
            });
        });
    }

    async getAdvisor(uid :string) : Promise<IAdvisor> {
        return new Promise<any>(async (resolve, reject) => {
            await Advisor.findById(uid).lean().exec((err, advisorData : IAdvisor) => {
                if(advisorData == null)
                    reject(new Error(401, 'Tipo de usuário inconssitente ao solicitado'));
                else if(err)
                    reject(new Error(500, err));
                else
                    resolve(advisorData);
            });
        });
    }

    async registerUser(content : any) : Promise<any> {
        let user = new User(content);

        return new Promise<boolean>( async (resolve, reject) =>{
            await user.save(async err => {
                if (err)
                    reject(new Error(500, err));
                else {
                    resolve(user._id);
                }
            });
        });
    }

    async registerStudent(content : any, uid_user : string) : Promise<boolean> {

        let student = new Student();
        student._id = require('mongoose').Types.ObjectId(uid_user);
        student.course_id = require('mongoose').Types.ObjectId(content.course_id);

        return new Promise<boolean>(async (resolve, reject) => {
            await student.save(err => {
                if(err) {
                    reject(new Error(500, err));
                } else
                    resolve(true);
            });
        });
    }

    async registerAdvisor(content : any, uid_user : string) : Promise<boolean> {
        let advisor = new Advisor();
        advisor._id = require('mongoose').Types.ObjectId(uid_user);
        advisor.advisor_type = content.advisor_type;

        return new Promise<boolean>(async (resolve, reject) => {
            await advisor.save(err => {
                if(err) {
                    reject(new Error(500, err));
                } else
                    resolve(true);
            });
        });
    }
}

export default new UserRepository();