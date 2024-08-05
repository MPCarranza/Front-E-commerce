interface ValidationErrors {
    email?: string;
    password?: string;
  }
  
  export const validateLoginForm = (email: string, password: string): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    if (!email) {
      errors.email = 'Email is required!';
    }
  
    if (!password) {
      errors.password = 'Password is required!';
    }
  
    return errors;
  };