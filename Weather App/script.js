async function getWeatherData(city) {
    const apiKey = "RB64DYK9YDG95CX4TQP2FMPNU"; // Replace with your actual API key
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = await getWeatherData(city);
    const weatherResultDiv = document.getElementById("weatherResult");

    if (weatherInfo) {
        const { currentConditions } = weatherInfo;
        weatherResultDiv.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${currentConditions.temp} °C</p>
            <p>Humidity: ${currentConditions.humidity}%</p>
            <p>Condition: ${currentConditions.conditions}</p>
        `;
        
    } else {
        weatherResultDiv.innerHTML = `<p>Could not retrieve weather data. Please try again.</p>`;
    }  
});