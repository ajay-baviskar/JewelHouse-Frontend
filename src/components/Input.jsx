const Input = ({ label, type = "text", ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} {...props} />
  </div>
);

export default Input;
