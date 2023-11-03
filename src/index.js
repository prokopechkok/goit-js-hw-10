import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  breedSelectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderElement: document.querySelector('.loader'),
  errorElement: document.querySelector('.error'),
};

refs.breedSelectEl.hidden = true;
refs.errorElement.hidden = true;

fetchBreeds()
  .then(arr => {
    refs.breedSelectEl.hidden = false;

    arr.map(({ id, name }) => {
      refs.breedSelectEl.appendChild(createOption(id, name));
    });
    new SlimSelect({
      select: '#select',
    });
  })
  .catch(err => {
    Notify.failure(`❌Oops! Something went wrong! Try reloading the page!`, {
      position: 'right-top',
      clickToClose: true,
      timeout: 3000,
    });
    refs.breedSelectEl.hidden = true;
  })
  .finally(() => {
    refs.loaderElement.style.display = 'none';
  });

function createOption(id, name) {
  const option = document.createElement('option');
  option.value = id;
  option.textContent = name;
  return option;
}

refs.breedSelectEl.addEventListener('change', onBreedSelect);

function onBreedSelect() {
  const selectedBreed = refs.breedSelectEl.value;
  refs.catInfoEl.innerHTML = '';
  refs.breedSelectEl.hidden = true;
  refs.loaderElement.style.display = 'block';

  fetchCatByBreed(selectedBreed)
    .then(breedData => {
      const { name, description, temperament } = breedData[0].breeds[0];
      const imgUrl = breedData[0].url;

      refs.catInfoEl.innerHTML = `<img src=${imgUrl} alt=${name} />
			<div class="descrText">
			<h2>${name}</h2>
			<p>${description}</p>
			<h3><span class="temperament-span">Temperament:</span> ${temperament}</h3>
			</div>`;
      refs.breedSelectEl.hidden = false;
    })
    .catch(err => {
      refs.breedSelectEl.hidden = true;
      Notify.failure(`❌Oops! Something went wrong! Try reloading the page!`, {
        position: 'right-top',
        clickToClose: true,
        timeout: 3000,
      });
    })
    .finally(() => {
      refs.loaderElement.style.display = 'none';
    });
}
