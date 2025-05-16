import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type CounterProps = {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const Counter = ({ end, duration = 2, label, prefix = '', suffix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const progressRatio = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(progressRatio * end));
        
        if (progressRatio < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [inView, end, duration]);

  // Format the number based on the current language
  const formattedNumber = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
        {prefix}{formattedNumber}{suffix}
      </h3>
      <p className="text-muted-gray">{label}</p>
    </motion.div>
  );
};

export default Counter;