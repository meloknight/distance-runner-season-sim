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
        ].textContent = `${runner_name} (ID: ${runner.runner_id}) - ${runner.stats_per_race_type[race_parameter].points} pts - ${runner.stats_per_race_type[race_parameter].golds} golds - ${runner.stats_per_race_type[race_parameter].silvers} silvers - ${runner.stats_per_race_type[race_parameter].points} bronzes`;
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
