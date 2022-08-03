import axios from "axios";
export default class BrainmatesApiService {
  static async getBrainmates(id) {
    try {
      const response = await axios.get(`/brainmates/${id}`);
      const brainmates = await response.data;
      return brainmates;
    } catch (error) {
      console.log("Error:", error.message);
      // throw new Error(error.message);
    }
  }

  static async postUserLike(userLikeBody){
    try {
      const response =  await fetch(`/brainmates/like/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLikeBody),
    });
      return response.data;
    }
    catch (error) {
      console.log("Error:", error.message);
      // throw new Error(error.message);
    }
  }
/* }

static async postUserLike(userLikeBody){
  try {
    const response = await axios.post({
      url: `/brainmates/like/`,
      body: userLikeBody,
  });
    return response.data;
  }
  catch (error) {
    console.log("Error:", error.message);
    // throw new Error(error.message);
  }
} */

}
