const express = require("express")
//const bodyParser = require("body-parser")    // also native node module

const PORT = process.env.PORT ||  5000
const userRoutes = require("./routes/userRoutes")

const app = express();  //instance os Express


app.use(express.urlencoded({extended: false}))
app.use(express.json())
//app.use(bodyParser.urlencoded({extended : false}))

app.get('/', (req, res) => {
    console.log("Home was accessed!!!")
    return res.send('Home page!')
})

userRoutes(app)

// puting server on runtime
app.listen(PORT, () => {
    console.log(`Node server is running in port: ${PORT}`)
})
