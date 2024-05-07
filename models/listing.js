const mongoose = require("mongoose");
const review = require("./review");
const Schema= mongoose.Schema
const Review = require("./review.js")

const listingSchema= new Schema({



title:{ 
    
    
    type:String,
    required:true,


},

description: String,
image: {
type:String,
default: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZSwgbGlnaHRzLGRlY29yfHx8fHx8MTcxNDU0NTUyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
set:(v)=> v===""?"https://images.unsplash.com/photo-1527359443443-84a48aec73d2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZSwgbGlnaHRzLGRlY29yfHx8fHx8MTcxNDU0NTUyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
: v
},
price: Number,
location:String,
country: String,

reviews:[


{

type:Schema.Types.ObjectId,
ref: "Review"


},


],


});


listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
await Review.deleteMany({_id: {$in: listing.reviews}});


}

})
const listing = mongoose.model("listing",listingSchema)

module.exports = listing;