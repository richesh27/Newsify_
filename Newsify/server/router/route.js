import express from 'express';
const router = new express.Router();
import User from "../models/auth.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js"
import jwt from "jsonwebtoken"


router.post('/', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
        // console.log('h');
        return res.json('not exists');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json('wrong password');
    }
    sendCookie(user, res, "matched", 200);
})

router.post('/signup', async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    let user = await User.findOne({ email });
    if (password !== cpassword) {
        return res.json('passwords are not matching')
    }
    if (user) {
        return res.json('email exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword, bookmarks: [] });
    sendCookie(user, res, "registered", 201);
})

router.get('/logout', (req, res) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
    }
    ).json({
        success: true,
        user: req.user,
    });
})
router.get('/users', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({
            success: false,
            message: "Login First",
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    res.status(200).json({
        success: true,
        user,
    })
})

router.post('/book', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                message: "Login First",
            });
        }
        const { i } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        await user.updateOne({ $push: { bookmarks: i } });
        await user.save();
        res.status(200).json({
            success: true,
            message: 'bookmarked'
        })
    } catch (e) {
        console.log(e);
    }
})

router.post('/unbook', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { i } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        console.log('Unbooked');
        await user.updateOne({ $pull: { "bookmarks": { Headline: i.Headline } } });
        res.status(200).json({
            success: true,
            message: 'unbooked'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })

    }
})

router.get('/saved', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                message: "Login First",
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        res.send(user.bookmarks);
    } catch (e) {
        console.log(e);
    }
})

export default router;