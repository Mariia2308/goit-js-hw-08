import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  formElement: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input'),
  messageTextarea: document.querySelector('.feedback-form textarea'),
};

refs.formElement.addEventListener('input', throttle(onFormInput, 500));
refs.formElement.addEventListener('submit', onFormSubmit);

addForm();

function onFormInput() {
  const currentData = {
    email: refs.emailInput.value,
    message: refs.messageTextarea.value,
  };
  console.log(currentData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function addForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  refs.emailInput.value = savedData.email || '';
  refs.messageTextarea.value = savedData.message || '';
}
