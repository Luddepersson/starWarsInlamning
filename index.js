class Character {
  constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.movies = movies;
    this.pictureUrl = pictureUrl;
  }
}

const API_URL = "https://swapi.dev/api/people/";

async function getCharacterData(name) {
  const response = await fetch(API_URL + `?search=${name}`);
  const data = await response.json();
  const character = data.results[0];
  return character;
}

let character1;
let character2;


async function createCharacters() {
  const characterName1 = document.getElementById("character1").value;
  const characterName2 = document.getElementById("character2").value;

  
  const character1Data = await getCharacterData(characterName1);
  const character2Data = await getCharacterData(characterName2);
  
  character1 = new Character(
    character1Data.name,
    character1Data.gender,
    character1Data.height,
    character1Data.mass,
    character1Data.hair_color,
    character1Data.skin_color,
    character1Data.eye_color,
    character1Data.films,
    `img/${character1Data.name}.jpg`
  );
  
  character2 = new Character(
    character2Data.name,
    character2Data.gender,
    character2Data.height,
    character2Data.mass,
    character2Data.hair_color,
    character2Data.skin_color,
    character2Data.eye_color,
    character2Data.films,
    `img/${character2Data.name}.jpg`
  );

  const charactersContainer = document.getElementById("characters");
  const character1Elem = createCharacterElement(character1);
  const character2Elem = createCharacterElement(character2);

  charactersContainer.innerHTML = "";
  charactersContainer.appendChild(character1Elem);
  charactersContainer.appendChild(character2Elem); 
  
  compare(character1, character2); 

}

function createCharacterElement(character) {
  const characterElem = document.createElement("div");

  const nameElem = document.createElement("h2");
  nameElem.innerText = character.name;
  characterElem.appendChild(nameElem);

  const imgElem = document.createElement("img");
  imgElem.src = character.pictureUrl;
  characterElem.appendChild(imgElem);

  const hairElem = document.createElement("p");
  hairElem.innerText = `Hair color: ${character.hairColor}`;
  characterElem.appendChild(hairElem);

  const heightElem = document.createElement("p");
  heightElem.innerText = `Height: ${character.height} cm`;
  characterElem.appendChild(heightElem);

  const weightElem = document.createElement("p");
  weightElem.innerText = `Weight: ${character.mass} kg`;
  characterElem.appendChild(weightElem);

  const genderElem = document.createElement("p");
  genderElem.innerText = `Gender: ${character.gender}`;
  characterElem.appendChild(genderElem);

  const skinElem = document.createElement("p");
  skinElem.innerText = `Skin color: ${character.skinColor}`;
  characterElem.appendChild(skinElem);

  const eyeElem = document.createElement("p");
  eyeElem.innerText = `Eye color: ${character.eyeColor}`;
  characterElem.appendChild(eyeElem);

  const moviesElem = document.createElement("p");
  moviesElem.innerText = `Number of movies: ${character.movies.length}`;
  characterElem.appendChild(moviesElem);

  return characterElem;
}

function compare(character1, character2) {
  let height = document.querySelector(".height");
  let mass = document.querySelector(".mass");
  let movies = document.querySelector(".movies");
  let gender = document.querySelector(".gender");
  let haircolor = document.querySelector(".haircolor");
  let skincolor = document.querySelector(".skincolor");
  
  if (!character1 || !character2) {
    
    return;
  }

  character1.mass = parseInt(character1.mass);
  character2.mass = parseInt(character2.mass);

  if (character1.height > character2.height) {
    height.innerHTML = `${character1.name} is taller than ${character2.name}`;
  } else if (character2.height > character1.height) {
    height.innerHTML = `${character2.name} is taller than ${character1.name}`;
  } else {
    height.innerHTML = `${character1.name} and ${character2.name} are the same height`;
  }

  if (character1.mass > character2.mass) {
    mass.innerHTML = `${character1.name} is heavier than ${character2.name}`;
  } else if (character2.mass > character1.mass) {
    mass.innerHTML =`${character2.name} is heavier than ${character1.name}`;
  } else {
    mass.innerHTML =`${character1.name} and ${character2.name} weigh the same`;
  }

  if (character1.movies.length > character2.movies.length) {
    movies.innerHTML = `${character1.name} has been in more movies than ${character2.name}`;
  } else if (character2.movies.length > character1.movies.length) {
    movies.innerHTML = `${character2.name} has been in more movies than ${character1.name}`;
  } else {
    movies.innerHTML =`${character1.name} and ${character2.name} have been in the same number of movies`;
  }

  if (character1.gender === character2.gender) {
    gender.innerHTML =`${character1.name} and ${character2.name} are the same gender`;
    } else {
      gender.innerHTML =`${character1.name} and ${character2.name} are not the same gender`;
    }

    if (character1.hairColor === character2.hairColor) {
      haircolor.innerHTML =`${character1.name} and ${character2.name} have the same hair color`;
      } else {
        haircolor.innerHTML =`${character1.name} and ${character2.name} have different hair colors`;
      }

      if (character1.skinColor === character2.skinColor) {
        skincolor.innerHTML =`${character1.name} and ${character2.name} have the same skin color`;
        } else {
          skincolor.innerHTML =`${character1.name} and ${character2.name} have different skin colors`;
        }
  
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", createCharacters);
 
