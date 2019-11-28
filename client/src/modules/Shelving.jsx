import React, { Component } from "react";
import axios from "axios";

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

  static build = data => {
    console.log(data);
    if (data.value === "Wishlist") {
      data.shelf = "Wishlist";
      data.rating = {};
    } else {
      data.shelf = "Rated";
      data.rating = {};
      data.rating.value = data.value;
      data.rating.review = data.review;
    }

    const rating = {
      book_identifier: data.google_id,
      shelf: data.shelf,
      rating: data.rating
    };
    return rating;
  };
}

export default Shelving;
