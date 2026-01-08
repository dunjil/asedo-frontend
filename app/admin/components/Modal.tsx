import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type,
  autoClose = false,
  autoCloseDelay = 3000
}: ModalProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-[#00A89D]/10',
          borderColor: 'border-[#00A89D]/20',
          iconColor: 'text-[#00A89D]',
          buttonColor: 'bg-[#00A89D] hover:bg-[#009890]',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          buttonColor: 'bg-red-600 hover:bg-red-700',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      case 'info':
        return {
          bgColor: 'bg-[#0A1E3F]/10',
          borderColor: 'border-[#0A1E3F]/20',
          iconColor: 'text-[#0A1E3F]',
          buttonColor: 'bg-[#0A1E3F] hover:bg-[#1a2a4a]',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          buttonColor: 'bg-gray-600 hover:bg-gray-700',
          icon: null
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-[#0A1E3F]/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-[#0A1E3F] to-[#1a2a4a] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${styles.bgColor} border ${styles.borderColor}`}>
                  <div className={styles.iconColor}>
                    {styles.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-montserrat">{title}</h3>
                  <div className="w-12 h-1 bg-[#00A89D] rounded-full mt-2"></div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8 bg-white">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${styles.bgColor} mt-1`}>
                <div className={styles.iconColor}>
                  {styles.icon}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-base leading-relaxed font-openSans break-words">
                  {message}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-8 py-3 text-white font-semibold rounded-xl transition-all duration-200 ${styles.buttonColor} hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#00A89D]/25`}
            >
              {type === 'success' ? 'Perfect!' : type === 'error' ? 'Try Again' : 'Got it'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
