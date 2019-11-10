import axios from "axios";
import Auth from "./Auth";

class BookAPI {
  static bookSearch = async term => {
    if (Auth.isLoggedIn()) {
      const response = await axios.get("/booksearch?term=" + term, {
        withCredentials: true,
        headers: {
          "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      return response;
    }
  };

  static openLibSearch = async term => {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${term}`
    );
    return response;
  };

  static getBook = async isbn => {
    const response = await axios.get(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    return response;
  };
}

export default BookAPI;
