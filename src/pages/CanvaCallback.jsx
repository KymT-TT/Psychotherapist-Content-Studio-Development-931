import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiLoader, FiCheck, FiX } = FiIcons;

const CanvaCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // processing, success, error

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`OAuth authorization error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Since we're now using AI prompt generation instead of Canva API,
        // this callback is not needed, but we'll handle it gracefully
        setStatus('success');
        toast.success('Redirecting back to template gallery...');
        
        // Redirect back to template gallery after 2 seconds
        setTimeout(() => {
          navigate('/template-gallery');
        }, 2000);

      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        toast.error('Redirecting back to template gallery...');
        
        // Redirect back to template gallery after 3 seconds
        setTimeout(() => {
          navigate('/template-gallery');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            {status === 'processing' && (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiLoader} className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            
            {status === 'success' && (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
              </div>
            )}
            
            {status === 'error' && (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiX} className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {status === 'processing' && 'Processing...'}
            {status === 'success' && 'Redirecting...'}
            {status === 'error' && 'Redirecting...'}
          </h2>

          <p className="text-gray-600 mb-4">
            {status === 'processing' && 'Please wait while we process your request.'}
            {status === 'success' && 'Taking you back to the AI prompt generator.'}
            {status === 'error' && 'Taking you back to the template gallery.'}
          </p>

          {status === 'success' && (
            <div className="text-sm text-gray-500">
              Redirecting you back to the template gallery...
            </div>
          )}

          {status === 'error' && (
            <div className="text-sm text-gray-500">
              Taking you back to the template gallery...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvaCallback;