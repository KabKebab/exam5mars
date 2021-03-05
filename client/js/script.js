let myListe = document.querySelector('#myListe');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/pages/details.html#0';
});
let myHeaders = new Headers();
let opt = {
method: 'GET',
headers: myHeaders,
mode: 'cors',
cache: 'default'
};

fetch('/api/animal', opt)
.then((res) => {
    return res.json();
})
.then((response) => {
    response.forEach(elt => {
    newLine(elt);
    });
})
.catch((err) => {
    console.log('Error : ' + err);
})

function newLine(tmp) {
    let line = document.createElement('tr');
    line.innerHTML = `
      <td>${tmp._id}</td>
      <td>${tmp.nom}</td>
      <td>${tmp.espece}</td>
      <td>${tmp.couleur}</td>
      <td>${tmp.age}</td>
      <td><a href="details.html#${tmp._id}">Détails</a></td>
      <td><button class="btn btn-outline-danger" id="del${tmp._id}"> S </button></td>
    `;
    myListe.appendChild(line);
  
    let btnSupr = document.querySelector('#del' + tmp._id);
    btnSupr.addEventListener('click', () => {
      console.log('prout')
      deleteMovie(tmp._id);
    });
  }