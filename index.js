const express = require('express');
const {connect} = require("./config/db");
const {authenticate} = require("./middleware/authenticate.middleware");
const {userRouter} = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port;



const app = express();
app.use(cors());
app.get('/', (req, res) =>{
       res.json({"msg": "Hello World!"});
})

app.use("/user", userRouter);
app.use(authenticate);
app.use("/post", postRouter);

app.listen(port, async()=>{
       try {
              await connect;
              console.log("Connected to Database");
              console.log("Listening on port " + port);
       } catch (error) {
              console.log(error);
              console.log("Couldn't connect to Database");
       }
})