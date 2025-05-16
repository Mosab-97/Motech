import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-jet-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-8xl font-bold text-gradient"
          >
            404
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-gray mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center btn-primary"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;