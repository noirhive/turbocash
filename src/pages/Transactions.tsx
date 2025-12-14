import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionForm from '../components/TransactionForm';
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

interface TransactionsProps {
  userEmail: string;
  userRole: 'admin' | 'user';
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ 
  userEmail, 
  userRole, 
  onLogout, 
  darkMode, 
  toggleDarkMode 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load transactions
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        // Mock data - replace with Supabase query
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
          }
        ];
        
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleAddTransaction = async (transactionData: any) => {
    // Mock add transaction - replace with Supabase insert
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...transactionData,
      created_at: new Date().toISOString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Transactions</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your financial transactions</p>
          </div>
          
          <TransactionForm onSubmit={handleAddTransaction} />
          
          <TransactionTable transactions={transactions} loading={loading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Transactions;