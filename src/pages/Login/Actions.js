import Request from '~/api/httpRequest';
import emailjs from '@emailjs/browser';

export const findAccount = async function (values) {
    const email = values.email;
    const password = values.password;
    try {
        const res = await Request.getAllUser().then((datas) => {
            return datas.find((data) => {
                return data.email === email && data.password === password;
            });
        });

        return res; // return check đk navigate
    } catch (error) {}
};

function generateRandomFiveDigitNumber() {
    const min = 10000; // Số nhỏ nhất có 5 chữ số
    const max = 99999; // Số lớn nhất có 5 chữ số
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createFormVerify(values) {
    // values => data chuyền vào là 1 obj có email || name
    return new Promise((resolve, reject) => {
        const GET_CODE = `${generateRandomFiveDigitNumber()}`;
        var BASE_URL = window.location.href;

        const objElementForm = {
            email: values.email,
            name: values.name,
            code: GET_CODE,
            url: BASE_URL,
        };

        const form = document.createElement('form');

        for (const key in objElementForm) {
            const inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.name = key;
            inputElement.value = objElementForm[key];
            form.appendChild(inputElement);
        }

        emailjs
            .sendForm(
                'service_47nyvad', // Service ID (Email Services)
                'template_xweiofa', // User template (Email Templates)
                form,
                'DmIhMCRAhsvH6RJEY', //User ID (Account)
            )
            .then(
                (result) => {
                    resolve(GET_CODE);
                },
                (error) => {
                    reject();
                    console.log(error.text, 'lỗi');
                },
            );
    });
}
