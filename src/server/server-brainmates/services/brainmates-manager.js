const { Like, User } = require('../../db/models');
const { getMatchingUserInfo } = require ('../../server-matching/services/matching-manager')

async function postUserLike(firstUserId, secondUserId, firstUserLikesSecondUser) {
  const result = await Like.upsert({
    firstUserId: firstUserId,
    secondUserId: secondUserId,
    firstUserLikesSecondUser: firstUserLikesSecondUser
  });
  return result;
}

async function getBrainmatesForUser(userId) {
  const likeBack = [];
  const pending = [];
  const dislikeBack = [];
  const likes = await Like.findAll({
    where: {
      firstUserId: userId,
      firstUserLikesSecondUser: true
    },
    include: User
  });
  for (const like of likes) {
    const brainmate = like.User;
    const brainmateInfo = await getMatchingUserInfo(brainmate);
    try {
      const likeBack = await getIsLikeFromTo(like.secondUserId, userId)
      brainmateInfo.status = likeBack ? 'likeBack' : 'dislikeBack';
    } catch (error) {
      brainmateInfo.status = 'pending';
    }
    switch (brainmateInfo.status) {
      case 'likeBack':
        brainmateInfo.phoneNumber = brainmate.phoneNumber;
        likeBack.push(brainmateInfo);
        break;
      case 'pending':
        brainmateInfo.phoneNumber = '*********';
        pending.push(brainmateInfo);
        break;
      case 'dislikeBack':
        brainmateInfo.phoneNumber = '*********';
        dislikeBack.push(brainmateInfo);
        break;

      default:
        break;
    }
  }
  return {
    likeBack: likeBack,
    pending: pending,
    dislikeBack: dislikeBack
  };
}

async function getIsLikeFromTo(likeFromUserId, likeToUserId){
  const likeInfo = await Like.findOne({
    where: {
      firstUserId: likeFromUserId,
      secondUserId: likeToUserId,
    }
  });
  return likeInfo.firstUserLikesSecondUser;
}

module.exports = {
  postUserLike,
  getBrainmatesForUser,
  getIsLikeFromTo
};
