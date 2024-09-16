async function generatePlan() {
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
      // Placeholder API endpoint (replace with your actual endpoint)
      const apiEndpoint = "https://your-ai-api-endpoint.com/generate-plan";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns a field called 'aiGeneratedPlan'
        const planOutput = `
          <h3>Your AI-Powered Travel Plan</h3>
          <p>${data.aiGeneratedPlan}</p>
        `;
        document.getElementById("plan-output").innerHTML = planOutput;
        document.getElementById("travel-plan").classList.remove("hidden");
      } else {
        throw new Error("Failed to generate plan. Try again later.");
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Please fill in all required fields.");
  }
}
