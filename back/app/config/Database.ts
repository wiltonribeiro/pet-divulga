import mongoose = require('mongoose');
import Error from '../models/ErrorCode';
import env from './environment';

export default class Database {

    async connect() : Promise<any> {
        await mongoose.connect(env.db.url, { useNewUrlParser: true }).then(()=>{
            mongoose.connection.on("error", ()=> {throw new Error(500, "Erro")});
        });
    }

    async disconnect() : Promise<any> {
        await mongoose.disconnect();
    }
}
