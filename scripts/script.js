
//Pegando nomes dos pokemons
async function getPokemonNames() {
    let pokeListNames = [];
    let urlApi = "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10000";
    let response = await fetch(urlApi);
    let data = await response.json();
  
    data.results.forEach(pokemon => {
      pokeListNames.push(pokemon.name)
    });
  
    return pokeListNames;
  }
  
  function clickElementList(name, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves) {
    updateView(name, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves);
  }
  
  async function updateView(pokemon, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves) {
    const pokeObject = await getPokemonInfo(pokemon);
  
    pokeName.innerHTML = pokeObject.name;
    pokeImg.src = pokeObject.sprites.other["dream_world"].front_default;
    pokeLife.innerHTML = "HP: " + pokeObject.stats[0].base_stat;
    pokeAtack.innerHTML = "ATK: " + pokeObject.stats[1].base_stat;
    pokeDefense.innerHTML = "DEF: " + pokeObject.stats[2].base_stat;
  
    pokeMoves[0].innerHTML = "ATK1: "+ "<br>" +pokeObject.abilities[0].ability.name;
    pokeMoves[1].innerHTML = "ATK2: "+ "<br>" +pokeObject.abilities[1].ability.name;
  }
  
  async function main() {
    let pokeName = document.getElementById("name-poke");
    let pokeImg = document.getElementById("img-poke");
    let pokeLife = document.getElementById("vida");
    let pokeDefense = document.getElementById("defesa");
    let pokeAtack = document.getElementById("ataque");
  
    let move1 = document.getElementById("atk-1");
    let move2 = document.getElementById("atk-2");
    let pokeMoves = [move1, move2];
  
    let pokeIdSelected = "221";
  
    let listHtml = document.getElementById("list-poke");
  
    const pokeListNames = await getPokemonNames();
  
    //criando a list elemento por elemento
    pokeListNames.forEach(pokemon => {
      let ele = document.createElement("li");
      ele.innerHTML = pokemon;
      ele.onclick = () => {
        clickElementList(ele.innerHTML, pokeName, pokeImg, pokeLife, pokeAtack, pokeDefense, pokeMoves);
      }
      listHtml.appendChild(ele);
    })
  
    //console.log(pokeListNames);
  
    //console.log(pokeObject)
  
  }
  
  async function getPokemonInfo(id) {
    let urlApi = "https://pokeapi.co/api/v2/pokemon/" + id;
    //lebrar de transformar isso em uma funçao kkkkkkk preguiça da peste qro deixar logo
    //funcionando depois eu limpo td kkkkk
    let response = await fetch(urlApi);
    let data = await response.json();
  
    return data;
  }
  
  main();