const mongoose = require("mongoose")
const Schema= mongoose.Schema

const listingSchema= new Schema({

title:{ 
    
    
    type:String,
    required:true,


},

description: String,
image: {
type:String,
default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F91%2F198191-050-D2791AFC%2FParkour-athlete-jumping-walls.jpg&tbnid=RNWm5LW9purwZM&vet=12ahUKEwjEvN7_1beEAxUuQWwGHez-DM0QMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fsports%2Fparkour&docid=kbB_mpiZWqctFM&w=1600&h=1105&q=parkour&ved=2ahUKEwjEvN7_1beEAxUuQWwGHez-DM0QMygAegQIARB0",
set:(v)=> v===""?"https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F91%2F198191-050-D2791AFC%2FParkour-athlete-jumping-walls.jpg&tbnid=RNWm5LW9purwZM&vet=12ahUKEwjEvN7_1beEAxUuQWwGHez-DM0QMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fsports%2Fparkour&docid=kbB_mpiZWqctFM&w=1600&h=1105&q=parkour&ved=2ahUKEwjEvN7_1beEAxUuQWwGHez-DM0QMygAegQIARB0"
: v
},
price: Number,
location:String,
country: String,


});

const listing = mongoose.model("listing",listingSchema)

module.exports = listing;