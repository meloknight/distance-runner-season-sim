import { Team } from "../Team/Team";

export class Conference {
  public conference_id: number;
  public generated_conference: any;
  public all_runners: any[];

  constructor(conference_id: number) {
    this.all_runners = [];
    this.conference_id = conference_id;
    this.generated_conference = this.generateConference();
    this.collectAllRunners();
  }

  private generateConference(): any[] {
    const generated_conference: any[] = [];
    for (let i = 1; i <= 20; i++) {
      const team_id: number = i * 1000;
      generated_conference.push(new Team(team_id));
    }
    return generated_conference;
  }

  public consolidatePoints(): void {
    // Add the point count to each team at the end of the season.
    const number_of_teams: number = this.generated_conference.length;
    for (let i = 0; i < number_of_teams; i++) {
      const number_of_runners: number =
        this.generated_conference[i].team_members.length;

      let curr_team_points: number = 0;
      let curr_team_golds: number = 0;
      let curr_team_silvers: number = 0;
      let curr_team_bronzes: number = 0;
      for (let j = 0; j < number_of_runners; j++) {
        const runner: any = this.generated_conference[i].team_members[j];
        curr_team_points += 3 * runner.golds; // golds are worth 3 points
        curr_team_points += 2 * runner.silvers; // silvers are worth 2 points
        curr_team_points += 1 * runner.bronzes; // bronzes are worth 1 points
        curr_team_golds += runner.golds;
        curr_team_silvers += runner.silvers;
        curr_team_bronzes += runner.bronzes;

        let runner_points: number = 0;
        runner_points += 3 * runner.golds;
        runner_points += 2 * runner.silvers;
        runner_points += 1 * runner.bronzes;
        runner.runner_points = runner_points;
      }
      this.generated_conference[i].team_points = curr_team_points;
      this.generated_conference[i].golds = curr_team_golds;
      this.generated_conference[i].silvers = curr_team_silvers;
      this.generated_conference[i].bronzes = curr_team_bronzes;
    }
  }

  private collectAllRunners(): void {
    this.generated_conference.forEach((team: any) => {
      team.team_members.forEach((runner: any) => {
        this.all_runners.push(runner);
      });
    });
  }

  public orderAllRunners(): void {
    for (let i = 0; i < this.all_runners.length - 1; i++) {
      for (let j = 0; j < this.all_runners.length - 1 - i; j++) {
        if (
          this.all_runners[j].runner_points <
          this.all_runners[j + 1].runner_points
        ) {
          const tmp = this.all_runners[j];
          this.all_runners[j] = this.all_runners[j + 1];
          this.all_runners[j + 1] = tmp;
        }
      }
    }
  }

  public orderAllTeams(): void {
    for (let i = 0; i < this.generated_conference.length - 1; i++) {
      for (let j = 0; j < this.generated_conference.length - 1 - i; j++) {
        if (
          this.generated_conference[j].team_points <
          this.generated_conference[j + 1].team_points
        ) {
          const tmp = this.generated_conference[j];
          this.generated_conference[j] = this.generated_conference[j + 1];
          this.generated_conference[j + 1] = tmp;
        }
      }
    }
  }

  public accumulateTeamPointsPerRaceType(race_parameter: string): void {
    this.generated_conference.forEach((team: any) => {
      let golds = 0,
        silvers = 0,
        bronzes = 0,
        points = 0,
        race_run_in_category = 0;

      team.team_members.forEach((runner: any) => {
        golds += runner.stats_per_race_type[race_parameter].golds;
        silvers += runner.stats_per_race_type[race_parameter].silvers;
        bronzes += runner.stats_per_race_type[race_parameter].bronzes;
        points += runner.stats_per_race_type[race_parameter].points;
        race_run_in_category +=
          runner.stats_per_race_type[race_parameter].race_run_in_category;
      });

      team.team_stats_per_race_type[race_parameter].golds = golds;
      team.team_stats_per_race_type[race_parameter].silvers = silvers;
      team.team_stats_per_race_type[race_parameter].bronzes = bronzes;
      team.team_stats_per_race_type[race_parameter].points = points;
      team.team_stats_per_race_type[race_parameter].race_run_in_category =
        race_run_in_category;
    });
  }
}
