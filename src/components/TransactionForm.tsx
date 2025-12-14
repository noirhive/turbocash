import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';

const transactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  phone: z.string().min(1, 'Phone number is required'),
  details: z.enum(['bKash', 'Nagad', 'Rocket', 'Flexiload', 'Data', 'Bank Transfer']),
  amount: z.number().min(0.01, 'Amount must be greater than 0')
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData & { charge: number; total_amount: number }) => Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [chargePercentage, setChargePercentage] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      details: 'bKash'
    }
  });

  const watchedValues = watch();
  const amount = watchedValues.amount || 0;
  const details = watchedValues.details;

  // Calculate charge based on transaction type
  const charge = ['bKash', 'Nagad', 'Rocket'].includes(details) 
    ? amount * (chargePercentage / 100) 
    : 0;
  const totalAmount = amount + charge;

  // Load charge percentage from settings (mock for now)
  useEffect(() => {
    // In real app, fetch from Supabase settings table
    const loadSettings = async () => {
      try {
        // Mock API call - replace with actual Supabase query
        setChargePercentage(2); // Default 2%
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

  const onFormSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        charge,
        total_amount: totalAmount
      });
      reset();
      toast.success('Transaction added successfully!');
    } catch (error) {
      toast.error('Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add New Transaction</h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              {...register('date')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="01XXXXXXXXX"
              {...register('phone')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transaction Type
            </label>
            <select
              id="details"
              {...register('details')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Flexiload">Flexiload</option>
              <option value="Data">Data</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {errors.details && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.details.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount (BDT)
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount.message}</p>
            )}
          </div>
        </div>

        {/* Live Preview */}
        {amount > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
              <span className="font-medium text-gray-900 dark:text-white">৳{amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600 dark:text-gray-400">Charge:</span>
              <span className="font-medium text-orange-600 dark:text-orange-400">৳{charge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="font-medium text-gray-900 dark:text-white">Total:</span>
              <span className="font-bold text-gray-900 dark:text-white">৳{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Adding Transaction...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;