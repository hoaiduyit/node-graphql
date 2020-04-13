import React from 'react';
import { Input } from 'antd';

const InputForm = ({ label, className = '', value, onChange, keyName }) => {
  return (
    <div className={`custom-form-input ${className}`}>
      <label>{label}</label>
      <Input value={value} onChange={(e) => onChange(e, keyName)} />
    </div>
  );
};

export default InputForm;
