const express = require("express");
const { PostModel } = require("../models/post.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const postRouter = express.Router();

postRouter.use(express.json());

postRouter.get("/", async(req, res) => {
       try {
              const posts = await PostModel.find();
              console.log(posts);
              res.json(posts);
       } catch (error) {
              console.log(error);
              res.json({"msg": "Error in getting posts"})
       }
})

postRouter.post("/create", async (req, res) => {
       const posts = req.body;
       try {
              const newPost = new PostModel(posts);
              await newPost.save();
              console.log(newPost);
              res.json({"msg": "New Post Created Successfully", "post":newPost});
       } catch (error) {

       }
})

postRouter.patch("/update/:id", async(req, res)=>{
       const id = req.params.id;
       const updatePost = req.body;
       try {
              await PostModel.findByIdAndUpdate({_id: id}, updatePost);
              res.json({"msg": "Post Updated Successfully", "post":updatePost});
       } catch (error) {
              console.log(error.message);
              res.json({"msg": "Post Updated Failed"})
       }
})

postRouter.delete("/delete/:id", async (req, res) => {
       const id = req.params.id;
       try {
              await PostModel.findByIdAndDelete({ _id: id });
              res.json({ "msg": "Post Deleted Successfully" });
       } catch (error) {
              console.log(error.message);
              res.json({ "msg": "Post Deletion Failed" })
       }
})

module.exports = {
       postRouter
}