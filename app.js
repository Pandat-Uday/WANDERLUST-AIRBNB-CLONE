const express = require("express");
const app = express();

const mongoose = require("mongoose");

const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require('method-override');
const ejsMate= require("ejs-mate")

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



//index route

app.get("/listings",async(req,res)=>{

    const alllisting = await listing.find({});
    res.render("listings/index.ejs",{alllisting});

    })


//new route

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
    
})






//show route

app.get("/listings/:id", async(req,res)=>{

    let{id} = req.params;
   const Listing = await listing.findById(id)
   res.render("listings/show.ejs",{Listing})


})

//create route

app.post("/listings",async(req,res)=>{
    const newlisting = new listing(req.body.listing);

    await newlisting.save();
    res.redirect("/listings");

})

//edit route

app.get("/listings/:id/edit",async(req,res)=>{
    
    let{id} = req.params;
   const Listing = await listing.findById(id);
   res.render("listings/edit.ejs",{Listing})

})

//update route

app.put("/listings/:id",async(req,res)=>{
    let{id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings")
})


//DELETE ROUTE

app.delete("/listIngs/:id",async(req,res)=>{
    let {id} = req.params;
let deletelist= await listing.findByIdAndDelete(id)
console.log(deletelist)
res.redirect("/listings")


})

