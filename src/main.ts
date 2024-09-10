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

    const teamSelect = document.getElementById("team-select");
    teamSelect?.addEventListener("change", updateRunnerSelect);

    function updateRunnerSelect(e: any): void {
      if (e.target) {
        const selected_team_id = e.target.value;
        const runnerSelect = document.getElementById("runner-select");
        if (runnerSelect) {
          runnerSelect.innerHTML =
            '<option value="">-- Select a runner --</option>';
        }
        const chosenTeam = conference1.generated_conference.filter(
          (team) => team.team_id == selected_team_id
        )[0];
        for (let i = 0; i < chosenTeam.team_members.length; i++) {
          const runner = chosenTeam.team_members[i];
          const runner_option = document.createElement("option");
          runner_option.value = runner.runner_id.toString();
          runner_option.text = `${runner.first_name} ${runner.last_name} (ID: ${runner.runner_id})`;
          runnerSelect?.appendChild(runner_option);
        }
      }
    }

    const runnerSelect = document.getElementById("runner-select");
    if (runnerSelect) {
      runnerSelect.innerHTML =
        '<option value="">-- Select a runner --</option>';
      runnerSelect.addEventListener("change", function (e: any): void {
        if (e.target) {
          const selected_runner_id = e.target.value;
          console.log(selected_runner_id);

          displayInfo1.displayRunnerReview(selected_runner_id);
        }
      });
    }

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
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Look at creating a form for users to choose year, runner name, etc
// - Look at creating a selection section to choose specific racers and teams to get details on
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
// - Choose random runner to display and give option to pull up info about any runner?
