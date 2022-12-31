const InputFormGroup = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group my-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className={["form-control", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      />
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default InputFormGroup;
