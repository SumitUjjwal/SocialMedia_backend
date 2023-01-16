const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
       const token = req.headers.authorization;
       if(token){
              const decode = jwt.verify(token, "masai");
              if(decode){
                     next();
              }
              else{
                     res.json({"msg": "Please Login First"});
              }
       }
       else{
              res.json({ "msg": "Please Login First" });
       }
}

module.exports = {
       authenticate
}
