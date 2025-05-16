import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, Inquiry } from '../../utils/supabase';
import { 
  Download, 
  Eye,
  X,
  Mail,
  ExternalLink,
  Check,
  Trash,
  Archive
} from 'lucide-react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      // In a real app, this would fetch from Supabase
      // For this demo, we'll simulate the data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockInquiries: Inquiry[] = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1 234-567-8901',
          service: 'web',
          budget: '$5k-$10k',
          timeline: '1-2 months',
          message: 'I need a new website for my small business. It should have e-commerce capabilities and a blog section.',
          created_at: '2023-04-15T10:30:00',
          status: 'new'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 234-567-8902',
          service: 'app',
          budget: '$10k-$25k',
          timeline: '3-6 months',
          message: 'Looking for a mobile app for both iOS and Android that connects to our existing database system.',
          created_at: '2023-04-10T14:45:00',
          status: 'contacted'
        },
        {
          id: 3,
          name: 'Michael Brown',
          email: 'michael@example.com',
          service: 'consulting',
          budget: '$1k-$5k',
          timeline: '1-4 weeks',
          message: 'Need consulting services to evaluate our current tech stack and recommend improvements.',
          created_at: '2023-04-05T09:15:00',
          status: 'in_progress'
        },
        {
          id: 4,
          name: 'Emma Wilson',
          email: 'emma@example.com',
          phone: '+1 234-567-8904',
          service: 'ai',
          budget: '$25k+',
          timeline: '3-6 months',
          message: 'We want to implement AI-powered chatbots on our customer service platform to improve response times.',
          created_at: '2023-03-28T11:20:00',
          status: 'completed'
        },
        {
          id: 5,
          name: 'David Lee',
          email: 'david@example.com',
          service: 'web',
          budget: '$5k-$10k',
          timeline: '1-2 months',
          message: 'Our company website needs a complete redesign with modern aesthetics and improved user experience.',
          created_at: '2023-03-20T15:10:00',
          status: 'archived'
        }
      ];
      
      setInquiries(mockInquiries);
      setLoading(false);
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setLoading(false);
    }
  };

  const viewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setModalOpen(true);
  };

  const updateInquiryStatus = (id: number, status: Inquiry['status']) => {
    // In a real app, this would update the database
    const updatedInquiries = inquiries.map(inquiry => {
      if (inquiry.id === id) {
        return { ...inquiry, status };
      }
      return inquiry;
    });
    
    setInquiries(updatedInquiries);
    
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const deleteInquiry = (id: number) => {
    // In a real app, this would delete from the database
    const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== id);
    setInquiries(updatedInquiries);
    
    if (modalOpen && selectedInquiry && selectedInquiry.id === id) {
      setModalOpen(false);
    }
  };

  const exportToCSV = () => {
    // Function to convert inquiries to CSV
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Message', 'Date', 'Status'];
    const filteredInquiries = statusFilter === 'all' 
      ? inquiries 
      : inquiries.filter(inquiry => inquiry.status === statusFilter);
    
    const csvContent = [
      headers.join(','),
      ...filteredInquiries.map(inquiry => {
        const values = [
          inquiry.id,
          `"${inquiry.name.replace(/"/g, '""')}"`,
          `"${inquiry.email.replace(/"/g, '""')}"`,
          `"${inquiry.phone || ''}".replace(/"/g, '""')`,
          `"${inquiry.service.replace(/"/g, '""')}"`,
          `"${inquiry.budget.replace(/"/g, '""')}"`,
          `"${inquiry.timeline.replace(/"/g, '""')}"`,
          `"${inquiry.message.replace(/"/g, '""')}"`,
          new Date(inquiry.created_at).toLocaleString(),
          inquiry.status
        ];
        return values.join(',');
      })
    ].join('\n');
    
    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">New</span>;
      case 'contacted':
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Contacted</span>;
      case 'in_progress':
        return <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">Completed</span>;
      case 'archived':
        return <span className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">Archived</span>;
      default:
        return null;
    }
  };

  const filteredInquiries = statusFilter === 'all' 
    ? inquiries 
    : inquiries.filter(inquiry => inquiry.status === statusFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-mauve border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Inquiries</h1>
          <p className="text-muted-gray">Manage incoming project inquiries</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-mauve focus:border-mauve text-white"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {filteredInquiries.length > 0 ? (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left px-6 py-3 text-sm">Client</th>
                  <th className="text-left px-6 py-3 text-sm">Service</th>
                  <th className="text-left px-6 py-3 text-sm">Budget</th>
                  <th className="text-left px-6 py-3 text-sm">Date</th>
                  <th className="text-left px-6 py-3 text-sm">Status</th>
                  <th className="text-right px-6 py-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredInquiries.map(inquiry => (
                  <tr key={inquiry.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-xs text-muted-gray">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.service === 'web' && 'Web Development'}
                      {inquiry.service === 'app' && 'App Development'}
                      {inquiry.service === 'consulting' && 'Tech Consulting'}
                      {inquiry.service === 'ai' && 'AI Solutions'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {inquiry.budget}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-gray">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inquiry.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => viewInquiry(inquiry)}
                          className="p-2 rounded-lg text-white hover:bg-mauve/20 transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="p-2 rounded-lg text-white hover:bg-red-500/20 transition-colors"
                          title="Delete"
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
      ) : (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-muted-gray">No inquiries found for the selected filter.</p>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {modalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Inquiry Details</h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="font-medium text-lg">{selectedInquiry.name}</h3>
                {getStatusBadge(selectedInquiry.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-gray">Email</p>
                  <p className="flex items-center">
                    {selectedInquiry.email}
                    <a 
                      href={`mailto:${selectedInquiry.email}`} 
                      className="ml-2 text-mauve hover:text-opacity-80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail size={16} />
                    </a>
                  </p>
                </div>
                
                {selectedInquiry.phone && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-gray">Phone</p>
                    <p>{selectedInquiry.phone}</p>
                  </div>
                )}
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-gray">Service</p>
                  <p>
                    {selectedInquiry.service === 'web' && 'Web Development'}
                    {selectedInquiry.service === 'app' && 'App Development'}
                    {selectedInquiry.service === 'consulting' && 'Tech Consulting'}
                    {selectedInquiry.service === 'ai' && 'AI Solutions'}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-gray">Budget</p>
                  <p>{selectedInquiry.budget}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-gray">Timeline</p>
                  <p>{selectedInquiry.timeline}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-gray">Date Submitted</p>
                  <p>{new Date(selectedInquiry.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-gray">Message</p>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm font-medium mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'new')}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                      selectedInquiry.status === 'new'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-700 hover:bg-green-500/10 hover:text-green-400'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'contacted')}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                      selectedInquiry.status === 'contacted'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-700 hover:bg-blue-500/10 hover:text-blue-400'
                    }`}
                  >
                    <Mail size={14} className="mr-1" />
                    Contacted
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'in_progress')}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                      selectedInquiry.status === 'in_progress'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-700 hover:bg-yellow-500/10 hover:text-yellow-400'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'completed')}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                      selectedInquiry.status === 'completed'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-700 hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <Check size={14} className="mr-1" />
                    Completed
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'archived')}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                      selectedInquiry.status === 'archived'
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-gray-700 hover:bg-gray-500/10 hover:text-gray-400'
                    }`}
                  >
                    <Archive size={14} className="mr-1" />
                    Archive
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center"
                >
                  <Trash size={18} className="mr-2" />
                  Delete
                </button>
                
                <div className="space-x-3">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="inline-flex px-4 py-2 bg-mauve text-white rounded-lg hover:bg-opacity-90 transition-colors items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail size={18} className="mr-2" />
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;