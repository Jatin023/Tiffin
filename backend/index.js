require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDb=require('./src/config/db');

const app=express();
app.use(cors());

app.use(express.json());
connectDb();

app.use('/api/auth',require('./src/routes/routes'));

const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
