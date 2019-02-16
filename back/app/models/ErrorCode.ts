

export default class ErrorCode extends Error {

    code : number;
    constructor(code :number, message :string){
        super(message);
        this.code = code;
    }
}