// Created by Brian Bird using OpenCode with DeepSeek V4.0 Pro, 6/3/2026

const wmoCodes = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
};

const url = 'https://api.open-meteo.com/v1/forecast' +
    '?latitude=44.0521&longitude=-123.0868' +
    '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m' +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum' +
    '&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch' +
    '&timezone=America/Los_Angeles&forecast_days=7';

const btn = document.getElementById('fetchBtn');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
    output.textContent = 'Loading...';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            renderWeather(data);
        })
        .catch(error => {
            output.innerHTML = '<span class="error">Error: ' + error.message + '</span>';
        });
});

function renderWeather(data) {
    const c = data.current;
    const d = data.daily;
    const units = data.current_units || {};
    const dailyUnits = data.daily_units || {};

    let html = '<div class="current"><h2>Current Conditions</h2>';
    html += '<p><strong>Temperature:</strong> ' + c.temperature_2m + units.temperature_2m + '</p>';
    html += '<p><strong>Humidity:</strong> ' + c.relative_humidity_2m + units.relative_humidity_2m + '</p>';
    html += '<p><strong>Precipitation:</strong> ' + c.precipitation + units.precipitation + '</p>';
    html += '<p><strong>Wind Speed:</strong> ' + c.wind_speed_10m + units.wind_speed_10m + '</p>';
    html += '<p><strong>Weather:</strong> ' + (wmoCodes[c.weather_code] || 'Code ' + c.weather_code) + '</p>';
    html += '</div>';

    html += '<h2>7-Day Forecast</h2>';
    html += '<table><thead><tr>';
    html += '<th>Date</th>';
    html += '<th>High</th>';
    html += '<th>Low</th>';
    html += '<th>Precipitation</th>';
    html += '</tr></thead><tbody>';

    for (let i = 0; i < d.time.length; i++) {
        html += '<tr>';
        html += '<td>' + d.time[i] + '</td>';
        html += '<td>' + d.temperature_2m_max[i] + dailyUnits.temperature_2m_max + '</td>';
        html += '<td>' + d.temperature_2m_min[i] + dailyUnits.temperature_2m_min + '</td>';
        html += '<td>' + d.precipitation_sum[i] + dailyUnits.precipitation_sum + '</td>';
        html += '</tr>';
    }

    html += '</tbody></table>';
    output.innerHTML = html;
}
