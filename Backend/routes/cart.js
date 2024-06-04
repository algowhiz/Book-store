const router = require('express').Router();
const user = require('../models/user');
const { authenticateToken } = require('./userAuth');
const book = require('../models/book');

router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart)
            return res.status(200).json({ message: "Book is already in cart" });

        await user.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json({ message: "Book is added cart " });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {
    try {
        const { bookid} = req.params;
        const { id} = req.headers;
        const userData = await user.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart)
            await user.findByIdAndUpdate(id, { $pull: { cart: bookid } });


        return res.status(200).json({ message: "Book is removed from  Cart " });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-user-cart', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await user.findById(id).populate('cart');
        const cartBooks = userData.cart.reverse();

        return res.json({
            status: "success",
            data: cartBooks,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;