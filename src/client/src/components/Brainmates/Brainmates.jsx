import "./brainmates.css";
import { useEffect } from "react";
import MateCard from "./MateCard/MateCard";

export default function Brainmates({ brainmates, fetcBrainmates }) {
  //temp: we should load globaly
  useEffect(() => {
    if (!!brainmates.length) fetcBrainmates(2);
  }, []);

  return (
    <div className="brain-mates-container">
      {Object.keys(brainmates.likeBack).map((brainmate, i) => {
        const current = brainmates.likeBack[brainmate];
        return (
          <MateCard
            key={`match` + i}
            status={"match"}
            userName={current.username}
            imgSrc={current.picture}
            achievements={current.bestResultDescription}
          />
        );
      })}
      {Object.keys(brainmates.pending).map((brainmate, i) => {
        const current = brainmates.pending[brainmate];
        return (
          <MateCard
            key={`pending` + i}
            status={"pending"}
            userName={current.username}
            achievements={current.bestResultDescription}
          />
        );
      })}
    </div>
  );
}
