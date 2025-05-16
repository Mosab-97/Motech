import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

type ProjectModalProps = {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    images: {
      desktop: string;
      mobile: string;
    };
  } | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gray-900 rounded-xl shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-mauve transition-colors z-10"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          
          <div className="h-80 md:h-96 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <img
              src={project.images.desktop}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm font-medium rounded-full bg-mauve/20 text-soft-purple"
                >
                  {t(`portfolio.tags.${tag}`)}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>
            <p className="text-muted-gray mb-8">{project.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Desktop View</h3>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={project.images.desktop}
                    alt={`${project.title} desktop view`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Mobile View</h3>
                <div className="rounded-lg overflow-hidden flex justify-center items-center h-full bg-gray-800 p-4">
                  <img
                    src={project.images.mobile}
                    alt={`${project.title} mobile view`}
                    className="max-h-80 w-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                className="px-6 py-3 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;