const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            usenewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connection successful');
    }catch(error){
        console.log(error);
        throw new Error('Error on DB connection initialization')

    }
}




module.exports ={
    dbConnection
}