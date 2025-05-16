import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Components
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

// Data
import { projects } from '../data/projects';

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'dashboard', label: 'Dashboards' }
  ];

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
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t('portfolio.title')}</h1>
            <p className="text-xl text-muted-gray">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-jet-black">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-mauve text-white'
                    : 'bg-gray-800 text-muted-gray hover:bg-mauve/20'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
          
          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-gray">Try changing your filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Next Project?</h2>
            <p className="text-xl text-muted-gray mb-8">
              Let's work together to create something amazing.
            </p>
            <a href="/contact" className="btn-primary">
              Start a Project
            </a>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default PortfolioPage;