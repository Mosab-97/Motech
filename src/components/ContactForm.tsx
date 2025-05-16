import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { submitInquiry } from '../utils/supabase';

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
};

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await submitInquiry(formData);
      if (success) {
        setSubmitStatus('success');
        setFormData(initialFormState);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg"
    >
      {submitStatus === 'idle' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              {t('contact.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
            />
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1">
              {t('contact.service')}
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
            >
              <option value="" disabled>Select a service</option>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="consulting">Tech Consulting</option>
              <option value="ai">AI-Powered Solutions</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1">
                {t('contact.budget')}
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
              >
                <option value="" disabled>Select budget</option>
                <option value="$1k-$5k">$1,000 - $5,000</option>
                <option value="$5k-$10k">$5,000 - $10,000</option>
                <option value="$10k-$25k">$10,000 - $25,000</option>
                <option value="$25k+">$25,000+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium mb-1">
                {t('contact.timeline')}
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
              >
                <option value="" disabled>Select timeline</option>
                <option value="1-4 weeks">1-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve text-white"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-mauve hover:bg-opacity-90 text-white rounded-lg transition-colors font-medium disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : t('contact.submit')}
          </button>
        </form>
      ) : submitStatus === 'success' ? (
        <div className="text-center p-8 bg-gray-900 rounded-lg border border-green-500">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">{t('contact.success')}</h3>
          <p className="mb-4 text-muted-gray">{t('contact.schedule')}</p>
          {/* Calendly button would go here */}
          <button
            onClick={() => setSubmitStatus('idle')}
            className="mt-4 px-6 py-2 bg-mauve hover:bg-opacity-90 text-white rounded-lg transition-colors font-medium"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-900 rounded-lg border border-red-500">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">{t('contact.error')}</h3>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="mt-4 px-6 py-2 bg-mauve hover:bg-opacity-90 text-white rounded-lg transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ContactForm;