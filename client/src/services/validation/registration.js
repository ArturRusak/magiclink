import * as yup from 'yup';

const registrationScheme = yup.object().shape({
  nickName: yup.string().required('Nick name is required'),
  userName: yup.string().required('User name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirmation of password is required')
});

const validateRegistration = (formData) => {
  return registrationScheme.validate(formData, {abortEarly: false});
};

export default validateRegistration;