// import "./style.css";
import { Conference } from "./Conference/Conference";
import { Schedule } from "./Schedule/Schedule";
import { ScoreInformation } from "./ScoreInformation/ScoreInformation";
import { DisplayInfo } from "./DisplayInfo/DisplayInfo";

const revealButton = document.getElementById("how-it-works-reveal-button");
const howItWorksList = document.getElementById("how-it-works-list");
revealButton?.addEventListener("click", () => {
  if (howItWorksList) {
    if (
      howItWorksList?.style.display === "none" ||
      howItWorksList?.style.display === ""
    ) {
      howItWorksList.style.display = "block";
      revealButton.textContent = "Collapse";
    } else {
      howItWorksList.style.display = "none";
      revealButton.textContent = "Expand";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user-form") as HTMLFormElement;
  userForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const yearInput = (document.getElementById("year") as HTMLInputElement)
      .value;
    console.log(yearInput);

    const conference1 = new Conference(1);
    console.log(conference1);

    const sched1 = new Schedule(Number(yearInput), conference1);
    console.log(sched1);

    const score_info = new ScoreInformation(conference1);
    console.log(score_info);

    const displayInfo1 = new DisplayInfo(conference1, score_info);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const runnerReview = document.getElementById("runner-review");

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  });
});

// const selected_year: number | null = Number(
//   prompt("Choose the year you want the races in? (Any year after 1970): ")
// );
// const selected_year = 2100;

// const conference1 = new Conference(1);
// console.log(conference1);

// const sched1 = new Schedule(selected_year, conference1);
// console.log(sched1);

// const score_info = new ScoreInformation(conference1);
// console.log(score_info);

// const displayInfo1 = new DisplayInfo(conference1, score_info);

// Current todo!
// - Consider having the Running Season Info as a pop-in from the side?
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Look at creating a form for users to choose year, runner name, etc
// - Look at creating a selection section to choose specific racers and teams to get details on
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
// - Choose random runner to display and give option to pull up info about any runner?
// - Animate the "How it works" section expand/collapse if you want
