import React from 'react';

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  placeholder = "", 
  value, 
  onChange, 
  required = false, 
  disabled = false 
}) => (
  <div className="mb-3">
    <label className="block text-black text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none resize-vertical ${disabled ? 'bg-gray-100' : ''}`}
      />
    ) : type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none ${disabled ? 'bg-gray-100' : ''}`}
      >
        <option value="">Select {label}</option>
        {placeholder.split(',').map(option => (
          <option key={option.trim()} value={option.trim()}>{option.trim()}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-primaryBlue rounded-lg focus:ring-2 focus:ring-primaryBlue focus:border-transparent outline-none ${disabled ? 'bg-gray-100' : ''}`}
      />
    )}
  </div>
);

export default FormField;