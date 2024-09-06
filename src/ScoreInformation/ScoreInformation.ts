import { ConferenceInterface } from "../Conference/Conference";
import { raceDistanceType, RunnerInterface } from "../Runner/Runner";
import { TeamInterface } from "../Team/Team";

export interface ScoreInformationInterface {
  runner_5km_stats: RunnerInterface[];
  runner_10km_stats: RunnerInterface[];
  runner_half_marathon_stats: RunnerInterface[];
  runner_marathon_stats: RunnerInterface[];
  runner_100mile_stats: RunnerInterface[];

  team_5km_stats: TeamInterface[];
  team_10km_stats: TeamInterface[];
  team_half_marathon_stats: TeamInterface[];
  team_marathon_stats: TeamInterface[];
  team_100mile_stats: TeamInterface[];
}

export class ScoreInformation {
  private conference: ConferenceInterface;

  public runner_5km_stats: RunnerInterface[];
  public runner_10km_stats: RunnerInterface[];
  public runner_half_marathon_stats: RunnerInterface[];
  public runner_marathon_stats: RunnerInterface[];
  public runner_100mile_stats: RunnerInterface[];

  public team_5km_stats: TeamInterface[];
  public team_10km_stats: TeamInterface[];
  public team_half_marathon_stats: TeamInterface[];
  public team_marathon_stats: TeamInterface[];
  public team_100mile_stats: TeamInterface[];

  constructor(conference: ConferenceInterface) {
    this.conference = conference;
    this.orderAllRunnersInConference();
    this.orderAllTeamsInConference();
    this.runner_5km_stats = this.accumulateStats("5 km");
    this.runner_10km_stats = this.accumulateStats("10 km");
    this.runner_half_marathon_stats = this.accumulateStats("half marathon");
    this.runner_marathon_stats = this.accumulateStats("marathon");
    this.runner_100mile_stats = this.accumulateStats("100 mile");
    this.accumulateTeamStats();
    this.team_5km_stats = this.orderTeamsByRaceType("5 km");
    this.team_10km_stats = this.orderTeamsByRaceType("10 km");
    this.team_half_marathon_stats = this.orderTeamsByRaceType("half marathon");
    this.team_marathon_stats = this.orderTeamsByRaceType("marathon");
    this.team_100mile_stats = this.orderTeamsByRaceType("100 mile");
  }

  private orderAllRunnersInConference(): void {
    this.conference.orderAllRunners();
  }

  private orderAllTeamsInConference(): void {
    this.conference.orderAllTeams();
  }

  private accumulateStats(race_parameter: raceDistanceType): RunnerInterface[] {
    const runner_stats = [...this.conference.all_runners];
    for (let i = 0; i < runner_stats.length - 1; i++) {
      for (let j = 0; j < runner_stats.length - 1 - i; j++) {
        if (
          runner_stats[j].stats_per_race_type[race_parameter]["points"] <
          runner_stats[j + 1].stats_per_race_type[race_parameter]["points"]
        ) {
          const tmp = runner_stats[j];
          runner_stats[j] = runner_stats[j + 1];
          runner_stats[j + 1] = tmp;
        }
      }
    }
    return runner_stats;
  }

  private accumulateTeamStats(): void {
    this.conference.accumulateTeamPointsPerRaceType("5 km");
    this.conference.accumulateTeamPointsPerRaceType("10 km");
    this.conference.accumulateTeamPointsPerRaceType("half marathon");
    this.conference.accumulateTeamPointsPerRaceType("marathon");
    this.conference.accumulateTeamPointsPerRaceType("100 mile");
  }

  private orderTeamsByRaceType(
    race_parameter: raceDistanceType
  ): TeamInterface[] {
    const ordered_teams: TeamInterface[] = [
      ...this.conference.generated_conference,
    ];
    for (let i = 0; i < ordered_teams.length - 1; i++) {
      for (let j = 0; j < ordered_teams.length - 1 - i; j++) {
        if (
          ordered_teams[j].team_stats_per_race_type[race_parameter].points <
          ordered_teams[j + 1].team_stats_per_race_type[race_parameter].points
        ) {
          const tmp = ordered_teams[j];
          ordered_teams[j] = ordered_teams[j + 1];
          ordered_teams[j + 1] = tmp;
        }
      }
    }
    return ordered_teams;
  }
}
