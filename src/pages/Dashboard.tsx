import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SummaryCards from '../components/SummaryCards';
import TransactionTable from '../components/TransactionTable';

interface Transaction {
  id: string;
  date: string;
  phone: string;
  details: string;
  amount: number;
  charge: number;
  total_amount: number;
  created_at: string;
}

interface SummaryData {
  totalAmount: number;
  totalCharges: number;
  netTotal: number;
  transactionCount: number;
}

interface DashboardProps {
  userEmail: string;
  userRole: 'admin' | 'user';
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userEmail, 
  userRole, 
  onLogout, 
  darkMode, 
  toggleDarkMode 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    totalAmount: 0,
    totalCharges: 0,
    netTotal: 0,
    transactionCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Mock data - replace with Supabase queries
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            date: '2025-01-15',
            phone: '01712345678',
            details: 'bKash',
            amount: 1000,
            charge: 20,
            total_amount: 1020,
            created_at: '2025-01-15T10:00:00Z'
          },
          {
            id: '2',
            date: '2025-01-14',
            phone: '01887654321',
            details: 'Nagad',
            amount: 500,
            charge: 10,
            total_amount: 510,
            created_at: '2025-01-14T15:30:00Z'
          },
          {
            id: '3',
            date: '2025-01-13',
            phone: '01998765432',
            details: 'Rocket',
            amount: 750,
            charge: 15,
            total_amount: 765,
            created_at: '2025-01-13T14:20:00Z'
          }
        ];
        
        // Calculate summary
        const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
        const totalCharges = mockTransactions.reduce((sum, t) => sum + t.charge, 0);
        const netTotal = mockTransactions.reduce((sum, t) => sum + t.total_amount, 0);
        
        setTransactions(mockTransactions);
        setSummaryData({
          totalAmount,
          totalCharges,
          netTotal,
          transactionCount: mockTransactions.length
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Overview of your financial activities</p>
          </div>
          
          <SummaryCards data={summaryData} loading={loading} />
          
          <TransactionTable transactions={transactions} loading={loading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;