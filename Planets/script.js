function getPlanets(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let planets = data.results;
        printPlanets(planets);
      })
      .catch(error => console.log(error));
  }

  function printPlanets(planets) {
    let table = document.getElementById("planetsTable");
    for (let i = 0; i < 10; i++) {
      let planet = planets[i];
      let row = `
        <tr>
          <td style="color:rgba(90, 255, 255, 1)">${planet.name}</td>
          <td style="color:rgba(90, 129, 255, 1)">${planet.population}</td>
          <td style="color:rgba(255, 81, 14, 0.71)">${planet.climate}</td>
          <td style="color:rgba(90, 129, 255, 1)">${planet.gravity}</td>
        </tr>
      `;
      table.innerHTML += row;
     

    }
  }
  window.onload = function() {
    let showPlanetsBtn = document.getElementById("showPlanetsBtn");
    showPlanetsBtn.onclick = function() {
      getPlanets('https://swapi.dev/api/planets/?page=1');
      showPlanetsBtn.onclick = null;
    }
  }