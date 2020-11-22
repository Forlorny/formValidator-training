const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check is email valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// check if user type inputs
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '' && input !== password2) {
            showError(input, `${getFieldName(input)} is required`);
        } else if (input.value.trim() === '' && input === password2) {
            //Without this statment user see id of password2 which is not dry at all ;))
            showError(input, 'Password is required');
        } else {
            showSuccess(input);
        }
    });
}

//check length of inputs
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${input.id} must be at less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

//Check is passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}
// Capitalize first letter of input
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkRequired([username, email, password, password2]);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});