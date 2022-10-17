import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCounties } from './js/countries-api';
import { countryList, countryInfo, renderCountryListMarkup, renderSelectedCountry, clearMarkup } from './js/markup';

const DEBOUNCE_DELAY = 300;
const notifyOpts = {
  position: 'center-center',
  timeout: 5000
}

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  let countryName = e.target.value.trim()

  if (countryName !== '') {
    fetchCounties(countryName)
      .then(countryArr => {
        if (countryArr.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name. "Ukraine", for example :)', notifyOpts);
        } else if (countryArr.length >= 2 && countryArr.length <= 10) {
          clearMarkup();
          countryList.innerHTML = renderCountryListMarkup(countryArr);
        } else if (
          countryName === 'Russia' ||
          countryName === 'Russian' ||
          countryName === 'russia' ||
          countryName === 'Russian Federation' ||
          countryName === 'russian' ||
          countryName === 'Russi' ||
          countryName === 'russi') {
          Notify.warning('Russia is a terrorist state! Forget about this country and support Ukraine!', notifyOpts);
          e.target.value = '';
          clearMarkup();
        } else {
          clearMarkup();
          countryInfo.innerHTML = renderSelectedCountry(countryArr);
        }
      })
      .catch(() => {
        clearMarkup()
        Notify.failure('Oops, there is no country with that name. Try "Ukraine", for example :)', notifyOpts);
      })
  } else {
    clearMarkup();
  }
}