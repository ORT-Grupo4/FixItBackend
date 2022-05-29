const { response, request } = require("express");
const User = require("../models/User");
const encrypt = require("bcryptjs");
const { resolve } = require("path");
const { generateJWT } = require("../helpers/generateJWT");

const createUser = async (req, res = response) => {
    const { name, email, password, userType } = req.body;
    try {
        //Buscamos usuario para ver que no exista
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists",
            });
        }
        user = new User(req.body);

        //Encriptamos la contraseña
        const salt = encrypt.genSaltSync();
        user.password = encrypt.hashSync(password, salt);
        await user.save();

        //generamos jwt
        const token = generateJWT(user.id, user.name);
        res.status(201).json({
            ok: true,
            user: user.id,
            name: user.name,
            userType: user.userType,
            token: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", err: "Contact an admin" });
    }
};

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ ok: false, msg: "user does not exist" });

        //validamos password
        const validPassword = encrypt.compareSync(password, user.password);
        if (!validPassword)
            return res.status(400).json({ ok: false, msg: "Invalid password" });

        //generamos jwt
        const token = await generateJWT(user.id, user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            userType: user.userType,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", err: "Contact an admin" });
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;
    const newToken = await generateJWT(uid, name);
    res.json({
        ok: true,
        token: newToken,
    });
};

const getUsers = async (req, res = response) => {
    res.json({
        ok:true,
        response: await User.find({})
    })
}


module.exports = {
    createUser,
    login,
    renewToken,
    getUsers
};
