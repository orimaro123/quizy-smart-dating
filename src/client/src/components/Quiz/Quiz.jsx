import "./quiz.css";
import BasicQuestion from "./BasicQuestion/BasicQuestion";
import ProgressBar from "./ProgressBar/ProgressBar";
import HeartLoader from "./HeartLoader/HeartLoader";
import Heart from "./Heart/Heart";
import AnswersApiService from "../../services/answers-api-service";
import { useEffect } from "react";

export default function Quiz({
  fetchNewQuestions,
  questions,
  MOCK_USER_ID,
  answersArray,
  addAnswer,
  questionIndex,
  incrementQuestionIndex,
  incrementAnswersIndex,
  questionsLoading,
  clearAnswersArray,
  updateQuote,
  quote,
}) {
  //TODO post distances
  //TODO pop up ***play again** or go to **heart button in brainmates**
  //When pressed play again, load more questions
  const isFinished = questions.length && answersArray.length === questions.length;
  useEffect(() => {
    if (!questions.length) {
      fetchNewQuestions();
      updateQuote();
    }
    if (isFinished) {
      AnswersApiService.postAnswers(answersArray);
      console.log(quote);
      console.log("you should remove questions once succeeded");
      console.log("you should remove pop up the heart page");
    }
  }, [fetchNewQuestions, questions, answersArray, clearAnswersArray, isFinished]);

  return (
    <div className="quiz-container">
      <ProgressBar progressPercentage={(questionIndex / questions.length) * 100} />
      {questionsLoading
        ? (<HeartLoader />)
        : console.log("stop loader")}
      {!isFinished ? (
        <BasicQuestion
          question={questions[questionIndex] ? questions[questionIndex] : ""}
          MOCK_USER_ID={MOCK_USER_ID}
          incrementAnswersIndex={incrementAnswersIndex}
          answersArray={answersArray}
          addAnswer={addAnswer}
          incrementQuestionIndex={incrementQuestionIndex}
          questionIndex={questionIndex}
        />
      ) : (
        <Heart quote={quote} />
      )}
    </div>
  );
}
