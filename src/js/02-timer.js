import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio'; 

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future'); 
    } else {
      startBtn.disabled = false;
    }
  },
});

const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', startCountdown);

let countdownIntervalId = null;

function startCountdown() {
  const selectedDate = datePicker.selectedDates[0];
  const targetTime = selectedDate.getTime();

  startBtn.disabled = true;
  countdownIntervalId = setInterval(updateCountdown, 1000, targetTime);
}

function updateCountdown(targetTime) {
  const currentTime = new Date().getTime();
  const timeLeft = targetTime - currentTime;

  if (timeLeft <= 0) {
    clearInterval(countdownIntervalId);
    updateTimerDisplay(0, 0, 0, 0);
    return;
    };

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  updateTimerDisplay(days, hours, minutes, seconds);
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
};

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
