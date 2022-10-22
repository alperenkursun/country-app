let AllRegions=[
    {
        Region : "Africa",
        Subregions : ["Northern Africa","Eastern Africa","Middle Africa","Southern Africa","Western Africa"]
    },
    {
        Region : "Asia",
        Subregions : ["Eastern Asia","South-Eastern Asia","Southern Asia","Central Asia","Western Asia"]
    },
    {
        Region : "Americas",
        Subregions : ["Central America","Caribbean","South America","North America"]
    },
    {
        Region : "Europe",
        Subregions : ["Central Europe","Southern Europe","Western Europe","Northern Europe","Southeast Europe","Eastern Europe"]
    },
    {
        Region : "Oceania",
        Subregions : ["Melanesia","Micronesia","Australia and New Zealand","Polynesia"]
    }
]
let regionSelect = document.getElementById("region");
let subregionSelect = document.getElementById("subregion");




var response;
function displaySubregion(region){
    region = region.options[region.selectedIndex].text;
    subregionSelect.innerHTML="";
    for(let i=0;i<AllRegions.length;i++){

        if(AllRegions[i].Region == region){
            for(let j=0;j<AllRegions[i].Subregions.length;j++){
                var subregion = `<option value="${j+1}">${AllRegions[i].Subregions[j]}</option>`;

                subregionSelect.insertAdjacentHTML("beforeend",subregion);
            }
        }
    }

    //AJAX
    // var xhttp = new XMLHttpRequest();
    // xhttp.open("GET","https://restcountries.com/v3.1/region/"+ region.toLowerCase(),true);
    // xhttp.send();

    // xhttp.addEventListener("load",() => {
    //     response = JSON.parse(xhttp.responseText);
    //     console.log(response);
    // });

    //PROMISE
    // url = "https://restcountries.com/v3.1/region/" + region;
    // fetch(url).then((response) => {
    //     return response;
    // }).then((res) => {
    //     return(res.json());
    // }).then((data) => {
    //     response = data
    // }).catch(err => alert(err));

    //async-await
    await(region);
    async function await(region){
        var res = await fetch("https://restcountries.com/v3.1/region/" + region);
        response = await res.json();
        console.log(response);
    }
}

var selectedSubregion;

function selected(selected){
    document.getElementById("countries").innerHTML="";
    selectedSubregion = selected.options[selected.selectedIndex].text;
    console.log(response);
    for(let i=0;i<response.length;i++){
        if(response[i].subregion == selectedSubregion){
        let country= `
        <div class="card m-1 shadow" style="width: 18rem;">
            <img src="${response[i].flags.png}" class="card-img-top img-fluid" alt="...">
            <div class="card-body" style="height: 200px !important">
              <h5 class="card-title"> ${response[i].name.common}</h5>
              <p class="card-text">Capital: ${response[i].capital[0]}</p>
              <p class="card-text">Language: ${Object.values(response[i].languages)}</p>
              <p class="card-text">Currency: ${Object.keys(response[i].currencies)}</p>
              <p class="card-text">Population: ${response[i].population}</p>
              <p class="card-text">Region: ${response[i].region}</p>
              <p class="card-text">Subregion: ${response[i].subregion}</p>
            </div>
        </div>
            `;
        
        document.getElementById("countries").insertAdjacentHTML("beforeend",country);
        }
    }
}




