// Write your JavaScript code here!
window.addEventListener('load', function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         const div = document.getElementById("missionTarget");

         let index = Math.floor(Math.random()*json.length);
         
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src="${json[index].image}">
         `;

         init();
      });
   });
});

function init() {
   const form = document.querySelector('form');

   const pilotName = document.getElementById('pilotName');
   const copilotName = document.getElementById('copilotName');
   const fuelLevel = document.getElementById('fuelLevel');
   const cargoMass = document.getElementById('cargoMass');

   let launchStatus = document.getElementById('launchStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');

   let faultyItems = document.getElementById('faultyItems');

   form.addEventListener('submit', function(event) {

      if (pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === '') {
         alert('All fields are required!');
         event.preventDefault();
      } else if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         alert('Fuel level and cargo mass inputs must be numbers!');
         event.preventDefault();
      } else if (!/^[a-zA-Z]+$/.test(pilotName.value) || !/^[a-zA-Z]+$/.test(copilotName.value)) {
         alert('Pilot and copilot names must be a valid string!');
         event.preventDefault();
      }

      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;

      if (fuelLevel.value < 10000) {
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = 'Fuel level too low for launch';
         launchStatus.innerHTML = 'Shuttle Not Ready For Launch';
         launchStatus.style.color =  'red';
         event.preventDefault();
      } else if (cargoMass.value > 10000) {
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = 'Cargo mass too high for launch';
         launchStatus.innerHTML = 'Shuttle Not Ready For Launch';
         launchStatus.style.color =  'red';
         event.preventDefault();
      } else {
         launchStatus.innerHTML = 'Shuttle is ready for launch';
         launchStatus.style.color = 'green';
      }

   });
}