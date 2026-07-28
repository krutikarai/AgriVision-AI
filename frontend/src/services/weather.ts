const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeather(city: string = "Bengaluru") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}