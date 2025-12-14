import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SummaryCards from '../components/SummaryCards';
import TransactionTable from '../components/TransactionTable';
import { supabase } from '../lib/supabase';

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
        setLoading(true);

        // 1️⃣ Get logged-in user
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !authData.user) {
          throw new Error('User not authenticated');
        }

        // 2️⃣ Fetch transactions for this user
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', authData.user.id)
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        const transactionsData = data || [];

        // 3️⃣ Calculate summary
        const totalAmount = transactionsData.reduce(
          (sum, t) => sum + Number(t.amount),
          0
        );

        const totalCharges = transactionsData.reduce(
          (sum, t) => sum + Number(t.charge),
          0
        );

        const netTotal = transactionsData.reduce(
          (sum, t) => sum + Number(t.total_amount),
          0
        );

        setTransactions(transactionsData);
        setSummaryData({
          totalAmount,
          totalCharges,
          netTotal,
          transactionCount: transactionsData.length
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of your financial activities
            </p>
          </div>

          <SummaryCards data={summaryData} loading={loading} />

          <TransactionTable
            transactions={transactions}
            loading={loading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
