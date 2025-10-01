export const validationRules = {
  fullname: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Full name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Full name must be less than 50 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    },
  },
  confirmPassword: {
    required: "Please confirm your password",
  },
};
