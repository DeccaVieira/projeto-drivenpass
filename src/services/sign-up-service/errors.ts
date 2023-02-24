import { ModelError } from "../../protocols/error-protocol";

function emailAlreadyExists(): ModelError {
  return {
    code: 409,
    name: "EmailAlreadyExists",
    message: "Email ALready exists in our database",
  };
}

function emailAndPasswordRequired(): ModelError {
  return {
    code: 422,
    name: "emailAndPasswordRequired",
    message: "Please, fill in all fields correctly!",
  };
}

const signUpErrors = {
  emailAlreadyExists, emailAndPasswordRequired
}

export default signUpErrors;