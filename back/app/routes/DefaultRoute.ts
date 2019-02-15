import Route from "../models/Route";
import e = require("express");

class DefaultRoute implements Route {
    applyRoute(app: e.Application): void {
        app.get('/', (req, res) =>{
           res.send('Sistema no ar');
        });
    }
}

export default new DefaultRoute();