import React from 'react';
import SafeIcon from '../../common/SafeIcon';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SafeIcon icon={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            block w-full rounded-xl border-gray-300 shadow-sm
            focus:border-primary-500 focus:ring-primary-500
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            transition-colors duration-200
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;