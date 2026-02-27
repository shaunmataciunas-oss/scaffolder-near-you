import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 md:p-6 w-20 md:w-32 h-20 md:h-32 flex items-center justify-center shadow-2xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={timeLeft[interval]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-3xl md:text-5xl font-bold text-brand-yellow font-montserrat absolute"
          >
            {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mt-3 font-medium">
        {interval}
      </span>
    </div>
  ));

  return (
    <div className="flex flex-wrap justify-center items-center py-8">
      {Object.keys(timeLeft).length ? timerComponents : (
        <span className="text-2xl font-bold text-brand-yellow">Launching Soon!</span>
      )}
    </div>
  );
};

export default CountdownTimer;