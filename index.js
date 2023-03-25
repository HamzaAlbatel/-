import express from 'express';
import mongoose from 'mongoose';
import actions from './controls/actions.js';
import dotenv from 'dotenv';
import dasda from 'stream';



const app = express();
//USE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', actions)
const port=3001;

const mongo_URL="mongodb+srv://albatlhamza:PU7d0ahyqDCNUqlv@cluster0.1hfkoml.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongo_URL)
.then(results => {
    console.log(results);
    app.listen(port,function(){
        console.log(`server is running by port: ${port}`);
    })
})
.catch(eror => {
    console.log(eror.message)
})

 
