import  express  from "express";
import route from "./Router/Router";
import sequelize from "./config/db";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api',route);

sequelize.sync();

const PORT = process.env.port || 2500;

app.listen(PORT,()=>{
    console.log(`Server is Running on port : ${PORT}`)
})
