import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { 
  Save, 
  X, 
  Edit,

  Image as ImageIcon
} from 'lucide-react';

import { Service } from '../../utils/supabase';
import { services as initialServices } from '../../data/services';

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      // In a real app, this would fetch from Supabase
      // For this demo, we'll use the static data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(initialServices as Service[]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setLoading(false);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService({ ...service });
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (!editingService) return;
    
    setEditingService(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const iconName = e.target.value;
    
    if (!editingService) return;
    
    setEditingService(prev => {
      if (!prev) return null;
      return { ...prev, icon: iconName };
    });
  };

  const saveService = () => {
    if (!editingService) return;
    
    const updatedServices = services.map(service => {
      if (service.id === editingService.id) {
        return editingService;
      }
      return service;
    });
    
    setServices(updatedServices);
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-mauve border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Available Lucide icons for the dropdown
  const availableIcons = [
    'Globe', 'Smartphone', 'LineChart', 'Zap', 'Code', 'Monitor', 
    'Server', 'Database', 'Cloud', 'Shield', 'BarChart', 'Layers'
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-muted-gray">Edit service information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.Star;
          
          return (
            <div key={service.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="relative h-40 bg-gray-900">
                <img 
                  src={service.mockup_url} 
                  alt={service.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center">
                  <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center mr-3">
                    <IconComponent className="text-mauve" size={24} />
                  </div>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                </div>
                <button
                  onClick={() => handleEditService(service)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/70 hover:bg-mauve/70 transition-colors"
                >
                  <Edit size={16} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-muted-gray">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Service Modal */}
      {modalOpen && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Service</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingService.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingService.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <select
                  value={editingService.icon}
                  onChange={handleIconChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                >
                  {availableIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <div className="mt-2 flex items-center">
                  <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center mr-3">
                    {LucideIcons[editingService.icon as keyof typeof LucideIcons] && 
                      React.createElement(LucideIcons[editingService.icon as keyof typeof LucideIcons], { 
                        className: "text-mauve", 
                        size: 24 
                      })
                    }
                  </div>
                  <span className="text-sm text-muted-gray">Preview</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mockup Image URL</label>
                <input
                  type="text"
                  name="mockup_url"
                  value={editingService.mockup_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                />
                {editingService.mockup_url && (
                  <div className="mt-2 h-32 w-full bg-gray-900 rounded overflow-hidden">
                    <img
                      src={editingService.mockup_url}
                      alt="Mockup preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveService}
                  className="px-4 py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;