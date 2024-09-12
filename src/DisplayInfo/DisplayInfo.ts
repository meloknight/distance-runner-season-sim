import { ConferenceInterface } from "../Conference/Conference";
import { raceDistanceType, RunnerInterface } from "../Runner/Runner";
import { ScoreInformationInterface } from "../ScoreInformation/ScoreInformation";
import { TeamInterface } from "../Team/Team";

export class DisplayInfo {
  private conference: ConferenceInterface;
  private ScoreInformation: ScoreInformationInterface;

  private overallTop3RunnersUL: HTMLElement | null;
  private overallTop3TeamsUL: HTMLElement | null;
  private top3Teams5kmUL: HTMLElement | null;
  private top3Runners5kmUL: HTMLElement | null;
  private top3Teams10kmUL: HTMLElement | null;
  private top3Runners10kmUL: HTMLElement | null;
  private top3TeamsHalfMarathonUL: HTMLElement | null;
  private top3RunnersHalfMarathonUL: HTMLElement | null;
  private top3TeamsMarathonUL: HTMLElement | null;
  private top3RunnersMarathonUL: HTMLElement | null;
  private top3Teams100MileUL: HTMLElement | null;
  private top3Runners100MileUL: HTMLElement | null;

  constructor(
    conference: ConferenceInterface,
    ScoreInformation: ScoreInformationInterface
  ) {
    this.conference = conference;
    this.ScoreInformation = ScoreInformation;

    // this.chosenRunnerName = document.getElementById("runner-review-name");

    this.overallTop3TeamsUL = document.getElementById("overall-top-3-teams");
    this.overallTop3RunnersUL = document.getElementById(
      "overall-top-3-runners"
    );
    this.top3Teams5kmUL = document.getElementById("5km-top-3-teams");
    this.top3Runners5kmUL = document.getElementById("5km-top-3-runners");
    this.top3Teams10kmUL = document.getElementById("10km-top-3-teams");
    this.top3Runners10kmUL = document.getElementById("10km-top-3-runners");
    this.top3TeamsHalfMarathonUL = document.getElementById(
      "half-marathon-top-3-teams"
    );
    this.top3RunnersHalfMarathonUL = document.getElementById(
      "half-marathon-top-3-runners"
    );
    this.top3TeamsMarathonUL = document.getElementById("marathon-top-3-teams");
    this.top3RunnersMarathonUL = document.getElementById(
      "marathon-top-3-runners"
    );
    this.top3Teams100MileUL = document.getElementById("100mile-top-3-teams");
    this.top3Runners100MileUL = document.getElementById(
      "100mile-top-3-runners"
    );

    // display summarized information
    this.displayRunnerReview(conference.all_runners[0].runner_id);
    this.updateTeamSelect();
    this.displayOverallTop3Teams();
    this.displayRaceTypeTop3Teams(
      this.top3Teams5kmUL,
      "5 km",
      this.ScoreInformation.team_5km_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3Teams10kmUL,
      "10 km",
      this.ScoreInformation.team_10km_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3TeamsHalfMarathonUL,
      "half marathon",
      this.ScoreInformation.team_half_marathon_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3TeamsMarathonUL,
      "marathon",
      this.ScoreInformation.team_marathon_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3Teams100MileUL,
      "100 mile",
      this.ScoreInformation.team_100mile_stats
    );
    this.displayOverallTop3Runners();
    this.displayRaceTypeTop3Runners(
      this.top3Runners5kmUL,
      "5 km",
      this.ScoreInformation.runner_5km_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3Runners10kmUL,
      "10 km",
      this.ScoreInformation.runner_10km_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3RunnersHalfMarathonUL,
      "half marathon",
      this.ScoreInformation.runner_half_marathon_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3RunnersMarathonUL,
      "marathon",
      this.ScoreInformation.runner_marathon_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3Runners100MileUL,
      "100 mile",
      this.ScoreInformation.runner_100mile_stats
    );
  }

  private updateTeamSelect(): void {
    const teamSelect = document.getElementById("team-select");
    if (teamSelect) {
      teamSelect.innerHTML = "";
    }
    const select_a_team = document.createElement("option");
    select_a_team.value = "";
    select_a_team.text = "-- Select a team --";
    teamSelect?.appendChild(select_a_team);
    for (let i = 0; i < this.conference.generated_conference.length; i++) {
      const team = this.conference.generated_conference[i];
      const team_option = document.createElement("option");
      team_option.value = team.team_id.toString();
      team_option.text = `${team.team_name} (ID: ${team.team_id})`;
      teamSelect?.appendChild(team_option);
    }
  }

  public displayRunnerReview(runner_id: number): void {
    const chosenRunnerID = document.getElementById("runner-review-id");
    const chosenRunnerName = document.getElementById("runner-review-name");
    const chosenRunnerAge = document.getElementById("runner-review-age");
    const chosenRunnerTeam = document.getElementById("runner-review-team");
    const chosenRunnerPoints = document.getElementById("runner-review-points");
    const chosenRunnerGolds = document.getElementById("runner-review-golds");
    const chosenRunnerSilvers = document.getElementById(
      "runner-review-silvers"
    );
    const chosenRunnerBronzes = document.getElementById(
      "runner-review-bronzes"
    );
    const chosenRunnerRacesRun = document.getElementById(
      "runner-review-races-run"
    );
    const skillClass5km = document.getElementById("runner-review-5km-sc");
    const skillClass10km = document.getElementById("runner-review-10km-sc");
    const skillClassHalfMarathon = document.getElementById(
      "runner-review-half-marathon-sc"
    );
    const skillClassMarathon = document.getElementById(
      "runner-review-marathon-sc"
    );
    const skillClass100mile = document.getElementById(
      "runner-review-100mile-sc"
    );

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CHOSEN RUNNER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    const chosen_runner = this.conference.all_runners.filter(
      (runner) => runner.runner_id == runner_id
    )[0];
    if (chosenRunnerName) {
      chosenRunnerName.textContent = `Name: ${chosen_runner.first_name} ${chosen_runner.last_name}`;
    }
    if (chosenRunnerID) {
      chosenRunnerID.textContent = `Runner ID: ${chosen_runner.runner_id}`;
    }
    if (chosenRunnerAge) {
      chosenRunnerAge.textContent = `Age: ${chosen_runner.age}`;
    }

    const runner_team_id = Math.floor(chosen_runner.runner_id / 1000) * 1000;
    const runner_team = this.conference.generated_conference.filter(
      (team) => team.team_id === runner_team_id
    )[0];
    const runner_team_name = runner_team.team_name;
    if (chosenRunnerTeam) {
      chosenRunnerTeam.textContent = `Team: ${runner_team_name}`;
    }
    if (chosenRunnerPoints) {
      chosenRunnerPoints.textContent = `Points: ${chosen_runner.runner_points}`;
    }
    if (chosenRunnerGolds) {
      chosenRunnerGolds.textContent = `Gold(s): ${chosen_runner.golds}`;
    }
    if (chosenRunnerSilvers) {
      chosenRunnerSilvers.textContent = `Silver(s): ${chosen_runner.silvers}`;
    }
    if (chosenRunnerBronzes) {
      chosenRunnerBronzes.textContent = `Bronze(s): ${chosen_runner.bronzes}`;
    }
    if (chosenRunnerRacesRun) {
      chosenRunnerRacesRun.textContent = `Number of Races Run: ${chosen_runner.race_info_for_runner.length}`;
    }
    if (skillClass5km) {
      skillClass5km.textContent = `5km Skill Class: ${chosen_runner.skill_class_5km}`;
    }
    if (skillClass10km) {
      skillClass10km.textContent = `10km Skill Class: ${chosen_runner.skill_class_10km}`;
    }
    if (skillClassHalfMarathon) {
      skillClassHalfMarathon.textContent = `Half Marathon Skill Class: ${chosen_runner.skill_class_half_marathon}`;
    }
    if (skillClassMarathon) {
      skillClassMarathon.textContent = `Marathon Skill Class: ${chosen_runner.skill_class_marathon}`;
    }
    if (skillClass100mile) {
      skillClass100mile.textContent = `100mile Skill Class: ${chosen_runner.skill_class_100mile}`;
    }
  }

  private displayRaceTypeTop3Teams(
    HTMLObject: HTMLElement | null,
    race_parameter: raceDistanceType,
    team_list: TeamInterface[]
  ): void {
    if (HTMLObject) {
      for (let i = 0; i < HTMLObject.children.length; i++) {
        const team = team_list[i];
        HTMLObject.children[
          i
        ].textContent = `${team.team_name} (ID: ${team.team_id}) - ${team.team_stats_per_race_type[race_parameter].points} pts - ${team.team_stats_per_race_type[race_parameter].golds} golds - ${team.team_stats_per_race_type[race_parameter].silvers} silvers - ${team.team_stats_per_race_type[race_parameter].bronzes} bronzes`;
      }
    }
  }

  private displayRaceTypeTop3Runners(
    HTMLObject: HTMLElement | null,
    race_parameter: raceDistanceType,
    runner_list: RunnerInterface[]
  ): void {
    if (HTMLObject) {
      for (let i = 0; i < HTMLObject.children.length; i++) {
        const runner = runner_list[i];
        const runner_name: string = `${runner.first_name} ${runner.last_name}`;
        HTMLObject.children[
          i
        ].textContent = `${runner_name} (ID: ${runner.runner_id}) - ${runner.stats_per_race_type[race_parameter].points} pts - ${runner.stats_per_race_type[race_parameter].golds} golds - ${runner.stats_per_race_type[race_parameter].silvers} silvers - ${runner.stats_per_race_type[race_parameter].bronzes} bronzes`;
      }
    }
  }

  private displayOverallTop3Teams(): void {
    if (this.overallTop3TeamsUL) {
      for (let i = 0; i < this.overallTop3TeamsUL.children.length; i++) {
        const team = this.conference.generated_conference[i];
        this.overallTop3TeamsUL.children[
          i
        ].textContent = `${team.team_name} (ID: ${team.team_id}) - ${team.team_points} pts - ${team.golds} golds - ${team.silvers} silvers - ${team.bronzes} bronzes`;
      }
    }
  }

  private displayOverallTop3Runners(): void {
    if (this.overallTop3RunnersUL) {
      for (let i = 0; i < this.overallTop3RunnersUL.children.length; i++) {
        const runner = this.conference.all_runners[i];
        const full_name = `${runner.first_name} ${runner.last_name}`;
        this.overallTop3RunnersUL.children[
          i
        ].textContent = `${full_name} (ID: ${runner.runner_id}) - ${runner.runner_points} pts - ${runner.golds} golds - ${runner.silvers} silvers - ${runner.bronzes} bronzes`;
      }
    }
  }
}
