import { ModelError } from "../../protocols/error-protocol.js";

function userDoesNotExist(): ModelError {
  return {
    code: 401,
    name: "userDoesNotExist",
    message: "User does not exist",
  };
}

function emailAndPasswordRequired(): ModelError {
  return {
    code: 422,
    name: "emailAndPasswordRequired",
    message: "Please, fill in all fields correctly!",
  };
}
function wrongEmailOrPassword(): ModelError {
  return {
    code: 422,
    name: "wrongEmailOrPassword",
    message: "Wrong Email or Password!",
  };
}

const signInErrors = {
  userDoesNotExist,
  emailAndPasswordRequired,
  wrongEmailOrPassword,
};

export default signInErrors;
