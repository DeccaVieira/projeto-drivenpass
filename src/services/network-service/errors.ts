import { ModelError } from "../../protocols/error-protocol";

function networkDoesNotExist(): ModelError {
  return {
    code: 404,
    name: "networkDoesNotExist",
    message: "This network does not exist!",
  };
}
function userDoesNotExist(): ModelError {
  return {
    code: 401,
    name: "userDoesNotExist",
    message: "User does not exist!",
  };
}

const networkErrors = {
  networkDoesNotExist,
  userDoesNotExist
};

export default networkErrors;
