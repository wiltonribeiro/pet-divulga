import fs from 'fs';
import jwt from 'jsonwebtoken';

class AuthController {

    key : string;

    constructor(){
        this.key =  fs.readFileSync('./privateKey.txt','utf8');
    }

    generateToken(): string {
        return jwt.sign({"some":"thing"}, this.key, this.jwtOptions());
    }

    isValidToken(token : string | undefined) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if(token != undefined){
                jwt.verify(token, this.key, err => {
                    if(err) {
                        console.log(err);
                        reject(false);
                    }
                    else resolve(true);
                })
            } else reject(false);
        });
    }

    private jwtOptions() {
        return {
            expiresIn:  "12h",
            algorithm:  "HS256"
        };
    }

}

export default new AuthController();