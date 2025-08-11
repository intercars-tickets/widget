import React, { useEffect, useState } from 'react';

const Timer = ({ isTicketPage }: { isTicketPage: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(localStorage.getItem('timer') || '20:00');

  useEffect(() => {
    const timerInterval = setInterval(() => {

      const [minutes, seconds] = timeLeft.split(':');

      let minutesLeft = parseInt(minutes, 10);
      let secondsLeft = parseInt(seconds, 10);

      secondsLeft--;

      if (secondsLeft === -1) {
        minutesLeft--;
        secondsLeft = 59;
      }

      // Преобразуем минуты и секунды обратно в строку
      const newTimeLeft = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

      // Обновляем состояние времени
      setTimeLeft(newTimeLeft);

      // Сохраняем значение времени в localStorage
      localStorage.setItem('timer', newTimeLeft);

      if (newTimeLeft === '00:00') {
        clearInterval(timerInterval); // Останавливаем таймер
      }

      if (!isTicketPage) {
        // Обнуляем таймер при переходе на другую страницу
        setTimeLeft('20:00');
        localStorage.removeItem('timer');
      } else {
        // Сохраняем значение времени в localStorage только на странице бронирования билета
        localStorage.setItem('timer', newTimeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timeLeft]);

  return (
    <>
      <div className='tickets-item-info-timer__value'>Время оформления заказа: {timeLeft}</div>
    </>
  );
};

export default Timer;