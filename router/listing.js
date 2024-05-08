const express = require("express");
 const router = express.Router();
 const wrapasync = require("../utils/wrapasync.js");
 const ExpressError = require("../utils/expresserr.js")
 const { listingSchema,reviewSchema}= require("../schema.js")
 const listing = require("../models/listing.js")



 
const validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.error);
    if (error) {

        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error)
    } else {
        next();
    }

}




//index route

router.get("/",wrapasync (async(req,res)=>{

    const alllisting = await listing.find({});
    res.render("listings/index.ejs",{alllisting});

    }))


//new route

router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
    
})



//show route

router.get("/:id", wrapasync(async (req, res) => {

    let { id } = req.params;
    const Listing = await listing.findById(id).populate("reviews")
    res.render("listings/show.ejs", { Listing })

}))

//create route

router.post("/",validateListing,wrapasync (async(req,res,next)=>{
   
    
   let result = listingSchema.validate(req.error);
   console.log(result);
   if(result.error){

    throw new ExpressError(400,result.error)
   }

const newlisting = new Listing(req.body.listing);




   await newlisting.save();
   res.redirect("/listings");

   
}))

//edit route

router.get("/:id/edit",wrapasync(async(req,res)=>{
    
    let{id} = req.params;
   const Listing = await listing.findById(id);
   res.render("listings/edit.ejs",{Listing})

}))

//update route

router.put("/:id",validateListing,wrapasync(async(req,res)=>{
    let{id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings")
}))


//DELETE ROUTE

router.delete("/listings/:id",wrapasync (async(req,res)=>{
    let {id} = req.params;
let deletelist= await listing.findByIdAndDelete(id)
console.log(deletelist)
res.redirect("/listings")


}))


module.exports = router;