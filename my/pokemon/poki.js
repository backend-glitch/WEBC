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
     if(!response.ok) throw new Error("Error : Pokemon does not Exist.");

     const data = await response.json();
    //   console.log(data);

    const pokisprites = data.sprites.front_default;

    pokiimg.src  = pokisprites;
    pokiimg.style.display = "block";


    }catch(error){
         console.error(error);
    }
}

fetchData();