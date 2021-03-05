const express = require('express');
const bodyParser = require('body-parser');
const { Animal } = require('./client/js/animal');
var sessionStorage = require('sessionstorage');

let app = express();
//initialisation du storage
if(!sessionStorage.getItem('animaux')){
    populate();
}
//écoute sur le port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });

app.use('/pages', express.static('./client/pages'));
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
//infos de tous
app.get('/api/animal', (req, res) => {
    let anims = sessionStorage.getItem('animaux');
    let liste = "{";
    anims.forEach(ani => {
        liste += JSON.stringify(ani.toJson())+",";
    });
    liste = liste.substring(0, liste.length-1);
    liste += "}";
    return res.send(liste);
  });
//infos d'1 animal
app.get('/api/animal/:id', (req, res) => {
    if(req.params.id > 0){
        let anims = sessionStorage.getItem('animaux');
        return res.send(JSON.stringify(anims[req.params.id - 1].toJson()));
    }
    else{
        return res.send(500);
    }
});
//création
app.post('/api/animal/:id', (req, res) => {
    let anims = sessionStorage.getItem('animaux');
    let bod = req.body;
    anims.push(new Animal(bod.espece,bod.nom,bod.couleur,bod.age));
    sessionStorage.setItem('animaux', anims);

});

function populate(){
    sessionStorage.setItem('animaux', [new Animal('Chat', 'Merlin', 'Roux', 3), new Animal('Vache', 'Marquerette', 'Brune', 7), new Animal('Zèbre à lunettes', 'Raoul', 'Noir et blanc', 4)]);
}