import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

// Components
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-32 pb-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-mauve blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-soft-purple blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-gray">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-mauve/20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-mauve" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-muted-gray">hello@motech.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-mauve/20 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-mauve" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted-gray">+1 (234) 567-8901</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-mauve/20 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-mauve" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-muted-gray">123 Tech Street, San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-900 rounded-xl border border-mauve/10">
                <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-gray">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-gray">Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-gray">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Schedule a Consultation</h2>
            <p className="text-muted-gray">
              Choose a time that works for you to discuss your project with our team.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            {/* Calendly embed would go here */}
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <p className="mb-4">Calendly integration will be added here</p>
              <button className="btn-primary">
                Schedule a Meeting
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;