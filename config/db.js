const mongoose = require('mongoose');


const connectMongooDb = async() => {
    try {

        const conn = await mongoose.connect(process.env.MONGOO_URL);
        if(conn){
            console.log(`mongoo db connected !!!!!!!!!!`);
        }

    } catch(err){
        console.log(`mongoo connecttion failed , ${err} `);
        process.exit(1);


    }
}


module.exports = {connectMongooDb};