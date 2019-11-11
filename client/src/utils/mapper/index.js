/**
 * Convert array list of errors to Object with input fields keys
 * @param {Array} errorsList - array from yup validation
 * @returns {Object} - Object with fields name keys
 */
export const errorsToObj = (errorsList) => Object.assign({}, ...errorsList.map(error => ({[error.path]: error.message})));