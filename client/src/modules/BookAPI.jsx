import axios from "axios";
import Auth from "./Auth";

class BookAPI {
  static bookSearch = async term => {
    if (Auth.isLoggedIn()) {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=40`
      );
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
      // `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      `https://www.googleapis.com/books/v1/volumes?q=ISBN:${isbn}&maxResults=1`
    );
    return response;
  };
}

export default BookAPI;
