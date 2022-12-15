const fs = require("fs")   // native node modules to manipulate filesystem
const { join } = require("path")   // also native node module

/* To manipulate FS db*/
const filePath = join(__dirname, "../", "usersDB.json")

// To get the list of users into Data Base (json file simulate)
const getUsers = () => {
    const data = fs.existsSync(filePath) 
        ? fs.readFileSync(filePath) 
        :[];
    
    try{
        return JSON.parse(data)
    } catch (err){
        return []
    }
}

// To write in Data Base (json file simulate).
const saveUser = (userData) => {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, "\t"))
}


/* Express route*/

const usersRoutes = (app) => {
    app.route("/user/:id?")
    .get((req, res) => {
        console.log("http method GET Sended!")
        const users = getUsers()
        res.send({ users })
        
    })
    .post((req, res) => {
        console.log("http method POST Sended!")
        const users = getUsers()
        
        users.push(req.body)
        saveUser(users)       // Write in "DB"
        res.status(201).send(`User created: ${JSON.stringify(req.body.nome)}`)
        
    })
    .put((req, res) => {
        console.log("http method PUT Sended!")
        const users = getUsers()
        const user = users.map( user => {
            if(user.id === req.params.id){
                // Here that going to do updating of the user
                return {
                    ...user,
                    ...req.body
                }
            }
            return user
        })
        saveUser(user)
        res.status(201).send("User updated!")
    })
    .delete((req, res) => {
        console.log("http method DELETE Sended!")
        const users = getUsers()
        const usersRemainder = users.filter(user => {
           return user.id !== req.params.id
        })
        saveUser(usersRemainder)
        res.status(200).send("User deleted!")
    })
}


module.exports = usersRoutes;