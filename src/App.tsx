import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminInquiries from './pages/admin/AdminInquiries';
import LoginPage from './pages/admin/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services/:serviceId" element={<ServicePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;