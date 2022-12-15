const express = require("express")
//const bodyParser = require("body-parser")    // also native node module

const userRoutes = require("./routes/userRoutes")

const app = express();  //instance os Express
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
//app.use(bodyParser.urlencoded({extended : false}))

app.get('/', (req, res) => {
    console.log("Home was accessed!!!")
    return res.send('Home page!')
})

userRoutes(app)

// puting server on runtime
app.listen(port, () => {
    console.log(`Node server is running in port: ${port}`)
})
function (){

}

const hp = require("http")
hp.
