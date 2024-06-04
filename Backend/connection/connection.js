const mongoose = require('mongoose');

const conn = async () =>{
    try {
        await mongoose.connect(`${process.env.MongoDB}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }
}

module.exports={conn};

// conn();