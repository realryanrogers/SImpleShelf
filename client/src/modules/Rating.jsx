import axios from "axios";
import NavLink from "react-bootstrap/NavLink";

class Rating {
  static addRating = async rating => {
    const jwt = localStorage.getItem("jwt");
    console.log(`Bearer ${jwt}`);
    const data = {};
    const headers = {
      "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
    };
    const response = await axios.post("/ratings", rating, {
      withCredentials: true,
      headers: headers
    });
    return response;
  };

  static getRatings = async () => {
    const headers = {
      "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
    };
    const response = await axios.get("/ratings", {
      withCredentials: true,
      headers: headers
    });
    return response;
  };

  static build = (data, shelf) => {
    const rating = {};
    rating.media_type = "book";
    rating.ratingtype = shelf;
    rating.google_id = data.google_id;
    if (data.value) {
      rating.value = data.value;
    }
    if (data.review) {
      rating.review = data.review;
    }
    return rating;
  };
}

export default Rating;
