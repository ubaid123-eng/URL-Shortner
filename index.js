const express =  require('express');
const mongoodb = require('./config/db');
const urlroutes = require('./routes/urlShort');

require('dotenv').config();
const app = express();

app.use(express.json());
mongoodb.connectMongooDb();

app.get('/' , (req , res) => {
    res.status(200).json({message: 'url shortner api runnig....'})
});


app.use('/api/urlshortner' , urlroutes);



const port = process.env.PORT;
app.listen(port , ()=> {
    console.log(`server is lisenting at port ${port}`)
})