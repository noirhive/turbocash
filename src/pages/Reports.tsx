import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';

interface ReportsProps {
  userEmail: string;
  userRole: 'admin' | 'user';
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Reports: React.FC<ReportsProps> = ({ 
  userEmail, 
  userRole, 
  onLogout, 
  darkMode, 
  toggleDarkMode 
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const [isDownloading, setIsDownloading] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const generateCSV = (data: any[], filename: string) => {
    const headers = ['Date', 'Phone', 'Details', 'Amount', 'Charge', 'Total Amount'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.date,
        row.phone,
        row.details,
        row.amount,
        row.charge,
        row.total_amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadMonth = async () => {
    setIsDownloading(true);
    try {
      // Mock data - replace with Supabase query filtered by month/year
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          date: '2025-01-15',
          phone: '01712345678',
          details: 'bKash',
          amount: 1000,
          charge: 20,
          total_amount: 1020
        }
      ];
      
      const monthName = months.find(m => m.value === selectedMonth)?.label;
      generateCSV(mockData, `transactions_${monthName}_${selectedYear}.csv`);
      toast.success('Monthly report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download monthly report');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadYear = async () => {
    setIsDownloading(true);
    try {
      // Mock data - replace with Supabase query filtered by year
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          date: '2025-01-15',
          phone: '01712345678',
          details: 'bKash',
          amount: 1000,
          charge: 20,
          total_amount: 1020
        },
        {
          date: '2025-01-14',
          phone: '01887654321',
          details: 'Nagad',
          amount: 500,
          charge: 10,
          total_amount: 510
        }
      ];
      
      generateCSV(mockData, `transactions_${selectedYear}.csv`);
      toast.success('Yearly report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download yearly report');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header 
        userEmail={userEmail}
        userRole={userRole}
        onLogout={onLogout}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Download transaction reports in CSV format</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Export Filters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Year Filter */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadMonth}
                disabled={isDownloading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? 'Downloading...' : `Download ${months.find(m => m.value === selectedMonth)?.label} ${selectedYear}`}
                </span>
              </button>

              <button
                onClick={handleDownloadYear}
                disabled={isDownloading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloading ? 'Downloading...' : `Download Full Year ${selectedYear}`}
                </span>
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Preview</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Selected Period:</strong> {months.find(m => m.value === selectedMonth)?.label} {selectedYear}</p>
              <p><strong>CSV Fields:</strong> Date, Phone, Details, Amount, Charge, Total Amount</p>
              <p><strong>Format:</strong> Comma-separated values (.csv)</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;