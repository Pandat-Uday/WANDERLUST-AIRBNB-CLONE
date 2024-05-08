const express = require("express");
const app = express();

const mongoose = require("mongoose");

const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require('method-override');
const ejsMate= require("ejs-mate");
const wrapasync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expresserr.js")
const { listingSchema,reviewSchema}= require("./schema.js")
const Review = require("./models/review.js");
const reviews= require("./router/review.js")

const listings = require("./router/listing.js")

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

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

app.listen(8080,()=>{
    console.log("server is listening at 8080")
});


app.get("/",(req,res)=>{
    res.send("hey,server is working")
})










app.use("/listings",listings);
app.use("listings/:id/review",reviews)




 
 

 





app.all("*",(req,res,next)=>{

    next (new ExpressError(404,"page not found!"));
})



app.use((err, req, res, next)=>{
    let{statuscode = 500,message = "something went wrong"} = err;
   res.status(statuscode).send(message);
})



