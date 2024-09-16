const socket = new WebSocket("ws://" + window.location.host + "/ws/stream/");
function generatePlan() {
  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const activities = document.getElementById("activities").value;

  if (destination && startDate && endDate) {
    const travelData = {
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      activities: activities || "Any activity",
    };

    try {
        socket.send(JSON.stringify({ type: 'plan', query: travelData }));
        socket.onmessage = function(event) {

        const data = JSON.parse(event.data);
        const message = data.message;

        const jsonObject = JSON.parse(message);

        if (jsonObject) {
          console.log(jsonObject);
      
          // Clear the existing content before appending new content
          document.getElementById("plan-output").innerHTML = '';
      
          // Loop through each day in the itinerary
          jsonObject.itinerary.forEach(day => {
              // Create the output for the date
              let dayOutput = `
                  <div class="day-itinerary">
                      <h2>Date: ${day.date}</h2>
              `;
      
              // Loop through each place for that day
              day.places.forEach(place => {
                  const placeOutput = `
                      <div class="place-details">
                          <h3>${place.place}</h3>
                          <p><strong>Activity:</strong> ${place.activity}</p>
                          <p><strong>Time:</strong> ${place.time}</p>
                          <p><strong>Description:</strong> ${place.description}</p>
                      </div>
                      <hr>
                  `;
                  dayOutput += placeOutput; // Append the place details to the day's output
              });
      
              dayOutput += '</div>'; // Close the day's div
      
              // Append the entire day's itinerary to the plan output
              document.getElementById("plan-output").innerHTML += dayOutput;
          });
      
          // Remove the hidden class after all data is appended
          document.getElementById("travel-plan").classList.remove("hidden");
      }else {
          throw new Error("Failed to generate plan. Try again later.");
        }
    };
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Please fill in all required fields.");
  }
}
