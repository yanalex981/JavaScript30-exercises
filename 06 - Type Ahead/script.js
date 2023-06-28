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

        let filteredCities = cities
            .map(city => {
                const matchesInCityName = city.city.match(queryRegex) || [];
                const matchesInStateName = city.state.match(queryRegex) || [];

                return {
                    cityName: city.city,
                    state: city.state,
                    population: city.population,
                    relevance: matchesInCityName.concat(matchesInStateName).join('').length
                }
            })
            .filter(city => city.relevance > 0)
            .sort((a, b) =>
                b.relevance - a.relevance ||
                a.state.localeCompare(b.state) ||
                a.cityName.localeCompare(b.cityName))
            .slice(0, N_MAX_RESULTS);

        console.log(filteredCities);

        // suggestions.innerHTML = '';

        // if (query.length > 0) {
        //     suggestions.innerHTML = filteredCities.map(city =>
        //         `<li><span>${city.city.trim()}, ${city.state.trim()}</span><span>${city.population}</span></li>`.replace(query, `<span class='hl'>${query}</span>`)
        //     ).join('');
        // }
        // else {
        //     prompts.forEach((element, index, parent) => suggestions.appendChild(element));
        // }
    }
);
