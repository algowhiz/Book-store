const router = require('express').Router();
const user = require('../models/user');
const { authenticateToken } = require('./userAuth');
const book = require('../models/book');
const Order = require('../models/order');

router.post('/place-order',authenticateToken,async (req,res) =>{
    try {
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order){
            const newOrder = new Order({user :id,book:orderData._id});
            const orderDataFromDB = await newOrder.save();

            await user.findByIdAndUpdate(id,{$push:{orders:orderDataFromDB._id}});
            await user.findByIdAndUpdate(id,{$pull:{cart:orderData._id}});
        }

        return res.json({
            status:"success",
            message:"order placed successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-order-history',authenticateToken,async (req,res) =>{
    try {
        const {id} = req.headers;
        const userData = await user.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        });

        const orderData = userData.orders.reverse();

        return res.json({
            status :'success',
            data:orderData,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-all-order',authenticateToken,async (req,res) =>{
    try {
        
        const userData = await Order.find().populate({
            path:'book',
        }).populate({
            path:"user",
        }).sort({createdAt:-1});

        return res.json({
            status :req.body.status,
            data:userData,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


router.put('/update-status/:orderId',authenticateToken, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  
      res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;