
import throttle from 'lodash.throttle';

const FORM__KEY = 'feedback-form-state';
let formData = {};
const refs = {
    inputFormFeedback: document.querySelector('.feedback-form'),
    inputFormEmail: document.querySelector('[type="email"]'),
    inputFormMessage: document.querySelector('[name="message"]'),
    inputFormSubmitBtn: document.querySelector('[type="submit"]'),
};
populateTextarea();
refs.inputFormFeedback.addEventListener('submit', onFormSubmit);
refs.inputFormFeedback.addEventListener('input', throttle(onInputStorage, 500));

function onInputStorage(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(FORM__KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {

    console.log(formData);
    evt.preventDefault();

    const formElements = evt.currentTarget.elements;
    const emailValue = formElements.email.value;
    const messageValue = formElements.message.value;
    if (emailValue === '' || messageValue === '') {
        alert('Усі поля введення мають бути заповнені!');
    };


    evt.currentTarget.reset();
    localStorage.removeItem(FORM__KEY);
    formData = {};
};

function populateTextarea() {

    const savedStorageInputs = localStorage.getItem(FORM__KEY)

    if (savedStorageInputs) {
        formData = JSON.parse(savedStorageInputs);
        refs.inputFormEmail.value = formData.email || '';
        refs.inputFormMessage.value = formData.message || '';

    }
}