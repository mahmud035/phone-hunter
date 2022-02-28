'use strict';

const loadPhones = () => {
  const input = document.getElementById('search-box');
  const searchText = input.value;
  input.value = '';

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
  console.log(phones);
};
