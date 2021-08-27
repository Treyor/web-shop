const checkRequired = (data, required) => {
  if (required) {
    if (data.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const minLengthValidation = (data, minLength) => {
  if (data.length > minLength) {
    return true;
  } else {
    return false;
  }
};

const maxLengthValidation = (data, maxLength) => {
  if (data.length < maxLength) {
    return true;
  } else {
    return false;
  }
};

const validationPattern = (data, pattern) => {
  if (pattern.test(String(data).toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

const passwordValidation = (pass, confirm) => {
  if (pass === confirm) {
    return true;
  } else {
    return false;
  }
};

export const validateFields = (data, stateObject, callback) => {
  let arr = [];

  let validationNames = Object.keys(data);
  let validationRule = Object.values(data);

  validationNames.map((validation, index) => {
    switch (validation) {
      case "isRequired":
        arr.push(checkRequired(stateObject, validationRule[index]));
        break;
      case "minLength":
        arr.push(minLengthValidation(stateObject, validationRule[index]));
        break;
      case "maxLength":
        arr.push(maxLengthValidation(stateObject, validationRule[index]));
        break;
      case "pattern":
        arr.push(validationPattern(stateObject, validationRule[index]));
        break;
      case "comparePassword":
        arr.push(passwordValidation(stateObject, validationRule[index]));
        break;
      default:
        break;
    }
  });

  if (arr.every((item) => item === true)) {
    callback(true);
  } else {
    callback(false);
  }
};
