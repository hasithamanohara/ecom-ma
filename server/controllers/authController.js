const User = require("../models/user");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res, next) => {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRETE_KEY.toString()
      ),
      address: req.body.address,
    });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ message: "failed to create user " + err });
    }
  },

  logInUser: async (req, res, next) => {
    try {
      const user = await User.find({ email: req.params.email });
      !user && res.status(401).json("Wrong email or password!");

      const decryptedP = crypto.AES.decrypt(
        user.password,
        process.env.SECRETE_KEY
      );
      const decreptedPassword = decryptedP.toString(crypto.enc.Utf8);

      decreptedPassword !== req.body.password;

      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRETE_JWT,
        { expiresIn: "3d" }
      );
      const { password, _V, createAt, ...others } = user._doc;

      res.status(200).json({ ...others, token: userToken });
    } catch (err) {
      res.status(500).json("Failed to login user " + err);
    }
  },
};
