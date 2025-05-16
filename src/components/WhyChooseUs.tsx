import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Users, Workflow, Sparkles } from 'lucide-react';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Lightbulb,
      title: 'Problem Solvers',
      description: 'Tailored solutions for your unique challenges'
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Skilled developers & designers with proven track record'
    },
    {
      icon: Workflow,
      title: 'End-to-End Service',
      description: 'From concept to deployment and support'
    },
    {
      icon: Sparkles,
      title: 'Innovative Approach',
      description: 'Leveraging the latest tech & best practices'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Motech?</h2>
          <p className="text-xl text-muted-gray">
            We combine expertise with innovation to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-mauve/10 hover:border-mauve/30 transition-all"
            >
              <div className="w-12 h-12 bg-mauve/20 rounded-lg flex items-center justify-center mb-4">
                {<feature.icon className="text-mauve" size={24} />}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;