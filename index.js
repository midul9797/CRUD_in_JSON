const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/users.routes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.use("/user", userRoutes);


app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});

process.on("uunhandleRejection",(error)=>{
    console.log(error.name, error.message);
    app.close(()=>{
        process,exit(1);
    })
})


