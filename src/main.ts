// import "./style.css";
import { Conference } from "./Conference/Conference";
import { Schedule } from "./Schedule/Schedule";
import { ScoreInformation } from "./ScoreInformation/ScoreInformation";
import { DisplayInfo } from "./DisplayInfo/DisplayInfo";

const selected_year: number | null = Number(
  prompt("Choose the year you want the races in? (Any year after 1970): ")
);

const conference1 = new Conference(1);
console.log(conference1);

const sched1 = new Schedule(selected_year, conference1);
console.log(sched1);

const score_info = new ScoreInformation(conference1);
console.log(score_info);

const displayInfo1 = new DisplayInfo(conference1, score_info);

// Current todo!
// - Consider having the Running Season Info as a pop-in from the side?
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Look at creating a form for users to choose year, runner name, etc
// - Look at creating a selection section to choose specific racers and teams to get details on
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
