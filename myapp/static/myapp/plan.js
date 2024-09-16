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
        socket.send(JSON.stringify({ type: 'plan', query: travelData.destination }));
        socket.onmessage = function(event) {

        const data = JSON.parse(event.data);
        const message = data.message;

        const jsonObject = JSON.parse(message);

        if (jsonObject) {
          console.log(jsonObject);
          jsonObject.places.forEach(element => {
            const planOutput = `
                <h3>${element.place}</h3>
                <p>${element.description}</p>
            `;
            document.getElementById("plan-output").innerHTML += planOutput;
            document.getElementById("travel-plan").classList.remove("hidden");
        });        
        } else {
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
