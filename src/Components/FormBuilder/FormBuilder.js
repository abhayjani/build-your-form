import React from 'react';
import './FormBuilder.css';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [fieldLabel, setFieldLabel] = useState('');

  const addField = () => {
    setFormFields([...formFields, { label: fieldLabel }]);
    setFieldLabel('');
  };
  // You will implement the form builder functionality here
  return (
    <div className="form-builder">
      <div className="form-builder-controls">
        <input
          type="text"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
          placeholder="Field Label"
        />
        <button onClick={addField}>Add Field</button>
      </div>
      <div className="form-builder-preview">
        {formFields.map((field, index) => (
          <div key={index} className="form-builder-field">
            <label>{field.label}</label>
            <input type="text" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FormBuilder;
