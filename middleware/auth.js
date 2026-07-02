const {getUser} = require("../services/auth");
const User = require("../models/user"); 

async function restrictToLoggedInUserOnly(req, res, next) {
    try {
        const token = req.cookies?.uid;

        if (!token) return res.redirect("/login");

        const decoded = await getUser(token);
       

        if (!decoded) return res.redirect("/login");

        const user = await User.findById(decoded._id);

        if (!user) return res.redirect("/login");

        req.user = user;
        next();

    } catch (err) {
        console.log("ERROR:", err);
        return res.redirect("/login");
    }
}

module.exports = {
   restrictToLoggedInUserOnly
};