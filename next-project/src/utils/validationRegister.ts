interface ValidationErrors {
    name?: string,
    email?: string,
    password?: string,
    address?: string,
    phone?: string,
  }
  
  export const validateRegisterForm = (name: string, email: string, password: string, address: string, phone: string): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    
    if (!name) {
        errors.name = 'Name is required!';
    }

    if (!email) {
      errors.email = 'Email is required!';
    }
  
    if (!password) {
      errors.password = 'Password is required!';
    }

    if (!address) {
        errors.address = 'Address is required!';
    }

    if (!phone) {
        errors.phone = 'Phone is required!';
    }
  
    return errors;
  };