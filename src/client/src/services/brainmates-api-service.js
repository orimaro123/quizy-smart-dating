import axios from "axios";
import { headers } from "./headers";

export default class BrainmatesApiService {
  static async getBrainmates(id) {
    try {
      const response = await axios.get(`/api/brainmates/${id}`,{
        headers: headers
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async postUserLike(userLikeBody){
    try {
      const response = await axios.post(`/api/brainmates/like/`, {
        ...userLikeBody
      }, {
        headers: headers
      });
      return response.data;
    }
    catch (error) {
      throw new Error(error.message);
    }
  }
}
