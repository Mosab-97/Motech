import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabase';
import { 
  Plus, 
  Trash, 
  Edit, 
  Star, 
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';

import { Project } from '../../utils/supabase';

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  };

  // In a real app, this would be replaced with the actual Supabase query
  const fetchProjects = async (): Promise<Project[]> => {
    // Demo data - would be replaced with Supabase call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 1,
        title: 'Learning Management System',
        description: 'A comprehensive platform for online education with student dashboards and progress tracking',
        tags: ['web', 'dashboard', 'education'],
        images: {
          desktop: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          mobile: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        featured: true,
        created_at: '2023-04-01T10:00:00'
      },
      {
        id: 2,
        title: 'Multi-Branch Booking App',
        description: 'Bilingual booking system with calendar integration for a multi-location business',
        tags: ['app', 'bilingual', 'booking'],
        images: {
          desktop: 'https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          mobile: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        featured: true,
        created_at: '2023-03-15T14:30:00'
      },
      {
        id: 3,
        title: 'Finance Tracker',
        description: 'Personal finance application with budget management and insightful analytics',
        tags: ['app', 'finance', 'dashboard'],
        images: {
          desktop: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          mobile: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        featured: true,
        created_at: '2023-02-25T11:15:00'
      }
    ];
  };

  const openCreateModal = () => {
    setCurrentProject({
      title: '',
      description: '',
      tags: [],
      images: {
        desktop: '',
        mobile: ''
      },
      featured: false
    });
    setFormMode('create');
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setCurrentProject({ ...project });
    setFormMode('edit');
    setModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagValue = e.target.value;
    const tags = tagValue.split(',').map(tag => tag.trim());
    setCurrentProject(prev => prev ? { ...prev, tags } : null);
  };

  const handleImageChange = (type: 'desktop' | 'mobile', value: string) => {
    setCurrentProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        images: {
          ...prev.images,
          [type]: value
        }
      };
    });
  };

  const toggleFeatured = (project: Project) => {
    // In a real app, this would update the database
    const updatedProjects = projects.map(p => {
      if (p.id === project.id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    
    setProjects(updatedProjects);
  };

  const deleteProject = (id: number) => {
    // In a real app, this would delete from the database
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
  };

  const saveProject = () => {
    if (!currentProject) return;
    
    if (formMode === 'create') {
      // In a real app, this would create in the database
      const newProject = {
        ...currentProject,
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
        created_at: new Date().toISOString()
      } as Project;
      
      setProjects([newProject, ...projects]);
    } else {
      // In a real app, this would update in the database
      const updatedProjects = projects.map(p => {
        if (p.id === currentProject.id) {
          return { ...p, ...currentProject };
        }
        return p;
      });
      
      setProjects(updatedProjects);
    }
    
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-mauve border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Project
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left px-6 py-3 text-sm">Title</th>
                <th className="text-left px-6 py-3 text-sm">Tags</th>
                <th className="text-left px-6 py-3 text-sm">Featured</th>
                <th className="text-left px-6 py-3 text-sm">Created</th>
                <th className="text-right px-6 py-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded overflow-hidden mr-3 bg-gray-700 flex-shrink-0">
                        <img 
                          src={project.images.desktop} 
                          alt={project.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-xs text-muted-gray truncate max-w-xs">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-mauve/20 text-soft-purple"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleFeatured(project)}
                      className={`p-1 rounded-full ${
                        project.featured 
                          ? 'text-yellow-400 hover:bg-yellow-400/20' 
                          : 'text-muted-gray hover:bg-gray-600'
                      } transition-colors`}
                    >
                      <Star size={20} fill={project.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-gray">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg text-white hover:bg-mauve/20 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-2 rounded-lg text-white hover:bg-red-500/20 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {formMode === 'create' ? 'Add New Project' : 'Edit Project'}
              </h2>
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
                  value={currentProject?.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={currentProject?.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={currentProject?.tags?.join(', ') || ''}
                  onChange={handleTagChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Desktop Image URL</label>
                  <input
                    type="text"
                    value={currentProject?.images?.desktop || ''}
                    onChange={(e) => handleImageChange('desktop', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                  />
                  {currentProject?.images?.desktop && (
                    <div className="mt-2 h-20 w-full bg-gray-900 rounded overflow-hidden">
                      <img
                        src={currentProject.images.desktop}
                        alt="Desktop preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Image URL</label>
                  <input
                    type="text"
                    value={currentProject?.images?.mobile || ''}
                    onChange={(e) => handleImageChange('mobile', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve"
                  />
                  {currentProject?.images?.mobile && (
                    <div className="mt-2 h-20 w-full bg-gray-900 rounded overflow-hidden">
                      <img
                        src={currentProject.images.mobile}
                        alt="Mobile preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={currentProject?.featured || false}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                  className="h-4 w-4 text-mauve rounded border-gray-600 focus:ring-mauve"
                />
                <label htmlFor="featured" className="ml-2 text-sm">
                  Featured Project
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  className="px-4 py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {formMode === 'create' ? 'Create Project' : 'Save Changes'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;