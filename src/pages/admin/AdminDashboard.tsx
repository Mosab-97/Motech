import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabase';
import { 
  ArrowUp, 
  ArrowDown, 
  Users, 
  MessageSquare, 
  Image, 
  Calendar 
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    inquiries: 0,
    newInquiries: 0,
    subscribers: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be actual Supabase queries
        // For this demo, we'll simulate the data
        
        // Simulate fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          projects: 5,
          inquiries: 12,
          newInquiries: 3,
          subscribers: 48
        });
        
        setRecentActivity([
          { id: 1, type: 'inquiry', name: 'John Smith', email: 'john@example.com', date: '2023-04-12T10:30:00', status: 'new' },
          { id: 2, type: 'project', title: 'E-commerce Website', date: '2023-04-10T14:15:00', action: 'updated' },
          { id: 3, type: 'inquiry', name: 'Sarah Johnson', email: 'sarah@example.com', date: '2023-04-08T09:45:00', status: 'contacted' },
          { id: 4, type: 'subscriber', email: 'mark@example.com', date: '2023-04-07T16:20:00' },
          { id: 5, type: 'project', title: 'Mobile Banking App', date: '2023-04-05T11:10:00', action: 'created' }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-mauve border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Dashboard Overview</h1>
        <p className="text-muted-gray">Welcome to your Motech admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-gray text-sm">Total Projects</p>
              <h3 className="text-2xl font-semibold">{stats.projects}</h3>
            </div>
            <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center">
              <Image size={20} className="text-mauve" />
            </div>
          </div>
          <div className="flex items-center text-green-400">
            <ArrowUp size={16} className="mr-1" />
            <span className="text-sm">2 new this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-gray text-sm">Total Inquiries</p>
              <h3 className="text-2xl font-semibold">{stats.inquiries}</h3>
            </div>
            <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-mauve" />
            </div>
          </div>
          <div className="flex items-center text-green-400">
            <ArrowUp size={16} className="mr-1" />
            <span className="text-sm">{stats.newInquiries} new this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-gray text-sm">Newsletter Subscribers</p>
              <h3 className="text-2xl font-semibold">{stats.subscribers}</h3>
            </div>
            <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-mauve" />
            </div>
          </div>
          <div className="flex items-center text-green-400">
            <ArrowUp size={16} className="mr-1" />
            <span className="text-sm">5 new this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-gray text-sm">Upcoming Meetings</p>
              <h3 className="text-2xl font-semibold">3</h3>
            </div>
            <div className="w-10 h-10 bg-mauve/20 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-mauve" />
            </div>
          </div>
          <div className="flex items-center text-yellow-400">
            <span className="text-sm">Next: Today, 3:00 PM</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        <div className="space-y-4">
          {recentActivity.map((activity: any) => (
            <div 
              key={activity.id}
              className="p-4 border-l-4 border-mauve bg-gray-700/50 rounded-r-lg"
            >
              {activity.type === 'inquiry' && (
                <div>
                  <div className="flex justify-between">
                    <h3 className="font-medium">New Inquiry from {activity.name}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      activity.status === 'new' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {activity.status === 'new' ? 'New' : 'Contacted'}
                    </span>
                  </div>
                  <p className="text-muted-gray text-sm mt-1">{activity.email}</p>
                  <p className="text-muted-gray text-xs mt-2">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              )}
              
              {activity.type === 'project' && (
                <div>
                  <h3 className="font-medium">
                    Project "{activity.title}" {activity.action}
                  </h3>
                  <p className="text-muted-gray text-xs mt-2">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              )}
              
              {activity.type === 'subscriber' && (
                <div>
                  <h3 className="font-medium">New newsletter subscriber</h3>
                  <p className="text-muted-gray text-sm mt-1">{activity.email}</p>
                  <p className="text-muted-gray text-xs mt-2">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors">
              Add New Project
            </button>
            <button className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              View Inquiries
            </button>
            <button className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Export Data
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-500 bg-gray-700/50 rounded-r-lg">
              <h3 className="font-medium">Client Consultation - ABC Corp</h3>
              <p className="text-muted-gray text-sm mt-1">Today, 3:00 PM - 4:00 PM</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-gray-700/50 rounded-r-lg">
              <h3 className="font-medium">Project Kickoff - XYZ Inc</h3>
              <p className="text-muted-gray text-sm mt-1">Tomorrow, 10:00 AM - 11:30 AM</p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-gray-700/50 rounded-r-lg">
              <h3 className="font-medium">Weekly Team Meeting</h3>
              <p className="text-muted-gray text-sm mt-1">Friday, 2:00 PM - 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;