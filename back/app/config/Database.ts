import mongoose = require('mongoose');
import env from './environment';

class Database {

    connect() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoose.connect(env.db.url, { useNewUrlParser: true });
            let db = mongoose.connection;
            db.on("error", ()=> reject(false));
            db.on("connected", () => resolve(true));

        })
    }

    disconnect() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoose.disconnect(err => {
                if (err) reject(false);
                else resolve(true);
            })
        });
    }
}

export default new Database();