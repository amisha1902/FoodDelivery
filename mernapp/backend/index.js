const express =require('express')
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app =express()
const port = 5000
const mongoDB =require("./db")
mongoDB();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: 'POST', // Specify the allowed HTTP methods
        credentials: true, // Enable credentials (cookies, authorization headers, etc.)
      }
));
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.get('/', (req, res) =>
{
    res.send('hello world!')
}
)
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})