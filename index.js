const form = document.querySelector('.form__registration');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const professionSelect = document.getElementById('profession');
const phoneInput = document.getElementById('phone-input');
const passwordInput = document.getElementById('password');
const passwordRepeatInput = document.getElementById('passwordRepeat');
const agreeCheckbox = document.getElementById('iAgree');

const nameError = document.getElementById('nameError');
const surnameError = document.getElementById('surnameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const genderError = document.getElementById('genderError');
const professionError = document.getElementById('professionError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const passwordRepeatError = document.getElementById('passwordRepeatError');
const agreeError = document.getElementById('agreeError');

Inputmask({ mask: '+7 999 999-99-99' }).mask(phoneInput);

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменить действие по умолчанию для события submit

    // Функция для проверки валидности поля
    function validateField(field, errorSpan) {
        if (!field.checkValidity()) {
            field.classList.add('error');
            errorSpan.textContent = field.validationMessage;
            return false;
        } else {
            field.classList.remove('error');
            errorSpan.textContent = '';

            if (field === phoneInput) {
                const phoneLength = field.value.replace(/\D/g, '').length;
                if (phoneLength !== 11) {
                    field.classList.add('error');
                    errorSpan.textContent = 'Введите полный номер телефона';
                    return false;
                }
            }

            const passwordsMatch = passwordInput.value === passwordRepeatInput.value;
            if (passwordsMatch === false) {
                passwordRepeatError.textContent = 'Пароли не совпадают';
            } else {
                passwordRepeatError.textContent = '';
            }

            return true;
        }
    }

    // Проверка полей при вводе
    nameInput.addEventListener('input', function () {
        validateField(nameInput, nameError);
    });

    surnameInput.addEventListener('input', function () {
        validateField(surnameInput, surnameError);
    });

    emailInput.addEventListener('input', function () {
        validateField(emailInput, emailError);
    });

    ageInput.addEventListener('input', function () {
        validateField(ageInput, ageError);
    });

    genderInputs.forEach(function (genderInput) {
        genderInput.addEventListener('input', function () {
            validateField(genderInput, genderError);
        });
    });

    professionSelect.addEventListener('input', function () {
        validateField(professionSelect, professionError);
    });

    phoneInput.addEventListener('input', function () {
        validateField(phoneInput, phoneError);
    });

    passwordInput.addEventListener('input', function () {
        validateField(passwordInput, passwordError);
    });

    passwordRepeatInput.addEventListener('input', function () {
        validateField(passwordRepeatInput, passwordRepeatError);
    });

    agreeCheckbox.addEventListener('change', function () {
        validateField(agreeCheckbox, agreeError);
    });

    // Проверка полей при отправке формы
    const nameValid = validateField(nameInput, nameError);
    const surnameValid = validateField(surnameInput, surnameError);
    const emailValid = validateField(emailInput, emailError);
    const ageValid = validateField(ageInput, ageError);
    const genderValid = Array.from(genderInputs).some(function (genderInput) {
        return genderInput.checked;
    }) || validateField(genderInputs[0], genderError);
    const phoneValid = validateField(phoneInput, phoneError);
    const professionValid = validateField(professionSelect, professionError);
    const passwordsValid = validateField(passwordInput, passwordError) && validateField(passwordRepeatInput, passwordRepeatError);


    const agreeValid = validateField(agreeCheckbox, agreeError);

    // Если форма не проходит проверку валидности
    if (!nameValid || !surnameValid || !emailValid || !ageValid || !genderValid || !professionValid || !phoneValid || !passwordsValid || !agreeValid) {
        return;
    }

    // Если форма проходит проверку валидности, выводим значения полей формы в консоль и очищаем форму
    console.log('Имя:', nameInput.value);
    console.log('Фамилия:', surnameInput.value);
    console.log('Email:', emailInput.value);
    console.log('Возраст:', ageInput.value);
    console.log('Профессия:', professionSelect.value);
    console.log('Пол:', Array.from(genderInputs).find(genderInput => genderInput.checked)?.value || "-");
    console.log('Номер телефона:', phoneInput.value);

    form.reset();

    alert("Вы успешно зарегистрировались!");
}
);