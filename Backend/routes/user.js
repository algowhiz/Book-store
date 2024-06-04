const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./userAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

//sign-up
router.post('/sign-up',async (req,res) =>{
    try {
        const {username,email,password,address} = req.body;
       
        if(username.length < 4){
            return res.status(400).json({message:"username must greater than 3"});
        }

        const checkUserEmail = await user.findOne({email:email});

        if(checkUserEmail)
            return res.status(400).json({message:"userEmail already exits"});

        if(password.length <= 5)
            return res.status(400).json({message:"password length must greater than 6"});

        const newHashPassword = await bcrypt.hash(password,10);

        const newUser = new user({username,email, password: newHashPassword,address});

        await newUser.save();

        return res.status(200).json({message:"sign-up successfully done"})

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
});


//sign-in
router.post('/sign-in',async (req,res) =>{
    try {
        const {username,password} = req.body;

        const checkUsername = await user.findOne({username});
        
        if(!checkUsername)
            res.status(400).json({message:"invalid credentials"});
    
         bcrypt.compare(password,checkUsername.password,(err,data)=>{
            if(data){
                const authClaims = [
                    {name:checkUsername.username},{role:checkUsername.role}
                ];
                const token = jwt.sign({authClaims},"bookStore123",{expiresIn:"30d"})
                res.status(200).json({id:checkUsername._id , role:checkUsername.role,token:token});
            }               

            else
            res.status(400).json({message:"invalid credentials"});
        });

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
});


router.get('/get-user-info',authenticateToken, async (req,res) =>{
    try {
        const {id} = req.headers;
        const data = await user.findById(id).select('-password');
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.put('/update-address',authenticateToken, async (req,res) =>{
    try {
        const {id} = req.headers;
        const {address} = req.body;

        await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated"})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})



module.exports=router;