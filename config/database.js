const mongoose = required("mongoose");
const config = required( "./config")

const MONGOOS_URL = config.MONGODB_URL

exports.connect = () => {
    mongoose.connect(MONGOOS_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB CONNECTED with a success"))
    .catch((error) => {
        console.log("DB connection failed ");
        console.log(error);
        process.exit(1)
    })
}