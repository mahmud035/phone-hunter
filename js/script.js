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
        error.innerHTML = ''; // remove error message
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
          <button onclick="loadSinglePhone('${phone.slug}')" class="btn btn-success">See Details</button>
        </div>
      </div>`;

    phoneContainer.appendChild(div);
  });
};

const loadSinglePhone = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.textContent = '';
  console.log(phone);

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="card  border-0">
       <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto pt-3">
       <div class="card-body">
          <h3 class="text-center">${phone.name}</h3>
          <h6 class="text-center">${phone?.releaseDate}</h6>
          <h3 class="text-center">${phone.brand}</h3>
          <hr>
          <h5 class="text-center">Main Features</h5>
          <p> ChipSet: ${phone?.mainFeatures?.chipSet} </p> 
          <p> Display Size: ${phone?.mainFeatures?.displaySize} </p>
          <p> Memory: ${phone?.mainFeatures?.memory} </p>
          <p> Storage: ${phone?.mainFeatures?.storage} </p>
          <hr>
          <h5 class="text-center">Sensors</h5>
          <p>${phone?.mainFeatures?.sensors[0]},
             ${phone?.mainFeatures?.sensors[1]}, 
             ${phone?.mainFeatures?.sensors[2]}, 
             ${phone?.mainFeatures?.sensors[3]}, 
             ${phone?.mainFeatures?.sensors[4]},  
             ${phone?.mainFeatures?.sensors[5]}
          </p> 
          <hr>
          <h5 class="text-center">Others</h5>
          <p> Bluetooth: ${phone?.others?.Bluetooth} </p> 
          <p> GPS: ${phone?.others?.GPS} </p>
          <p> NFC: ${phone?.others?.NFC} </p>
          <p> Radio: ${phone?.others?.Radio} </p>
          <p> USB: ${phone?.others?.USB} </p>
          <p> WLAN: ${phone?.others?.WLAN} </p>
          <hr>
      </div>
    </div>`;

  phoneDetail.appendChild(div);
};
