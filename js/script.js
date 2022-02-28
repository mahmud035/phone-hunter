'use strict';

const phoneContainer = document.getElementById('phone-container');

const loadPhones = () => {
  const input = document.getElementById('search-box');
  const error = document.getElementById('error');
  const searchText = input.value;
  input.value = '';

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.data.length == 0);
      if (data.data.length == 0) {
        error.innerHTML = 'Sorry! no phone found.';
        phoneContainer.textContent = ''; // remove previous search result
      } else {
        error.innerHTML = '';            // remove error message
        phoneContainer.textContent = ''; // remove previous search result
        displayPhones(data.data);
      }
    });
};

const displayPhones = (phones) => {
  phones.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement('div');
    // div.className = 'p-1 m-1';

    div.innerHTML = `
      <div class="card text-center border-0">
        <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto pt-3">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h5 class="card-title">${phone.brand}</h5>
          <button class="btn btn-success">See Details</button>
        </div>
      </div>`;

    phoneContainer.appendChild(div);
  });
};
