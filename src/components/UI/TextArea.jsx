import React from 'react';

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
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
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          block w-full rounded-xl border-gray-300 shadow-sm
          focus:border-primary-500 focus:ring-primary-500
          px-4 py-3 resize-none
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
          transition-colors duration-200
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;