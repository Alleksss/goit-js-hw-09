import Notiflix from 'notiflix/build/notiflix-notify-aio'; 

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  const firstDelay = parseInt(delay.value, 10);
  const delayStep = parseInt(step.value, 10);
  const promisesAmount = parseInt(amount.value, 10);

  for (let i = 1; i <= promisesAmount; i++) {
    const position = i;
    const currentDelay = firstDelay + (i - 1) * delayStep;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
