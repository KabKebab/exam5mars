let nom = document.querySelector('#nom');
let couleur = document.querySelector('#couleur');
let espece = document.querySelector('#espece');
let age = document.querySelector('#age');
let btn = document.querySelector('#btn');

let url = window.location;
//identifiant récupéré dans l'adresse, sert à retrouver le bon animal en cas d'édition
let id = url.hash.substring(1);

let myHeaders = new Headers();
let sendMethod;
//Si l'id est de 0, c'est une création
if(id != 0){
    sendMethod = 'PUT';
    let opt = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
    };

    fetch(`/api/animal/${id}`, opt)
    .then((res) => {
        return res.json();
    })
    .then((response) => {
        nom.value = response.nom;
        couleur.value = response.couleur;
        espece.value = response.espece;
        age.value = response.age;
    })
    .catch((err) => {
        console.log('Error : ' + err);
    })
}
else{
    sendMethod = 'POST';
    nom.value = "";
    couleur.value = "";
    espece.value = "";
    age.value = 0;
}


//bouton enregistrer  
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let tmp = {
        espece: espece.value,
        nom: nom.value,
        couleur: couleur.value,
        age: age.value
    };

    let opt = {
        method: sendMethod,
        body: JSON.stringify(tmp),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    }
    //Marche pas
    fetch(`/api/animal/${id}`, opt)
        .then((res) => {
        return res.json();
        })
        .then((response) => {
        window.location.href = '/pages/animaux.html';
        })
        .catch((res) => {
        console.log(res);
    })
})