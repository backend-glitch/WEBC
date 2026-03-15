//API Fetching
 
//using promises

/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(response => {

    if(!response.ok) throw new Error("Pokemon Not Found !!");

    return response.json();
})
.then(data => console.log(data))
.catch(error => console.log("error : Unable to fetch"));
*/


// async-await
async function fetchData(){

    try{

     const name = document.getElementById("pokiname").value.toLowerCase();
     const pokiimg = document.getElementById("pokiimg");

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

     if(name === null) alert("Enter Pokemon Name");
     if(!response.ok) alert("Error : Pokemon does not Exist.");

     const data = await response.json();
     console.log(data);

    const pokisprites = data.sprites.front_default;

    pokiimg.src  = pokisprites;
    pokiimg.style.display = "block";


    }catch(error){
         console.error(error);
    }
}

fetchData();

// to get random POKI
async function getRandom(){

    try{

        const pokiimg  = document.getElementById("pokiimg");
        const pokinaam = document.getElementById("pokiname");

        const maxpoki = 1025;

        const rand = Math.floor(Math.random() * maxpoki);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`);

        if(!response.ok)  alert("error : Could not fetch");
    
        

        const data = await response.json();
        console.log(data);

        const name = data.name;
        const pokiimgs = data.sprites.front_default;

        pokiimg.src = pokiimgs;
        pokiimg.style.display = "block";

        pokinaam.value = name;

    } catch(error){
        console.log(error);
    }
}

getRandom();