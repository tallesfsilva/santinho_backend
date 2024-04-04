import mongoose from 'mongoose';
import { AppError } from "@shared/errors/AppError";



var mongoDB = null
var db_url = 'mongodb+srv://'+process.env.DB_CREDENTIALS+'@cluster0.8nnex.azure.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority';
mongoose.connect(db_url).then(() => {
    mongoDB = mongoose.connection;
    console.log("MongoDB connected")
}).catch((error) => {
    throw new AppError(error);
});

 

export{mongoDB}
 