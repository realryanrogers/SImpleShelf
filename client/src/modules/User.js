import axios from 'axios';
import jwt_decode from 'jwt-decode';

class User {
  static getUserInfo(jwt) {
    console.log("return value: ", this.decodeUserId(jwt))
    axios.get(
    "http://localhost:3001/users/" + this.decodeUserId(jwt),
    { withCredentials: true, headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}`} }
  ).then(response => {
    if (response.data.status === 'success') {
      console.log("response: ", response)
      return response.data.user;
    }
  }).catch(error => {
    console.log("Unable to fetch error", error);
  });
  }


  static decodeUserId(jwt) {
    console.log("Decoding", jwt)
    let decoded = jwt_decode(jwt)
    console.log("decoded JWT: ", decoded["user"])
    return decoded["user"]
  }
}

export default User
