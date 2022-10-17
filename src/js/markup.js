const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function renderCountryListMarkup(countriesArr) {
  return countriesArr.map(country => {
    return `
    <li class="countries">
      <img src="${country.flags.png}" alt="Flag" width=30 height=20>
      <p class="country-name">${country.name.common}</p>
    </li>`;
  })
  .join('')
}

function renderSelectedCountry(countriesArr) {
  return countriesArr
    .map(country => {
      return `
      <div class="countries">
        <img src="${country.flags.png}" alt="Flag" width=30 height=20>
        <h1 class="country-name">${country.name.common}</h1>
      </div>
      <p><b>Capital: </b>${country.capital[0]}</p>
      <p><b>Population: </b>${country.population}</p>
      <p><b>Languages: </b>${Object.values(country.languages).join(', ')}</p>`;
    })
    .join('');
}

function clearMarkup() {
  countryList.innerHTML = ''
  countryInfo.innerHTML = ''
}

export {
  countryList,
  countryInfo, renderCountryListMarkup,
  renderSelectedCountry,
  clearMarkup,
};