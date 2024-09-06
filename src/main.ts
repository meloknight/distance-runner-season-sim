import "./style.css";
import { Conference } from "./Conference/Conference";
import { Schedule } from "./Schedule/Schedule";
import { ScoreInformation } from "./ScoreInformation/ScoreInformation";
import { DisplayInfo } from "./DisplayInfo/DisplayInfo";

// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

const conference1 = new Conference(1);
console.log(conference1);

const sched1 = new Schedule(2024, conference1);
console.log(sched1);

const accumulated_scores = new ScoreInformation(conference1);
console.log(accumulated_scores);

const displayInfo1 = new DisplayInfo(conference1, accumulated_scores);

// Current todo!
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Add types to a bunch of things!
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
