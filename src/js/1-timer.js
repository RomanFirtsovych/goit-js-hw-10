import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePickerInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
startButton.classList.add("btn-timer");
datePickerInput.classList.add("input-timer");
let userSelectedDate;
let countdownInterval;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topCenter',
            });
            startButton.disabled = true;
            userSelectedDate = null;
        } else {
            startButton.disabled = false;
            userSelectedDate = selectedDate;
        }
    },
};

flatpickr(datePickerInput, options);

startButton.addEventListener('click', startCountdown);
startButton.disabled = true;

function startCountdown() {
    if (!userSelectedDate) return;
    datePickerInput.disabled = true;
    startButton.disabled = true;

    const updateCountdown = () => {
        const timeLeft = userSelectedDate - new Date();
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            datePickerInput.disabled = false;
            startButton.disabled = true;
            return;
        }
        const timeObject = convertMs(timeLeft);
        updateTimerDisplay(timeObject);
    };

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}





