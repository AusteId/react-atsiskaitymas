import axios from "axios";
import { getById } from "./get";

const url = "http://localhost:5000/books";

export const deleteData = async (id) => {
  const { firstName, lastName } = await getById(id); 
  const confirmed = window.confirm(
    `Ar tikrai norite ištrinti vartotoją ${firstName} ${lastName}?`
  ); 
  if (!confirmed) return; 

  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};
