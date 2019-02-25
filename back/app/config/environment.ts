const environment = {
    server:{
        port: process.env.SERVER_PORT || 80
    },
    db:{
        url: process.env.DB_URL || 'mongodb://localhost/divulga'
    }
};

export default environment;