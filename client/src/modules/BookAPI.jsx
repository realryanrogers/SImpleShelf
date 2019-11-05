import Axios from "axios";

export default Axios.create({
  baseURL: "https://openlibrary.org/search.json?q="
});
