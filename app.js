const express = require("express");
const app = express();

const mongoose = require("mongoose");

const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require('method-override');
const ejsMate= require("ejs-mate");
const wrapasync = require("./utils/wrapasync.js");
const ExpressError = require("./utils/expresserr.js")
const session = require("express-session")
const flash = require("connect-flash")
const { listingSchema,reviewSchema}= require("./schema.js")
const Review = require("./models/review.js");
const reviews= require("./router/review.js");
const passport = require ("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js")


const listings = require("./router/listing.js")

const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const sessionOptions={

secret : "mysupersecretcode",
resave : false,
saveUninitialized : true,
cookies:{

    expires: Date.now()+7*24*60*60*1000,
    maxage: 7*24*60*1000,
    httpOnly:true

}


}

app.get("/",(req,res)=>{
    res.send("hey,server is working")
})



app.use(session(sessionOptions));
app.use(flash())




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





app.use((req,res,next)=>{

// res.locals.succes = req.flash("success");
// next();

res.locals.success = req.flash("success");


})





app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)




 
 

 





app.all("*",(req,res,next)=>{

    next (new ExpressError(404,"page not found!"));
})



app.use((err, req, res, next)=>{
    let{statuscode = 500,message = "something went wrong"} = err;
   res.status(statuscode).send(message);
})



