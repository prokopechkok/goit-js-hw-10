const api_key =
  'live_XsWJHzeFrc5TjGNhAiIZGk4fLzIWxVZWgOMs5XD3nrznrSWPwGIkLPLYZgjNwsy5';
export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': api_key,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
