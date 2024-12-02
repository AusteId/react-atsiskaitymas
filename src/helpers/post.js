import axios from "axios";
const url = "http://localhost:5000/books";

export const postdata = async (data) => {

    let response = await axios.post(url, data);
    return response.data;

};

