const RadioGroupField = ({ label, name, options, value, onChange }) => {
    return (
      <div>
        <label className="font-bold">{label}</label>
        <div className="flex flex-col mt-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default RadioGroupField;
  