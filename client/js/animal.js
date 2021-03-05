module.exports.Animal = class Animal{
    constructor(espece, nom, couleur ="-", age = 0){
        this.espece = espece;
        this.couleur = couleur;
        this.nom = nom;
        this.age = age;
    }

    getEspece(){
        return this.espece;
    }
    getCouleur(){
        return this.couleur;
    }
    getNom(){
        return this.nom;
    }
    getAge(){
        return this.age;
    }
    setEspece(val){
        this.espece = val;
    }
    setCouleur(val){
        this.couleur = val;
    }
    setNom(val){
        this.nom = val;
    }
    setAge(val){
        this.age = val;
    }

    toJson(){
        return {
            espece: this.espece,
            couleur: this.couleur,
            nom: this.nom,
            age: this.age
        }
    }
};