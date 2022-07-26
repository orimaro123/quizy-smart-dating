import actionTypes from "./constants";
import BrainmatesApiService from "../../services/brainmates-api-service";

const postUserLikeRequest = () => ({
  type: actionTypes.POST_USER_LIKE_REQUEST,
});

const postUserLikeSuccess = () => ({
  type: actionTypes.POST_USER_LIKE_SUCCESS,
});

const postUserLikeFailure = (errorMessage) => ({
  type: actionTypes.POST_USER_LIKE_FAILURE,
  payload: errorMessage,
});

export const postUserLikeAction = (
  currentUserId,
  suggestedUserId,
  currentUserDecision
) => {
  return async (dispatch) => {
    dispatch(postUserLikeRequest());
    try {
      const postUserLikeBody = {
        firstUserId: currentUserId,
        secondUserId: suggestedUserId,
        firstUserLikesSecondUser: currentUserDecision,
      };
      await BrainmatesApiService.postUserLike(postUserLikeBody);
      dispatch(postUserLikeSuccess());
    } catch (e) {
      dispatch(postUserLikeFailure(e.message));
    }
  };
};
