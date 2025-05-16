import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { supabase } from '../utils/supabase';

const NewsletterSignup = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter')
        .insert([{ email }]);

      if (error) throw error;
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-gray mb-8">
              Subscribe to our newsletter for the latest tech insights and updates.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-mauve focus:border-mauve"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Subscribe <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-400"
              >
                Thank you for subscribing!
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-400"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;