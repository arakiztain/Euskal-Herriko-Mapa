import { express } from "./express";

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.post("/", (req,res)=>{
    res.send("Hello Post!");
})

app.listen(3000, ()=> {
    console.log("conectado al puerto 300")
})
