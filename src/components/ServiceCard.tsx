import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

type ServiceCardProps = {
  id: string;
  index: number;
};

const ServiceCard = ({ id, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  
  // Get the icon component dynamically from Lucide
  const iconName = getIconName(id);
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 rounded-xl p-6 border border-mauve/10 hover:border-mauve/30 transition-all"
    >
      <div className="w-12 h-12 bg-mauve/20 rounded-lg flex items-center justify-center mb-4">
        {IconComponent && <IconComponent className="text-mauve" size={24} />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{t(`services.${id}.title`)}</h3>
      <p className="text-muted-gray mb-6">{t(`services.${id}.description`)}</p>
      <Link
        to={`/services/${id}`}
        className="text-mauve hover:text-soft-purple transition-colors font-medium"
      >
        Learn more →
      </Link>
    </motion.div>
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

export default ServiceCard;