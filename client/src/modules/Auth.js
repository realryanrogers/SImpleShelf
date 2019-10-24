class Auth {

  static isLoggedIn() {
    if (localStorage.getItem("jwt")) {
      return true;
    } else {
      return false
    }
  }

  


}
export default Auth;
