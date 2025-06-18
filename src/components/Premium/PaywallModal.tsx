import React, { useState } from 'react';
import { X, Crown, Check, Star } from 'lucide-react';
import { showPaywall } from '../../lib/integrations/revenuecat';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  creatorName: string;
  onPurchaseSuccess: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  creatorName,
  onPurchaseSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (productId: string) => {
    setLoading(true);
    try {
      const success = await showPaywall(productId);
      if (success) {
        onPurchaseSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <Crown className="text-yellow-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Content</h2>
          <p className="text-gray-600">
            "{videoTitle}" by {creatorName} is premium content
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <div className="flex items-center space-x-2 mb-2">
              <Crown size={20} className="text-yellow-600" />
              <span className="font-semibold text-gray-900">Premium Access</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>Access to all premium videos</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>High-quality downloads</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check size={16} className="text-green-500" />
                <span>Ad-free experience</span>
              </li>
            </ul>
            <div className="mt-3 text-center">
              <span className="text-2xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handlePurchase('premium')}
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe to Premium'}
          </button>
          
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Continue with Free Content
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Free content remains completely free. Premium subscriptions support creators.
        </p>
      </div>
    </div>
  );
};

export default PaywallModal;