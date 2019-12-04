import axios from "axios";
import BookAPI from "./BookAPI";

class Shelving {
  static addToShelf = async data => {
    const headers = {
      "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
    };

    const response = await axios.post("/books", data, {
      withCredentials: true,
      headers: headers
    });
    return response;
  };

  static build = async data => {
    const bookData = await BookAPI.getBook(data.google_id);
    console.log("BookData!", bookData);
    if (data.value === "Wishlist") {
      data.shelf = "Wishlist";
      data.rating = {};
    } else {
      data.shelf = "Rated";
      data.rating = {};
      data.rating.value = data.value;
      data.rating.review = data.review;
    }
    var isbnObj = bookData.volumeInfo.industryIdentifiers.find(
      o => o.type === "ISBN_13"
    );
    var isbn = "";
    if (typeof isbnObj === "undefined") {
      isbnObj = bookData.volumeInfo.industryIdentifiers.find(
        o => o.type === "ISBN_10"
      );
      if (typeof isbnObj === "undefined") {
        isbn = "";
      } else {
        isbn = isbnObj.identifier;
      }
    } else {
      isbn = isbnObj.identifier;
    }

    const rating = {
      book_identifier: data.google_id,
      shelf: data.shelf,
      rating: data.rating,
      title: bookData.volumeInfo.title,
      author: bookData.volumeInfo.authors[0],
      isbn: isbn
    };
    return rating;
  };
}

export default Shelving;
