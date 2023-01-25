const resultBody = document.getElementById("result-body");
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn i");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBox = document.querySelector(".search-box");

cancelBtn.onclick = () => {
  searchBox.classList.remove("active");
}

searchBtn.parentNode.addEventListener("click", function(event) {
  event.preventDefault();
  searchBox.classList.add("active");
  const searchTerm = searchInput.value;
  fetch("https://restcountries.com/v2/name/" + searchTerm)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      resultBody.innerHTML = "";
      
      // Sort by name, area and population in descending order
      data.sort(function(a, b) {
        if (a.name !== b.name) {
          return b.name.localeCompare(a.name);
        }
        if (a.area !== b.area) {
          return b.area - a.area;
        }
        return b.population - a.population;
      });
      
      data.forEach(function(country) {
        const row = document.createElement("tr");
        const flagCell = document.createElement("td");
        const flagImg = document.createElement("img");
        flagImg.src = country.flag;
        flagImg.style.width = "50px";
        flagCell.appendChild(flagImg);
        row.appendChild(flagCell);
        const nameCell = document.createElement("td");
        nameCell.textContent = country.name;
        row.appendChild(nameCell);
        const populationCell = document.createElement("td");
        populationCell.textContent = country.population;
        row.appendChild(populationCell);
        const capitalCell = document.createElement("td");
        capitalCell.textContent = country.capital;
        row.appendChild(capitalCell);
        const areaCell = document.createElement("td");
        areaCell.textContent = country.area;
        row.appendChild(areaCell);
        const languagesCell = document.createElement("td");
        languagesCell.textContent = country.languages.map(language => language.name).join(", ");
        row.appendChild(languagesCell);
        const currencyCell = document.createElement("td");
        currencyCell.textContent = country.currencies.map(currency => currency.name).join(", ");
        row.appendChild(currencyCell);
        resultBody.appendChild(row);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});
