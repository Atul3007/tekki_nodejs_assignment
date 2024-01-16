const express = require('express');
const { router } = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const { connection } = require("./config/db");

const app = express();
app.use(express.json());

require('dotenv').config()
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Welcome!!!")
})

app.use('/api',router);
app.use('/api/blog',blogRoutes)

app.listen(PORT, async () => {
    try {
      await connection;
      console.log("Connected to db");
    } catch (error) {
      console.log("Error occurred");
    }
    console.log(`Running on ${PORT}`);
  });