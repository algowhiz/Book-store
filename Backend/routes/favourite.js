const router = require('express').Router();
const user = require('../models/user');
const { authenticateToken } = require('./userAuth');
const book = require('../models/book');

router.put('/add-to-fav', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookFav = userData.favourites.includes(bookid);

        if (isBookFav)
            return res.status(200).json({ message: "Book is already in favourite list " });

        await user.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book is added favourite list " });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/remove-from-fav', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookFav = userData.favourites.includes(bookid);

        if (isBookFav)
            await user.findByIdAndUpdate(id, { $pull: { favourites: bookid } });


        return res.status(200).json({ message: "Book is removed from  favourite list " });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/get-fav-books', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await user.findById(id).populate('favourites');
        const favBooks = userData.favourites;

        return res.json({
            status: "success",
            data: favBooks,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;