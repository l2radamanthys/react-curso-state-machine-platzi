const fetchCountries = () => {
  return fetch("https://restcountries.com/v3.1/region/ame").then((response) => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  });
};

export { fetchCountries };
