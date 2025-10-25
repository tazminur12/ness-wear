import React from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 font-body mt-2">Manage payment processing and transactions.</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-12">
          <CreditCardIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 font-body mb-2">Payment Management</h3>
          <p className="text-gray-600 font-body">Payment processing system coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Payments;
