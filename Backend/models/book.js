const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    url:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    desc:{
        type:String,
        require:true,
    },
    language:{
        type:String,
        require:true,
    },
});

module.exports = mongoose.model('books',booksSchema);