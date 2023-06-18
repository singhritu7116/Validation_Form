import { useState, useEffect } from "react";
import "./App.css";
// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';

 
function App() {
  const initialValues = { username: "", email: "", password: "" ,confirm_password :"",phone_no :""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
//   var downloadTable = () => {
//     var doc = new jsPDF();
    
//     autoTable(doc, {  });
//     doc.save('Form_Data.pdf') 
// }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      document.write("The data entered by the user are as follow: <br> "+JSON.stringify(formValues));
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = alert("Username is required!");
    }
    if (!values.email) {
      errors.email = alert("Email is required!");
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (values.phone_no.length < 10) {
      errors.phone_no = "Phone number should be atleast of 10 characters";
    }
    if (!values.password) {
      errors.password = alert("Password is required");
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    
    if (!values.confirm_password) {
      errors.confirm_password= alert("Password confirmation is required.");
    }
    if(values.password!==values.confirm_password){
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };
  
  
  return (
    
    <div className="container" >
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ok" ></div>
      ) : (
        <pre>{JSON.stringify( undefined, 2)}</pre>
      )} */}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form" id="output" >
          <div className="field">
            <label>Username*</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email*</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Phone Number</label>
            <input
              type="number"
              name="phone_no"
              placeholder="Phone Number"
              value={formValues.phone_no}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone_no}</p>
          <div className="field">
            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm_Password*</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm_password"
              value={formValues.confirm_password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.confirm_password}</p>
          <button className="fluid ui button blue" >Submit</button>
          
        </div>
      </form>
    </div>
  );
}
export default App;