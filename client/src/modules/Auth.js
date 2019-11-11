import axios from "axios";

class Auth {
  static isLoggedIn() {
    if (localStorage.getItem("jwt")) {
      return true;
    } else {
      return false;
    }
  }

  static sendRecoveryEmail = email => {
    axios.post(`/password_resets?email=${email}`);
  };
}
export default Auth;
