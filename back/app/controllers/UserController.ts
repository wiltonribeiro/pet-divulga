import {IUser} from "../models/User";
import userRepository from "../repository/UserRepository";
import Error from '../models/ErrorCode';
import Auth from "../core/Auth";
import {Request, Response} from "express";


class UserController {

    async registerUser(req: Request, res: Response){

        let type = req.params.type;
        let body = req.body;

        switch (type){
            case "student":{

                let user_id = await userRepository.registerUser(body).catch(err => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });

                userRepository.registerStudent(body, user_id).then(() => {
                    res.send(200);
                }).catch((err) =>{
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });

                break;
            }

            case "advisor":{

                let user_id = await userRepository.registerUser(body).catch(err => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });

                userRepository.registerStudent(body, user_id).then(() => {
                    res.send(200);
                }).catch((err) =>{
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });

                break;
            }

            default:{
                let e = new Error(400,"Tipo de usuário inexistente");
                res.status(e.code).send(e.message);
            }
        }
    }

    async getUserByTypeAndId(req: Request, res: Response){

        let type = req.params.type;
        let userTypeData : any;
        let uid = req.params.uid;

        let userData = await userRepository.getUser(uid).catch(err => {
            let e = err as Error;
            res.status(e.code).send(e.message);
        });

        switch (type){
            case "student":{
                userTypeData = await userRepository.getStudent((userData as IUser)._id).catch((err) => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });
                break;
            }
            case "advisor":{
                userTypeData = await userRepository.getStudent((userData as IUser)._id).catch((err) => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });
                break;
            }
            default:{
                let e = new Error(400,"Tipo de usuário inexistente");
                res.status(e.code).send(e.message);
            }
        }

        let json : any = Object.assign({},userData,userTypeData);
        res.send(json);

    }

    async loginUser(req: Request, res: Response){

        let type = req.params.type;
        let email = req.body.email;
        let password = req.body.password;

        let userTypeData : any;
        let userData = await userRepository.loginUser(email, password).catch((err) => {
            let e = err as Error;
            res.status(e.code).send(e.message);
        });

        switch (type){
            case "student":{
                userTypeData = await userRepository.getStudent((userData as IUser)._id).catch((err) => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });
                break;
            }
            case "advisor":{
                userTypeData = await userRepository.getAdvisor((userData as IUser)._id).catch((err) => {
                    let e = err as Error;
                    res.status(e.code).send(e.message);
                });
                break;
            }
            default:{
                let e = new Error(400,"Tipo de usuário inexistente");
                res.status(e.code).send(e.message);
            }
        }

        let json : any = Object.assign({}, userData, userTypeData);
        json.token = new Auth().generateToken();
        res.send(json);
    }

    async getUserById(req: Request, res: Response){
        let uid = req.params.uid;
        let user = await userRepository.getUser(uid).catch((err) => {
            let e = err as Error;
            res.status(e.code).send(e.message);
        });
        res.send(user);
    }

}

export default new UserController();