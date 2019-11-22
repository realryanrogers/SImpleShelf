import axios from "axios";
import jwt_decode from "jwt-decode";
import Auth from "./Auth";

class User {
  static getUserInfoo(jwt) {
    axios
      .get("/users/" + this.decodeUserId(jwt), {
        withCredentials: true,
        headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}` }
      })
      .then(response => {
        if (response.data.status === "success") {
          return response.data.user;
        }
      })
      .catch(error => {});
  }

  static getUserInfo = async jwt => {
    if (Auth.isLoggedIn()) {
      const response = await axios.get("/users/" + this.decodeUserId(jwt), {
        withCredentials: true,
        headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}` }
      });
      return response.data.user;
    }
  };

  static getUserRatings = async jwt => {
    if (Auth.isLoggedIn()) {
      const response = await axios.get("/ratings", {
        withCredentials: true,
        headers: { "HTTP-AUTHORIZATION": `Bearer ${jwt}` }
      });
      return response;
    }
  };

  static decodeUserId(jwt) {
    let decoded = jwt_decode(jwt);
    return decoded["user"];
  }
}

export default User;
