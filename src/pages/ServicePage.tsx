import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Data
import { services } from '../data/services';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  const [service, setService] = useState(services.find(s => s.id === serviceId));
  
  // Redirect if invalid service
  useEffect(() => {
    window.scrollTo(0, 0);
    setService(services.find(s => s.id === serviceId));
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <Link to="/" className="text-mauve hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Get next and previous services for navigation
  const currentIndex = services.findIndex(s => s.id === serviceId);
  const nextService = services[(currentIndex + 1) % services.length];
  const prevService = services[(currentIndex - 1 + services.length) % services.length];

  // Get the icon component dynamically from Lucide
  const iconName = getIconName(service.id);
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-mauve blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-soft-purple blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/#services" className="inline-flex items-center text-muted-gray hover:text-mauve mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to all services
              </Link>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-mauve/20 rounded-lg flex items-center justify-center mr-4">
                  {IconComponent && <IconComponent className="text-mauve" size={32} />}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{t(`services.${service.id}.title`)}</h1>
              </div>
              
              <p className="text-xl text-muted-gray">
                {t(`services.${service.id}.description`)}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
              
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {getServiceOfferings(service.id).map((offering, index) => (
                  <motion.li key={index} variants={item} className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-mauve/20 flex items-center justify-center">
                        <ArrowRight size={16} className="text-mauve" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{offering.title}</h3>
                      <p className="text-muted-gray">{offering.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden glass-card">
                <img 
                  src={service.mockup_url} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-jet-black via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-gray">
              We follow a structured approach to ensure your project is delivered successfully.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-mauve/30 hidden md:block"></div>
              
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-12"
              >
                {getProcessSteps().map((step, index) => (
                  <motion.div 
                    key={index} 
                    variants={item} 
                    className="flex flex-col md:flex-row"
                  >
                    <div className="flex-shrink-0 flex items-start">
                      <div className="w-10 h-10 rounded-full bg-mauve text-white flex items-center justify-center font-semibold z-10">
                        {index + 1}
                      </div>
                    </div>
                    <div className="md:ml-6 mt-4 md:mt-0">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-gray">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-gray mb-8">
              Let's discuss how our {t(`services.${service.id}.title`)} services can help your business grow.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation between services */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link 
              to={`/services/${prevService.id}`} 
              className="flex items-center text-white hover:text-mauve transition-colors mb-4 md:mb-0"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span>{t(`services.${prevService.id}.title`)}</span>
            </Link>
            
            <Link 
              to={`/services/${nextService.id}`} 
              className="flex items-center text-white hover:text-mauve transition-colors"
            >
              <span>{t(`services.${nextService.id}.title`)}</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Helper function to map service ID to the appropriate Lucide icon name
function getIconName(serviceId: string): string {
  switch (serviceId) {
    case 'web':
      return 'Globe';
    case 'app':
      return 'Smartphone';
    case 'consulting':
      return 'LineChart';
    case 'ai':
      return 'Zap';
    default:
      return 'Star';
  }
}

// Helper function to get service-specific offerings
function getServiceOfferings(serviceId: string): { title: string; description: string }[] {
  switch (serviceId) {
    case 'web':
      return [
        {
          title: 'Custom Website Development',
          description: 'Beautifully designed, high-performance websites tailored to your brand.'
        },
        {
          title: 'Web Application Development',
          description: 'Complex, feature-rich applications with intuitive user interfaces.'
        },
        {
          title: 'E-commerce Solutions',
          description: 'Scalable online stores with secure payment processing and inventory management.'
        },
        {
          title: 'CMS Integration',
          description: 'Content management systems that make it easy to update your website.'
        },
        {
          title: 'Progressive Web Apps',
          description: 'Fast, engaging experiences that work offline and load instantly.'
        }
      ];
    case 'app':
      return [
        {
          title: 'Native iOS Development',
          description: 'Polished, high-performance apps built specifically for Apple devices.'
        },
        {
          title: 'Native Android Development',
          description: 'Robust applications optimized for the Android ecosystem.'
        },
        {
          title: 'Cross-Platform Development',
          description: 'Efficient solutions that work seamlessly across multiple platforms.'
        },
        {
          title: 'UI/UX Design',
          description: 'Intuitive interfaces and engaging experiences that users love.'
        },
        {
          title: 'App Maintenance & Updates',
          description: 'Ongoing support to keep your app running smoothly and up-to-date.'
        }
      ];
    case 'consulting':
      return [
        {
          title: 'Technology Strategy',
          description: 'Expert guidance on selecting the right technologies for your business goals.'
        },
        {
          title: 'Digital Transformation',
          description: 'Comprehensive planning for modernizing your business processes.'
        },
        {
          title: 'Technical Architecture',
          description: 'Scalable, secure, and maintainable system designs.'
        },
        {
          title: 'Legacy System Migration',
          description: 'Seamless transitions from outdated systems to modern solutions.'
        },
        {
          title: 'Technology Assessments',
          description: 'Thorough evaluation of your current technology stack and recommendations for improvement.'
        }
      ];
    case 'ai':
      return [
        {
          title: 'AI Integration',
          description: 'Incorporating artificial intelligence into your existing systems and workflows.'
        },
        {
          title: 'Chatbot Development',
          description: 'Intelligent conversational interfaces for customer service and support.'
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecasting tools that help you make data-driven decisions.'
        },
        {
          title: 'Machine Learning Models',
          description: 'Custom algorithms trained on your data for specific business problems.'
        },
        {
          title: 'Natural Language Processing',
          description: 'Systems that understand and process human language for various applications.'
        }
      ];
    default:
      return [];
  }
}

// Process steps
function getProcessSteps(): { title: string; description: string }[] {
  return [
    {
      title: 'Discovery',
      description: 'We start by understanding your business, goals, and requirements through in-depth discussions.'
    },
    {
      title: 'Planning',
      description: 'Based on our findings, we create a detailed project plan, timeline, and technical specification.'
    },
    {
      title: 'Design',
      description: 'Our designers create wireframes and visual designs that align with your brand and user needs.'
    },
    {
      title: 'Development',
      description: 'Our team of engineers build your solution using modern technologies and best practices.'
    },
    {
      title: 'Testing',
      description: 'Rigorous quality assurance ensures your product works flawlessly across all platforms.'
    },
    {
      title: 'Deployment',
      description: 'We carefully launch your solution and provide training for your team.'
    },
    {
      title: 'Support',
      description: 'Ongoing maintenance and support keep your product running smoothly and up-to-date.'
    }
  ];
}

export default ServicePage;