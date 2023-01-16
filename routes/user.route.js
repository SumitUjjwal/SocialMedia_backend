const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
       const { name, email, gender, password } = req.body;

       const checkExisting = await UserModel.findOne({ email: email });
       if (checkExisting) {
              res.json({ "msg": "Already registered Please Login" });
       }
       else {
              try {
                     bcrypt.hash(password, 3, async (err, hash) => {
                            if (hash) {
                                   const user = new UserModel({ name, email, gender, password: hash });
                                   await user.save();
                                   console.log(user);
                                   res.json({ "msg": "Registered Successfully" });
                            }
                            else {
                                   console.log(err);
                            }
                     })
              } catch (error) {
                     res.json({ "msg": "Error registering" });
                     console.log(error);
              }
       }
});


userRouter.post("/login", async (req, res) => {
       const { email, password } = req.body;

       try {
              const user = await UserModel.findOne({ email: email});
              if (user) {
                     bcrypt.compare(password, user["password"], async (err, result) => {
                            if (result) {
                                   const token = jwt.sign({project: "eval"}, "masai");
                                   res.json({ "msg": "Logged In Successfully", "token": token, "userId": user["_id"] });
                            }
                            else {
                                   console.log(err);
                            }
                     })
              }
              else{
                     console.log("Wrong Credentials");
                     res.json({ "msg": "Wrong Credentials" });
              }
       } catch (error) {
              res.json({ "msg": "Error signing in" });
              console.log(error);
       }
});

module.exports = {
       userRouter
}