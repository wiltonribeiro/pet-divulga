import fs from 'fs';
import jwt from 'jsonwebtoken';

export default class Auth {

    key : string;

    constructor(){
        this.key =  fs.readFileSync('./privateKey.txt','utf8');
    }

    generateToken(): string {
        return jwt.sign({"some":"thing"}, this.key, Auth.jwtOptions());
    }

    isValidToken(token : string | undefined) : Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if(token != undefined){
                jwt.verify(token, this.key, err => {
                    if(err) {
                        console.log(err);
                        resolve(false);
                    }
                    else resolve(true);
                })
            } else resolve(false);
        });
    }

    private static jwtOptions() {
        return {
            algorithm:  "HS256"
        };
    }

}