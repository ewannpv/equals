const endpoint = 'http://localhost:3000/api';
const version = 'v1';

const fetchApi = (route, method, body) => {
  const url = `${endpoint}/${version}${route}`;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(url, {
    method,
    headers,
    body,
  }).then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getEconomyCharts = () => fetchApi('/economy/charts', 'GET');
export const getSocialCharts = () => fetchApi('/social/charts', 'GET');
export const getExample = () => fetchApi('/travail/15-64ans', 'GET');