import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Components
import ServiceCard from '../components/ServiceCard';
import Counter from '../components/CounterAnimation';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import ContactForm from '../components/ContactForm';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import NewsletterSignup from '../components/NewsletterSignup';

// Data
import { services } from '../data/services';
import { projects } from '../data/projects';

const HomePage = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen gradient-bg flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-mauve blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-soft-purple blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 pt-16 pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-gray mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="btn-primary">
                {t('hero.cta')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Services Section */}
      <section id="services" className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">
              We provide comprehensive digital solutions tailored to your unique business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                id={service.id}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('portfolio.title')}</h2>
            <p className="section-subtitle">
              {t('portfolio.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                images={project.images}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-secondary inline-flex items-center">
              View All Projects <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter end={15} label="Mobile Apps Delivered" suffix="+" />
            <Counter end={10} label="Cross-Platform Projects" suffix="+" />
            <Counter end={5} label="Years Team Experience" suffix="+" />
            <Counter end={95} label="Client Satisfaction" suffix="%" />
            <Counter end={20} label="Websites Built" suffix="+" />
            <Counter end={3} label="AI Integrations" suffix="+" />
            <Counter end={99.9} label="Uptime & Support" suffix="%" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('contact.title')}</h2>
            <p className="section-subtitle">
              {t('contact.subtitle')}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default HomePage;