import { ModelError } from "../../protocols/error-protocol.js";

function titleAlreadyExist(): ModelError {
  return {
    code: 409,
    name: "titleAlreadyExist",
    message: "Title Already Exists!",
  };
}

function credentialDoesNotExist(): ModelError {
  return {
    code: 404,
    name: "credentialDoesNotExist",
    message: "This credential does not exist!",
  };
}
function userDoesNotExist(): ModelError {
  return {
    code: 401,
    name: "userDoesNotExist",
    message: "User does not exist!",
  };
}

const credentialErrors = {
  titleAlreadyExist,
  credentialDoesNotExist,
  userDoesNotExist
};

export default credentialErrors;
