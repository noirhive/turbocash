import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const settingsSchema = z.object({
  chargePercentage: z.number().min(0, 'Charge percentage must be at least 0').max(10, 'Charge percentage cannot exceed 10')
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface SettingsProps {
  userEmail: string;
  userRole: 'admin' | 'user';
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  userEmail, 
  userRole, 
  onLogout, 
  darkMode, 
  toggleDarkMode 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      chargePercentage: 2
    }
  });

  // Check if user is admin
  if (userRole !== 'admin') {
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400">You don't have permission to access this page.</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Load current settings
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        // Mock API call - replace with Supabase query
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock current charge percentage
        const currentChargePercentage = 2;
        setValue('chargePercentage', currentChargePercentage);
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [setValue]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true);
    try {
      // Mock API call - replace with Supabase update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage system configuration (Admin only)</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">System Settings</h2>
            
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="chargePercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transaction Charge Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="chargePercentage"
                      step="0.1"
                      min="0"
                      max="10"
                      {...register('chargePercentage', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white pr-8"
                      placeholder="2.0"
                    />
                    <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                  </div>
                  {errors.chargePercentage && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.chargePercentage.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Applies to bKash, Nagad, and Rocket transactions. Range: 0-10%
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </form>
            )}
          </div>

          {/* System Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">User Limits:</span>
                <span className="ml-2 text-gray-900 dark:text-white">3 Admins, 3 Users (Total: 6)</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Current Users:</span>
                <span className="ml-2 text-gray-900 dark:text-white">4 of 6</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Charge Types:</span>
                <span className="ml-2 text-gray-900 dark:text-white">bKash, Nagad, Rocket</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Free Types:</span>
                <span className="ml-2 text-gray-900 dark:text-white">Flexiload, Data, Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;