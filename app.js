const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const app = express()

var list = {
    elementos: []
};
//list.elementos.push({descripcion:'Demostración'});

app.engine('html', mustacheExpress());
//app.set('view engine', 'html');
//app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(express.static(__dirname + '/wwwroot'))

app.get('/', function (req, res) {
    //res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    //res.setHeader('Clase', 'UCP');
    res.render("agus.html", list)
})

app.post('/', function (req, res) {
    var largo = list.elementos.length;
 //  list.elementos.splice({descripcion:req.body.descripcion}, 0);
    if(req.body.descripcion == "eliminar"){
        list.elementos.splice(req.body.posicion,1);
        for(var i=0; i<list.elementos.length; i++){
            list.elementos[i].posicion = i;
        }
    }
    if(req.body.descripcion == "subir" && req.body.posicion >0){
        var aux = list.elementos[req.body.posicion].descripcion;
        list.elementos[req.body.posicion].descripcion = list.elementos[req.body.posicion-1].descripcion ; 
        list.elementos[req.body.posicion-1].descripcion = aux;
        for(var i=0; i<list.elementos.length; i++){
            list.elementos[i].posicion = i;
        }
    }
    if(req.body.descripcion == "bajar" ){

        var aux2 = list.elementos[req.body.posicion+1].descripcion;
        list.elementos[req.body.posicion+1].descripcion = list.elementos[req.body.posicion].descripcion ; 
        list.elementos[req.body.posicion].descripcion = aux2;
        for(var i=0; i<list.elementos.length; i++){
            list.elementos[i].posicion = i;
        }
    }
    if(req.body.descripcion == "darVuelta"){
        list.elementos.reverse();
        for(var i=0; i<list.elementos.length; i++){
            list.elementos[i].posicion = i;
        }
    }
    if(req.body.descripcion != "eliminar" && req.body.descripcion != "subir" && req.body.descripcion != "bajar" && req.body.descripcion != "darVuelta"){
        list.elementos.push({descripcion:req.body.descripcion, posicion:list.elementos.length});

    }
    res.render("agus.html", list)
})


/*app.delete('/',function(req,res){

    list.elementos.splice(2,0);
    res.render("agus.html", list);
});
*/
app.listen(3000);