import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { 
  LayoutDashboard, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-react';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate('/login');
        return;
      }
      
      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        } else if (session) {
          setSession(session);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jet-black">
        <div className="w-12 h-12 border-4 border-mauve border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-mauve text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          w-64 bg-jet-black border-r border-gray-800 transition-all duration-300 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          fixed md:relative z-30 h-full overflow-y-auto
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-8">
            <span className="text-2xl font-bold">
              <span className="text-mauve">Mo</span>
              <span className="text-white">tech</span>
            </span>
          </div>

          <nav className="space-y-1">
            <Link
              to="/admin"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-mauve/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <LayoutDashboard className="mr-3 text-mauve" size={20} />
              Dashboard
            </Link>
            <Link
              to="/admin/projects"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-mauve/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Image className="mr-3 text-mauve" size={20} />
              Projects
            </Link>
            <Link
              to="/admin/services"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-mauve/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings className="mr-3 text-mauve" size={20} />
              Services
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-mauve/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <MessageSquare className="mr-3 text-mauve" size={20} />
              Inquiries
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-mauve/10 w-full"
          >
            <LogOut className="mr-3 text-mauve" size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-jet-black border-b border-gray-800 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-white">
                  <div className="w-8 h-8 rounded-full bg-mauve/30 flex items-center justify-center text-white mr-2">
                    {session?.user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="mr-2 hidden md:block">{session?.user?.email}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;