window.addEventListener('load', () => {
  buttonInit();
})

var buttonEnvoyer = document.querySelector('.buttonEnvoyer')
var buttonReset = document.querySelector('.buttonReset')

async function buttonInit(){
  setNbMystere();

  buttonEnvoyer.addEventListener('click', () => {
    setEssai();
  })

  buttonReset.addEventListener('click', () => {
    setNbMystere({'nombre' : 0})
  })
}

////////////////////////////////////////////////////////////////////////////

  // le joueur fait son essai
  async function setEssai(){
    let essai = document.getElementById('essai').value;
    let nbMystere = 0;
    //TODO: test validité type variable

    // récupération du nombre mystere dans la bdd
    let response = await fetch('http://localhost/ajax/php/php.php?action=setEssai')
    if(response.ok){
      let data = await response.json()
      nbMystere = (data.nbMystere);
    }

    // incrémentation du nombre de coup
    let response2 = await fetch('http://localhost/ajax/php/php.php?action=setNbCoup')
    if(response2.ok) {
      let data2 = await response2.json()
      console.log("d2: " + data2.nbCoup)
      var nbCoup = data2.nbCoup;
    }

    // affichage du résultat
    if (essai < nbMystere) {document.getElementById('resultat').innerHTML = "essai " + nbCoup +  ": Trop petit"}
    if (essai > nbMystere) {document.getElementById('resultat').innerHTML =  "essai " + nbCoup +  ": Trop grand"}
    if (essai == nbMystere) {document.getElementById('resultat').innerHTML = "essai " + nbCoup +  ": Gagné !!!"}
  }


  //////////////////////////////////////////////////////////////////////////

  // initialisation du nombre mystere et de l'affichage
  async function setNbMystere(){
    document.getElementById('essai').value="";
    document.getElementById('resultat').innerHTML = "";

    // générateur aléatoire [1-100]
    let data = {nbMystere: Math.floor((Math.random() * 100) + 1)};
    let request = new Request('http://localhost/ajax/php/php.php?action=setNbMystere', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    await fetch(request)
  }







///////////////////////////  poubelle   ///////////////////////////////////////////

// function buttonLikeAffichageUpdate(nombre){
//   let textAffichage
//   if(nombre < 2){textAffichage = ' Like'}
//   else{textAffichage = ' Likes'}

//   buttonLike.innerHTML = nombre + textAffichage
// }

// function initNbMystere() {
//   Math.floor((Math.random() * 100) + 1);
// }



// async function maFonctionRecursive(){

//   let response = await fetch('http://localhost/ajax2/php/php.php')
//   if(response.ok){
//     let data = await response.json()
//     buttonLike.innerHTML = data.nombre + ' Likes';
//     console.log(data)
//   }

//   setTimeout(() => {
//     maFonctionRecursive()
//   }, 2000)
// }

