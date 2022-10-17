import { Notify } from "notiflix";

const BASE_URL = 'https://restcountries.com/v3.1/';
const endpoint = 'name/'

export function fetchCounties(name) {
  return fetch(`${BASE_URL}${endpoint}${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Fail');
      }
      return response.json();
    })
    // .catch(Notify.failure('Ooops, smth went wrong'));
}

