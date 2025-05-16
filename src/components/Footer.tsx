import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jet-black border-t border-mauve/20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <span className="text-3xl font-bold">
                <span className="text-mauve">Mo</span>
                <span className="text-white">tech</span>
              </span>
            </div>
            <p className="text-muted-gray mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-mauve transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-mauve transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-mauve transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-mauve transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-mauve transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('navigation.services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/web" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('services.web.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/app" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('services.app.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('services.consulting.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/ai" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('services.ai.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('navigation.portfolio')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('navigation.contact')}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-gray hover:text-mauve transition-colors">
                  {t('navigation.login')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('navigation.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-mauve flex-shrink-0 mt-1" />
                <span className="text-muted-gray">hello@motech.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-mauve flex-shrink-0 mt-1" />
                <span className="text-muted-gray">+1 (234) 567-8901</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-mauve flex-shrink-0 mt-1" />
                <span className="text-muted-gray">123 Tech Street, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-gray text-sm mb-4 md:mb-0">
            &copy; {currentYear} Motech. {t('footer.rights')}
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-muted-gray text-sm hover:text-mauve transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-muted-gray text-sm hover:text-mauve transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;