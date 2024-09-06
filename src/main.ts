import "./style.css";
// import { boundedNormDist } from "./utility_functions";
import { Conference } from "./Conference/Conference";
// import { IndividualRace } from "./IndividualRace/IndividualRace";
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

// class DisplayInfo {
//   private overallTop3RunnersUL: HTMLElement | null;
//   private overallTop3TeamsUL: HTMLElement | null;
//   private top3Teams5kmUL: HTMLElement | null;
//   private top3Runners5kmUL: HTMLElement | null;
//   private top3Teams10kmUL: HTMLElement | null;
//   private top3Runners10kmUL: HTMLElement | null;
//   private top3TeamsHalfMarathonUL: HTMLElement | null;
//   private top3RunnersHalfMarathonUL: HTMLElement | null;
//   private top3TeamsMarathonUL: HTMLElement | null;
//   private top3RunnersMarathonUL: HTMLElement | null;
//   private top3Teams100MileUL: HTMLElement | null;
//   private top3Runners100MileUL: HTMLElement | null;

//   constructor() {
//     this.overallTop3TeamsUL = document.getElementById("overall-top-3-teams");
//     this.overallTop3RunnersUL = document.getElementById(
//       "overall-top-3-runners"
//     );
//     this.top3Teams5kmUL = document.getElementById("5km-top-3-teams");
//     this.top3Runners5kmUL = document.getElementById("5km-top-3-runners");
//     this.top3Teams10kmUL = document.getElementById("10km-top-3-teams");
//     this.top3Runners10kmUL = document.getElementById("10km-top-3-runners");
//     this.top3TeamsHalfMarathonUL = document.getElementById(
//       "half-marathon-top-3-teams"
//     );
//     this.top3RunnersHalfMarathonUL = document.getElementById(
//       "half-marathon-top-3-runners"
//     );
//     this.top3TeamsMarathonUL = document.getElementById("marathon-top-3-teams");
//     this.top3RunnersMarathonUL = document.getElementById(
//       "marathon-top-3-runners"
//     );
//     this.top3Teams100MileUL = document.getElementById("100mile-top-3-teams");
//     this.top3Runners100MileUL = document.getElementById(
//       "100mile-top-3-runners"
//     );
//     this.displayOverallTop3Teams();
//     this.displayRaceTypeTop3Teams(
//       this.top3Teams5kmUL,
//       "5 km",
//       accumulated_scores.team_5km_stats
//     );
//     this.displayRaceTypeTop3Teams(
//       this.top3Teams10kmUL,
//       "10 km",
//       accumulated_scores.team_10km_stats
//     );
//     this.displayRaceTypeTop3Teams(
//       this.top3TeamsHalfMarathonUL,
//       "half marathon",
//       accumulated_scores.team_half_marathon_stats
//     );
//     this.displayRaceTypeTop3Teams(
//       this.top3TeamsMarathonUL,
//       "marathon",
//       accumulated_scores.team_marathon_stats
//     );
//     this.displayRaceTypeTop3Teams(
//       this.top3Teams100MileUL,
//       "100 mile",
//       accumulated_scores.team_100mile_stats
//     );
//     this.displayOverallTop3Runners();
//     this.displayRaceTypeTop3Runners(
//       this.top3Runners5kmUL,
//       "5 km",
//       accumulated_scores.runner_5km_stats
//     );
//     this.displayRaceTypeTop3Runners(
//       this.top3Runners10kmUL,
//       "10 km",
//       accumulated_scores.runner_10km_stats
//     );
//     this.displayRaceTypeTop3Runners(
//       this.top3RunnersHalfMarathonUL,
//       "half marathon",
//       accumulated_scores.runner_half_marathon_stats
//     );
//     this.displayRaceTypeTop3Runners(
//       this.top3RunnersMarathonUL,
//       "marathon",
//       accumulated_scores.runner_marathon_stats
//     );
//     this.displayRaceTypeTop3Runners(
//       this.top3Runners100MileUL,
//       "100 mile",
//       accumulated_scores.runner_100mile_stats
//     );
//   }

//   private displayRaceTypeTop3Teams(
//     HTMLObject: HTMLElement | null,
//     race_parameter: string,
//     team_list: any[]
//   ): void {
//     if (HTMLObject) {
//       for (let i = 0; i < HTMLObject.children.length; i++) {
//         const team = team_list[i];
//         HTMLObject.children[
//           i
//         ].textContent = `${team.team_name} (ID: ${team.team_id}) - ${team.team_stats_per_race_type[race_parameter].points} pts - ${team.team_stats_per_race_type[race_parameter].golds} golds - ${team.team_stats_per_race_type[race_parameter].silvers} silvers - ${team.team_stats_per_race_type[race_parameter].bronzes} bronzes`;
//       }
//     }
//   }

//   private displayRaceTypeTop3Runners(
//     HTMLObject: HTMLElement | null,
//     race_parameter: string,
//     runner_list: any[]
//   ): void {
//     if (HTMLObject) {
//       for (let i = 0; i < HTMLObject.children.length; i++) {
//         const runner = runner_list[i];
//         const runner_name: string = `${runner.first_name} ${runner.last_name}`;
//         HTMLObject.children[
//           i
//         ].textContent = `${runner_name} (ID: ${runner.runner_id}) - ${runner.stats_per_race_type[race_parameter].points} pts - ${runner.stats_per_race_type[race_parameter].golds} golds - ${runner.stats_per_race_type[race_parameter].silvers} silvers - ${runner.stats_per_race_type[race_parameter].points} bronzes`;
//       }
//     }
//   }

//   private displayOverallTop3Teams(): void {
//     if (this.overallTop3TeamsUL) {
//       for (let i = 0; i < this.overallTop3TeamsUL.children.length; i++) {
//         const team = conference1.generated_conference[i];
//         this.overallTop3TeamsUL.children[
//           i
//         ].textContent = `${team.team_name} (ID: ${team.team_id}) - ${team.team_points} pts - ${team.golds} golds - ${team.silvers} silvers - ${team.bronzes} bronzes`;
//       }
//     }
//   }

//   private displayOverallTop3Runners(): void {
//     if (this.overallTop3RunnersUL) {
//       for (let i = 0; i < this.overallTop3RunnersUL.children.length; i++) {
//         const runner = conference1.all_runners[i];
//         const full_name = `${runner.first_name} ${runner.last_name}`;
//         this.overallTop3RunnersUL.children[
//           i
//         ].textContent = `${full_name} (ID: ${runner.runner_id}) - ${runner.runner_points} pts - ${runner.golds} golds - ${runner.silvers} silvers - ${runner.bronzes} bronzes`;
//       }
//     }
//   }
// }

const displayInfo1 = new DisplayInfo(conference1, accumulated_scores);

// Current todo!
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Add types to a bunch of things!
// - Break the classes and such out into their own files and such! aka refactor this sucker!
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
