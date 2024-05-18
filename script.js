/* Reset des styles par défaut */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Styles généraux */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    background-color: rgba(255, 255, 255, 0.2);
    flex-wrap: nowrap;
    position: fixed;
    width: 100%; /* Assure que le header prend toute la largeur de la fenêtre */
    top: 0; /* Positionne le header en haut de la fenêtre */
}

.hidden {
    transform: translateY(-200%);
    transition: transform 0.3s ease;
}


/* Styles pour les éléments du header */
.categorie,
.connexion {
    display: flex; /* Utilisez flexbox pour les éléments */
    align-items: center; /* Aligne les éléments verticalement */
}

header > div {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto; /* Permet aux éléments de s'adapter en fonction de leur contenu */
    align-items: center;
}

/* Configuration de la section catégorie */
.categorie {
    display: flex; /* Utilise Flexbox pour aligner les éléments */
    align-items: center; /* Aligne les éléments verticalement */
    flex: 1; /* Permet à la section de s'étendre si nécessaire */
}

.categorie ul {
    list-style: none;
    display: flex;
    gap: 0px;
}

.categorie ul li {
    margin-right: 5px;
}

.categorie ul li a {
    border: 3px solid transparent; 
    text-decoration: none;
    color: #333;
    height: 50px; /* Hauteur de l'élément égale à 100% de la hauteur du parent (header) */
    display: flex; /* Utilisez flex pour aligner le texte et la bordure */
    align-items: center; /* Aligne le texte verticalement au centre */
    padding: 0 10px; /* Ajustez les marges intérieures */
}

.categorie ul li a:hover {
    background-color: #e5d8f0; /* Changez la couleur de fond du rectangle sur hover */
    color: #333; /* Couleur de texte sur hover */
    border: none; /* Vous pouvez changer la couleur de la bordure sur hover */
}


.logo img {
    width: 100%; /* La largeur de l'image s'ajuste à la taille de l'écran */
    max-width: 130px; /* Largeur maximale de l'image */
    height: auto; /* Maintient les proportions de l'image */
    position: absolute;
    left: 46%; /* Positionne le logo au milieu de l'en-tête */
    transform: translateX(-50%); /* Décale le logo pour le centrer */
    top: -15px;
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
}
.logo img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.logo :hover img {
	-webkit-transform: scale(1.3);
	transform: scale(1.3);
}

.connexion {
    display: flex; /* Utilise Flexbox pour aligner les éléments */
    align-items: center; /* Aligne les éléments verticalement */
    flex: 1; /* Permet à la section de s'étendre si nécessaire */
    justify-content: flex-end; /* Place les éléments à droite */
}


.connexion a {
    text-decoration: none;
    color: #333;
    border: 1px solid #333;
    padding: 5px 10px;
    margin-left: 10px;
}

.connexion a:hover {
    background-color: #e5d8f0; /* Changez la couleur de fond sur hover */
    color: #333; /* Changez la couleur du texte sur hover */
    border-color: #666; /* Changez la couleur de la bordure sur hover */
}


.backgr {
    background-image: url('Backgroundraw.png');
    background-size: cover; /* Ajuste l'image pour couvrir l'ensemble de l'écran */
    margin: 0; /* Retire les marges par défaut */
}


  

/* Configuration de la section d'accueil */
#accueil {
    display: flex; /* Active flexbox pour la section */
    justify-content: center; /* Centre horizontalement le contenu */
    align-items: center; /* Centre verticalement le contenu */
    text-align: center; /* Centre le texte */
    height: 100vh; /* Utilise toute la hauteur de la fenêtre pour l'accueil */
}


.title-word {
    animation: color-animation 4s linear infinite;
  }
  
  .title-word-1 {
    --color-1: #DF8453;
    --color-2: #3D8DAE;
    --color-3: #E4A9A8;
  }
  
  .title-word-2 {
    --color-1: #DBAD4A;
    --color-2: #ACCFCB;
    --color-3: #17494D;
  }
  
  .title-word-3 {
    --color-1: #ACCFCB;
    --color-2: #E4A9A8;
    --color-3: #ACCFCB;
  }
  
  .title-word-4 {
    --color-1: #3D8DAE;
    --color-2: #DF8453;
    --color-3: #E4A9A8;
  }
  
  @keyframes color-animation {
    0%    {color: var(--color-1)}
    32%   {color: var(--color-1)}
    33%   {color: var(--color-2)}
    65%   {color: var(--color-2)}
    66%   {color: var(--color-3)}
    99%   {color: var(--color-3)}
    100%  {color: var(--color-1)}
  }
  
  /* Here are just some visual styles. 🖌 */
  
  .container {
    display: grid;
    place-items: center;  
    text-align: center;
  }
  
  .title {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 40px;
    text-transform: uppercase;
  }


#accueil h2{
    text-shadow: 0.1em 0.1em 0.2em rgb(71, 68, 68);
}

#accueil p {
    font-family: "Pacifico", cursive;
    font-size: 25px;
    margin-bottom: 20px;
    font-weight: 250;
}

.cta-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #ff6b6b;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;

}


.cta-button:hover {
    background-color: #e74c3c;
}

.container {
    scroll-snap-type: y mandatory;
}

section{
    height: 100vh;
    scroll-snap-align: start;
}

#intro {
    background-color: rgb(123, 144, 144);
    height: 100vh;
    background-image: url('section2.png');
    background-size: cover;
    margin: 0;
    display: flex;
    flex-direction: column; /* Pour aligner le contenu verticalement */
    align-items: center; /* Pour centrer le contenu horizontalement */
    justify-content: center; /* Pour centrer le contenu verticalement */
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-left: 150px;
}

.features, .images {
    flex: 1; /* Assure que les deux parties prennent de l'espace égal */
    padding: 20px;
    margin: 120px;
    font-size: 22px;
}

#userImage {
    transition: opacity 0.5s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}


#boutons {
    display: inline-flex;
    gap: 3px;
}




/* Configuration du footer */
footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    margin-top: auto; /* Pousse le footer vers le bas */
    width: 100%;
    opacity: 0.8;
}

.form {
    padding: 20px; /* Internal padding */
    background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Slight shadow */
    text-align: center;
    margin: auto; /* Center the form within the container */
    
}

.partie {
    margin-bottom: 20px; /* Ajout d'un espacement entre les parties */
}

label {
    display: block; /* Affichage en bloc pour les labels */
    margin-bottom: 5px; /* Espacement inférieur pour les labels */
}

input[type="text"],
input[type="number"],
select,
input[type="date"] {
    width: 100%; /* Remplissage complet du contenant */
    padding: 8px; /* Espacement interne */
    border-radius: 5px; /* Ajout de courbure aux coins */
    border: 1px solid #ccc; /* Bordure légère */
}

button[type="submit"] {
    width: 100%; /* Remplissage complet du contenant */
    padding: 10px; /* Espacement interne */
    background-color: #333; /* Couleur de fond */
    color: #fff; /* Couleur du texte */
    border: none; /* Suppression de la bordure */
    border-radius: 5px; /* Ajout de courbure aux coins */
    cursor: pointer; /* Curseur adapté */
}

button[type="submit"]:hover {
    background-color: #555; /* Changement de couleur de fond au survol */
}

.partie {
    position: relative;
}

.partie textarea {
    height: 150px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    resize: vertical; /* Permet à l'utilisateur de redimensionner verticalement */
}

.partie textarea::placeholder {
    color: #999; /* Couleur du texte de l'indication de saisie */
}

.caracteres {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: #888;
    font-size: 12px;
}

/* Dans votre fichier CSS (inscription.css) */

.selected-photo {
    max-width: 100%; /* Pour que les images ne dépassent pas la largeur du cadre */
    max-height: 100px; /* Définir la hauteur maximale des images */
    margin-bottom: 10px; /* Ajouter un espacement entre les images */
}


input[type="text"],
input[type="password"] {
    padding: 10px; /* Espacement interne */
    font-size: 16px; /* Taille de la police */
    border: 1px solid #ccc; /* Bordure grise */
    border-radius: 5px; /* Coins arrondis */
    box-sizing: border-box; /* Inclure le padding et la bordure dans la largeur */
    width: 100%; /* Largeur de 100% du conteneur parent */
    margin-bottom: 10px; /* Espacement entre les champs de saisie */
}


.overlay-active {
    overflow: hidden; /* Empêche le défilement de la page */
}

.overlay-active::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Couleur de l'overlay */ 
}

.partie {
    position: relative;
}

.partie textarea {
    height: 150px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    resize: vertical; /* Permet à l'utilisateur de redimensionner verticalement */
}

.partie textarea::placeholder {
    color: #999; /* Couleur du texte de l'indication de saisie */
}


#connexionform {
    position: fixed;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Assure que le formulaire est au-dessus de l'overlay */
}
