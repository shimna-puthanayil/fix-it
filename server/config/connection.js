const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fix-it");
// mongoose.connect(
//   "mongodb+srv://mongo-quirky:mongo-admin@cluster.4vmspcj.mongodb.net/fix-it?retryWrites=true&w=majority"
// );
module.exports = mongoose.connection;
