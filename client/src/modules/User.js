import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Auth from './Auth'

class User {
  static getUserInfoo(jwt) {
    console.log("return value: ", this.decodeUserId(jwt))
    axios.get(
    "http://localhost:3001/users/" + this.decodeUserId(jwt),
    { withCredentials: true, headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}`} }
  ).then(response => {
    if (response.data.status === 'success') {
      console.log("response: ", response.data.user)
      return response.data.user;
    }
  }).catch(error => {
    console.log("Unable to fetch error", error);
  });
  }

  static getUserInfo = async jwt => {
    if (Auth.isLoggedIn()) {
      const response = await axios.get(
      "http://localhost:3001/users/" + this.decodeUserId(jwt),
      { withCredentials: true, headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}`} }
      );
      return response.data.user;
    }
  }


  static decodeUserId(jwt) {
    console.log("Decoding", jwt)
    let decoded = jwt_decode(jwt)
    console.log("decoded JWT: ", decoded["user"])
    return decoded["user"]
  }
}

export default User
