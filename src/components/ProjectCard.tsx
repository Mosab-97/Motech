import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: {
    desktop: string;
    mobile: string;
  };
  index: number;
  onClick: () => void;
};

const ProjectCard = ({ title, description, tags, images, index, onClick }: ProjectCardProps) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl glass-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-jet-black to-transparent z-10"></div>
        <img
          src={images.desktop}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Mobile mockup - positioned at the bottom right corner */}
        <div className="absolute bottom-[-20px] right-[-20px] w-1/3 z-20 animate-float">
          <img
            src={images.mobile}
            alt={`${title} mobile view`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      <div className="p-6 relative z-20">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded-full bg-mauve/20 text-soft-purple"
            >
              {t(`portfolio.tags.${tag}`)}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-gray text-sm mb-4">{description}</p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="text-mauve hover:text-soft-purple transition-colors">
            {t('portfolio.view')} →
          </button>
        </motion.div>
      </div>
      
      {/* Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-jet-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <button 
          className="px-6 py-3 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors"
          onClick={onClick}
        >
          {t('portfolio.view')}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;