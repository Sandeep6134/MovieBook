
const mongo=require("./connect.js")
const express=require("express")
const { connect } = require("./connect.js")
const app=express()
const cors=require("cors");
app.use(cors())
mongo.connect();
console.log(connect())

app.get("/movie",async(req,res,next)=>{

    try {
        var data = await mongo.db.collection("Movie").find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

app.post("/update", async (req, res, next) => {
    const existMovie = await mongo.db
      .collection("Movie")
      .findOne({ movie: req.body.movie });
    if (existMovie) {
      return res.status(400).send({ msg: "This Movie already exists" });
    } else {
      var data = await mongo.db.collection("Movie").insertOne(req.body);
      return res.send(data);
    }
  });

app.delete("/delete", async(req,res,next) => {
    const existMovie = await mongo.db
    .collection("Movie")
    .findOne({ movie: req.body.movie });
  if (existMovie) {
    var data = await mongo.db.collection("Movie").deleteOne({"movie":req.body.movie});
    return res.send(data);
    
  } else {
    return res.status(400).send({ msg: "This Movie does not exist" });
  }
})

const port = process.env.PORT || 3001
app.listen(port, function(){
    console.log("connected")
})