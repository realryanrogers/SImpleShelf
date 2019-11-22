import axios from "axios";

class Rating {
  static addRating = async rating => {
    const headers = {
      "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
    };
    const response = await axios.post("/ratings", {
      withCredentials: true,
      headers: headers,
      rating: rating
    });
    return response;
  };

  static getRatings = async () => {
    const headers = {
      "HTTP-AUTHORIZATION": `Bearer ${localStorage.getItem("jwt")}`
    };
    const response = await axios.post("/ratings", {
      withCredentials: true,
      headers: headers
    });
    return response;
  };
}

export default Rating;
