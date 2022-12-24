const { estados }  = require("../data/estados-cidades.json");

const consultRoute = (app) => {
    app.route("/states/:uf?")
    .get((req, res) => {
        if(!req.params.uf){
            const siglas = estados.map(item => item.sigla)
            res.status(200).send(siglas)
        }

        try{
            const UF =req.params.uf
            const { nome, cidades } = estados.find(uf => uf.sigla === UF.toUpperCase())
            res.status(200).send({nome, cidades})
        } catch(err){
            res.status(400).send({stc: "400", UF: "Not Found"})
        }
    })
}

module.exports = consultRoute;