const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avtar: {
        type: String,
        default: "https://i.postimg.cc/L8z88FyZ/Screenshot-2024-06-03-130906-removebg-preview.png",
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    favourites: [
        { type: mongoose.Schema.Types.ObjectId ,
            ref:'books',
        }
    ],
    cart: [
        { type: mongoose.Schema.Types.ObjectId ,
            ref:'books',
        }
    ],
    orders: [
        { type: mongoose.Schema.Types.ObjectId ,
            ref:'order',
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('user',userSchema);