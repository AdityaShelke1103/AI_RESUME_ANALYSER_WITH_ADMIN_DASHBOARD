// // password: VZ9vTsygqb27SlTY
// // username: adityashelke516_db_user
// mongodb+srv://adityashelke516_db_user:VZ9vTsygqb27SlTY@cluster0.uurou0c.mongodb.net/?appName=Cluster0
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL).then((res) => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Database not connected");
    console.log(err);
});