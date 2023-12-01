import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const inputElement = document.querySelector('form input');
const textElement = document.querySelector('form textarea');
let formDate = {};
const STORAGE_KEY = 'feedback';

formElement.addEventListener('submit', onFormSubmit);
formElement.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  if (inputElement.value === '' || textElement.value === '') {
    return alert('Fields must be filled in');
  }

  console.log(formDate);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formDate = {};
}

function onFormInput(event) {
  const formValue = event.target.value;
  const formKay = event.target.name;

  formDate[formKay] = formValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDate));
}

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedForm.email) {
    inputElement.value = savedForm.email;
    formDate.email = savedForm.email;
  }

  if (savedForm.message) {
    textElement.value = savedForm.message;
    formDate.message = savedForm.message;
  }
}