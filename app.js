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



const validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.error);
    if (error) {

        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error)
    } else {
        next();
    }

}






const validateReview = (req, res, next) => {

    let { error } = reviewSchema.validate(req.error);
    if (error) {

        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error)
    } else {
        next();
    }
}






// const validateListing = (req,res,next)=>{
    
//    let {error} = listingSchema.validate(req.error);
//    console.log(result);
//    if(error){

//     let errMsg = error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errMsg)
//    }else{
//     next();
//    }




// }






// const validateReview = (req,res,next)=>{
    
//     let {error} = reviewSchema.validate(req.error);
//     console.log(result);
//     if(error){
 
//      let errMsg = error.details.map((el)=>el.message).join(",");
//      throw new ExpressError(400,errMsg)
//     }else{
//      next();
//     }
 
 
 
 
//  }
 
 


//index route

app.get("/listings",wrapasync (async(req,res)=>{

    const alllisting = await listing.find({});
    res.render("listings/index.ejs",{alllisting});

    }))


//new route

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
    
})







//show route
//show route

app.get("/listings/:id", wrapasync(async (req, res) => {

    let { id } = req.params;
    const Listing = await listing.findById(id).populate("reviews")
    res.render("listings/show.ejs", { Listing })

}))

//create route

app.post("/listings",validateListing,wrapasync (async(req,res,next)=>{
   
    
   let result = listingSchema.validate(req.error);
   console.log(result);
   if(result.error){

    throw new ExpressError(400,result.error)
   }

const newlisting = new Listing(req.body.listing);




   await newlisting.save();
   res.redirect("/listings");

   
   
   
   
   
   
   
    // try{
    // const newlisting = new listing(req.body.listing);

    // await newlisting.save();
    // res.redirect("/listings");
    // }
    // catch(err){
    //     next(err); 
           
    // }
}))

//edit route

app.get("/listings/:id/edit",wrapasync(async(req,res)=>{
    
    let{id} = req.params;
   const Listing = await listing.findById(id);
   res.render("listings/edit.ejs",{Listing})

}))

//update route

app.put("/listings/:id",validateListing,wrapasync(async(req,res)=>{
    let{id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings")
}))


//DELETE ROUTE

app.delete("/listIngs/:id",wrapasync (async(req,res)=>{
    let {id} = req.params;
let deletelist= await listing.findByIdAndDelete(id)
console.log(deletelist)
res.redirect("/listings")


}))

//review/post route

app.post("/listings/:id/review",validateReview,wrapasync(async(req,res)=>{

let Listing = await listing.findById(req.params.id);
let newReview = new Review(req.body.review);



Listing.reviews.push(newReview);

await newReview.save();
await Listing.save();


console.log("new review saved");


res.redirect(`/listings/${Listing._id}`)

}));


//DELETE REVIEW ROUTE

app.delete("/listing/:id/reviews/:reviewId",wrapasync(async(req,res)=>{

let{id,reviewId} =req.params;

await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await Review.findByIdAndDelete(reviewId);

res.redirect(`/listings/${id}`)






})






)






app.all("*",(req,res,next)=>{

    next (new ExpressError(404,"page not found!"));
})



app.use((err, req, res, next)=>{
    let{statuscode = 500,message = "something went wrong"} = err;
   res.status(statuscode).send(message);
})



