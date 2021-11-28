import User from "../database/schemas/User";
import express from "express";
import { generateJWT } from "../helpers/generateJWT";
const router = express.Router();

module.exports = function (app) {
    app.use('/auth', router);

    router.post('/login', async (req, res, next) => {
        const user = await User.findOne({
            email: req.user.email
        }).exec();

        if (!user) {
            const response = {
                message: "Unable to locate user with the provided email",
                user,
            };

            res.status(500);
            res.write(JSON.stringify(response));
            res.end();
            return;
        }

        const token = generateJWT(user);
        const response = {
            accessToken: token,
            userId: user._id,
            message: "Successfully Login",
            user,
        };

        res.status(200);
        res.write(JSON.stringify(response));
        res.end();
    })
};
