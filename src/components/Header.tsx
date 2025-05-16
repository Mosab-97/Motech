import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

// Import services data
import { services } from '../data/services';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-jet-black bg-opacity-95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-mauve">Mo</span>
            <span className="text-white">tech</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-4 py-2 text-white hover:text-mauve transition-colors">
            {t('navigation.home')}
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button 
              className="px-4 py-2 text-white hover:text-mauve transition-colors flex items-center"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              {t('navigation.services')} <ChevronDown size={16} className="ml-1" />
            </button>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  className="absolute top-full left-0 w-56 bg-jet-black bg-opacity-95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {services.map(service => (
                    <Link 
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="block px-4 py-3 text-white hover:bg-mauve/10 transition-colors"
                    >
                      {t(`services.${service.id}.title`)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link to="/portfolio" className="px-4 py-2 text-white hover:text-mauve transition-colors">
            {t('navigation.portfolio')}
          </Link>
          
          <Link to="/contact" className="px-4 py-2 text-white hover:text-mauve transition-colors">
            {t('navigation.contact')}
          </Link>
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center">
          {/* Language Switcher */}
          <div className="relative mr-2">
            <button 
              className="p-2 text-white hover:text-mauve transition-colors"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <Globe size={20} />
            </button>
            
            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div 
                  className="absolute top-full right-0 w-28 bg-jet-black bg-opacity-95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    className="block w-full text-left px-4 py-2 text-white hover:bg-mauve/10 transition-colors"
                    onClick={() => changeLanguage('en')}
                  >
                    {t('language.en')}
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-white hover:bg-mauve/10 transition-colors"
                    onClick={() => changeLanguage('ar')}
                  >
                    {t('language.ar')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 top-16 bg-jet-black bg-opacity-95 backdrop-blur-md z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 pt-6 flex flex-col">
              <Link to="/" className="py-4 text-xl text-white hover:text-mauve border-b border-gray-800">
                {t('navigation.home')}
              </Link>
              
              {/* Services Dropdown */}
              <div className="border-b border-gray-800">
                <button 
                  className="py-4 w-full text-left text-xl text-white hover:text-mauve flex items-center justify-between"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {t('navigation.services')} 
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div 
                      className="pl-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {services.map(service => (
                        <Link 
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="block py-3 text-white hover:text-mauve"
                        >
                          {t(`services.${service.id}.title`)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/portfolio" className="py-4 text-xl text-white hover:text-mauve border-b border-gray-800">
                {t('navigation.portfolio')}
              </Link>
              
              <Link to="/contact" className="py-4 text-xl text-white hover:text-mauve border-b border-gray-800">
                {t('navigation.contact')}
              </Link>
              
              <div className="py-4 flex items-center space-x-4">
                <button 
                  className={`px-4 py-2 rounded ${i18n.language === 'en' ? 'bg-mauve' : 'bg-transparent border border-mauve'}`}
                  onClick={() => changeLanguage('en')}
                >
                  {t('language.en')}
                </button>
                <button 
                  className={`px-4 py-2 rounded ${i18n.language === 'ar' ? 'bg-mauve' : 'bg-transparent border border-mauve'}`}
                  onClick={() => changeLanguage('ar')}
                >
                  {t('language.ar')}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;