const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const fromCities = fetch(endpoint).then(blob => blob.json());
const suggestions = document.querySelector('.suggestions');
const prompts = document.querySelectorAll('.prompts');

document.querySelector('.search').addEventListener('input',
    async function() {
        const cities = await fromCities;
        const query = this.value.trim();
        const sanitizedQuery = query.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/]/, '\\$&');
        const queryRegex = new RegExp(sanitizedQuery, 'ig');

        const N_MAX_RESULTS = 25

        let results = cities
            .map(city => {
                const matchesInCityName = city.city.match(queryRegex) || [];
                const matchesInStateName = city.state.match(queryRegex) || [];

                return {
                    cityName: city.city,
                    state: city.state,
                    population: city.population,
                    relevance: matchesInCityName.concat(matchesInStateName)
                        .reduce((length, match) => length + match.length, 0)
                }
            })
            .filter(city => city.relevance > 0)
            .sort((a, b) =>
                b.relevance - a.relevance ||
                a.state.localeCompare(b.state) ||
                a.cityName.localeCompare(b.cityName))
            .slice(0, N_MAX_RESULTS);

        suggestions.innerHTML = '';

        if (query.length > 0) {
            suggestions.innerHTML = results.map(result => {
                const city = result.cityName.replace(queryRegex, `<span class="hl">$&</span>`);
                const state = result.state.replace(queryRegex, `<span class="hl">$&</span>`);
                const population = parseInt(result.population, 10).toLocaleString('en-US');

                return `<li>
                    <span class="name">${city}, ${state}</span>
                    <span class="population">${population}</span>
                </li>`;
            })
            .join('');
        }
        else {
            prompts.forEach(element => suggestions.appendChild(element));
        }
    }
);
