const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/we_cart?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.10.0/";


const dbConnect = () => {
  mongoose.connect(URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}


module.exports = dbConnect

