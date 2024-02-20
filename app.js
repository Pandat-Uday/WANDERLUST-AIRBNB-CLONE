const express = require("express");
const app = express();

const mongoose = require("mongoose");

const listing = require("./models/listing.js")
const path = require("path");

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

main()
.then(()=>{

    console.log("connected to db");
})

.catch((err)=>{
    console.log(err);
});




async function main(){
    await mongoose.connect(mongo_url);
}


app.get("/",(req,res)=>{
    res.send("hey,server is working")
})



//index route

app.get("/listings",async(req,res)=>{

    const alllisting = await listing.find({});
    res.render("listings/index.ejs",{alllisting});

    })

//show route

app.get("/listings/:id", async(req,res)=>{

    let{id} = req.params;
   const Listing = await listing.findById(id)
   res.render("listings/show.ejs",{Listing})


})



app.listen(8080,()=>{
    console.log("server is listening at 8080")
});