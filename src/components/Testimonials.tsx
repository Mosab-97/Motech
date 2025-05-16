import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'Motech delivered an exceptional app that exceeded our expectations. Their attention to detail and commitment to quality is outstanding.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateCorp',
    content: 'Working with Motech was a game-changer for our business. Their expertise in AI integration helped us streamline our operations significantly.',
    rating: 5
  },
  {
    name: 'Emma Davis',
    role: 'Founder, EduTech',
    content: 'The team at Motech is incredibly professional and skilled. They turned our vision into reality with their innovative solutions.',
    rating: 5
  }
];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-jet-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Client Testimonials</h2>
          <p className="text-xl text-muted-gray">
            Don't just take our word for it - hear what our clients have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-mauve/10"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-mauve fill-current" />
                ))}
              </div>
              <p className="text-muted-gray mb-6">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-gray">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;