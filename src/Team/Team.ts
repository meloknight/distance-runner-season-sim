import { animals, adjectives } from "./team_names";
import { Runner } from "../Runner/Runner";

export class Team {
  public team_id: number;
  public team_name: string;
  public team_members: any[];
  public team_points: number;
  public golds: number;
  public silvers: number;
  public bronzes: number;
  public team_stats_per_race_type: any;

  constructor(team_id: number) {
    this.team_id = team_id;
    this.team_name = this.generateTeamName();
    this.team_stats_per_race_type = {
      "5 km": {
        points: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
        race_run_in_category: 0,
      },
      "10 km": {
        points: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
        race_run_in_category: 0,
      },
      "half marathon": {
        points: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
        race_run_in_category: 0,
      },
      marathon: {
        points: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
        race_run_in_category: 0,
      },
      "100 mile": {
        points: 0,
        golds: 0,
        silvers: 0,
        bronzes: 0,
        race_run_in_category: 0,
      },
    };
    this.team_points = 0;
    this.golds = 0;
    this.silvers = 0;
    this.bronzes = 0;
    this.team_members = this.generateTeam();
  }

  private generateTeam(): any[] {
    const generated_team: any[] = [];
    for (let i = 1; i <= 8; i++) {
      const runner_id_generator = this.team_id + i;
      generated_team.push(new Runner(runner_id_generator));
    }
    return generated_team;
  }

  private generateTeamName(): string {
    const rand_animal_index: number = Math.floor(
      Math.random() * animals.length
    );
    const rand_adjective_index: number = Math.floor(
      Math.random() * adjectives.length
    );
    return `The ${adjectives[rand_adjective_index]} ${animals[rand_animal_index]}`;
  }
}
