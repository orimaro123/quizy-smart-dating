import style from "./suggestions.module.scss";
import SuggestionsCard from "./SuggestionsCard/SuggestionsCard";
import { Button } from "@mui/material";
import { useEffect } from "react";
import HeartLoader from "../../HeartLoader/HeartLoader";
import loveMomentSound from "../../../assets/sounds/loveMomentSound.mp3";

export default function Suggestions({
  suggestions,
  suggestionDistance,

  updateSuggestionDistanceAction,
  isLoading,
  userId,
  fetchNewSuggestionsAction,
  postUserLikeAction,
  fetchBrainmatesAction,
}) {
  const audio = new Audio(loveMomentSound);
  audio.loop = true;

  useEffect(() => {
    if (!Object.keys(suggestions).length) {
      fetchNewSuggestionsAction(userId);
    }
  }, [fetchNewSuggestionsAction, suggestions]);

  const DecisionHandler = (decision) => {
    let currentUserLikeSuggestedUser = null;
    if (decision === "✔️") {
      currentUserLikeSuggestedUser = true;
    } else {
      currentUserLikeSuggestedUser = false;
    }

    if (suggestionDistance === "closest") {
      console.log('suggestions', suggestions);
      if (currentUserLikeSuggestedUser && suggestions.closest.likeBack) {
        // audio.play()
        //audio.pause()
        console.log("We have a match!!!!!!!!");
      }
      postUserLikeAction(
        userId,
        suggestions.closest.userId,
        currentUserLikeSuggestedUser
      );

      fetchBrainmatesAction(userId);
      updateSuggestionDistanceAction("farthest");
      return;
    } else {
      if (currentUserLikeSuggestedUser && suggestions.farthest.likeBack) {
        // audio.play()
        //audio.pause()

        console.log("We have a match!!!!!!!!");
      }
      postUserLikeAction(
        userId,
        suggestions.farthest.userId,
        currentUserLikeSuggestedUser
      );

      //play again
      fetchBrainmatesAction(userId);
      updateSuggestionDistanceAction("brainmates");
    }
  };

  return isLoading ? (
    <>
      <HeartLoader /> <div>Loading suggestions</div>
    </>
  ) : (
    <div className={style.page_container}>
      {suggestionDistance === "closest" ? (
        <SuggestionsCard
          userName={suggestions?.closest?.username}
          suggestions={suggestions}
          age={suggestions?.closest?.age}
          bestResult={suggestions?.closest?.bestResultDescription}
          amountOfSamePersonalAnswers={suggestions?.closest?.amountOfSamePersonalAnswers}
          picture={suggestions?.closest?.picture}
        />
      ) : null}
      {suggestionDistance === "farthest" ? (
        <SuggestionsCard
          userName={suggestions.farthest.username}
          suggestions={suggestions}
          age={suggestions.farthest.age}
          bestResult={suggestions.farthest.bestResultDescription}
          amountOfSamePersonalAnswers={suggestions.farthest.amountOfSamePersonalAnswers}
          picture={suggestions.farthest.picture}
        />
      ) : null}
      <div className={style.buttons_container}>
        <div className={style.yes_no_btn_container} onClick={() => DecisionHandler("✔️")}>
          <Button variant="contained" style={{ backgroundColor: "lightBlue" }}>
            ✔️
          </Button>
        </div>
        <div
          className={style.yes_no_btn_container}
          onClick={() => {
            DecisionHandler("❌");
          }}
        >
          <Button variant="contained" style={{ backgroundColor: "lightBlue" }}>
            ❌
          </Button>
        </div>
      </div>
    </div>
  );
}


