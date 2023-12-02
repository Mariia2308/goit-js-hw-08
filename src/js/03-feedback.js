import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input[name="email"]'),
};


refs.form.addEventListener('input', throttle(onTextareaInput, 500));


populateTextarea();

refs.form.addEventListener('submit', handleSubmit);

function onTextareaInput(e) {
  const formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };


  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {

    refs.input.value = savedData.email || '';
    refs.textarea.value = savedData.message || '';
  }
}

function handleSubmit(e) {
  e.preventDefault();


  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();

  console.log({
    email: refs.input.value,
    message: refs.textarea.value,
  });
}
