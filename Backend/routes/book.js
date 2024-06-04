const router = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./userAuth');
const book = require('../models/book');
// add book - admin role


const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Check ID is present
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const checkAdmin = await user.findById(id);

        // Check user exists
        if (!checkAdmin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check user is an admin
        if (checkAdmin.role !== 'admin') {
            return res.status(403).json({ message: "You are not Admin" });
        }

        // All fiels req
        const { url, title, author, price, desc, language } = req.body;
        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the new book
        const newBook = new book({
            url,
            title,
            author,
            price,
            desc,
            language,
        });

        await newBook.save();

        res.status(200).json({ message: "New Book Added" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.put('/update-book', authenticateToken, async (req, res) => {
    try {

        const { bookid } = req.headers;

        await book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })

        res.status(200).json({ message: "Book updated" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})


router.delete('/delete-book', authenticateToken, async (req, res) => {
    try {

        const { bookid } = req.headers;

        await book.findByIdAndDelete(bookid);

        res.status(200).json({ message: "Book Deleted" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/get-all-books', async (req, res) => {
    try {

        const books = await book.find().sort({ createdAt: -1 });

        res.status(200).json({ status: "success", data: books });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/get-recent-books', async (req, res) => {
    try {

        const books = await book.find().sort({ createdAt: -1 }).limit(4);

        res.status(200).json({ status: "success", data: books });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get('/get-book-by-id/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const books = await book.findById(id);

        res.status(200).json({ status: "success", data: books });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;