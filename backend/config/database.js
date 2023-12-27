const mongoose = require('mongoose');

exports.connectDatabase = async() => {
   await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000,
   })
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
}