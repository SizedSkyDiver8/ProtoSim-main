function SelectFieldWithLabel({ label, options }) {
  return (
    <div className="input-field-with-label">
      <label htmlFor="">{label}:</label>
      <select className="select-message" name="" id="">
        {options.map((option) => ( <option key={option.value}>{option.field_name}</option>))}
      </select>
    </div>
  );
}

export default SelectFieldWithLabel;
