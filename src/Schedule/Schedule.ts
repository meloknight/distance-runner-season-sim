import { boundedNormDist } from "../utility_functions";
import { IndividualRace } from "../IndividualRace/IndividualRace";

export class Schedule {
  // current plan is to have a race event every 2 weeks. A race event can have 3 to 8 races in it.
  // First, gen a schedule showing how many races each weekend. Pass in the race date when gen'ing an indiv race
  // Aim to have each runner participate in one race each weekend
  // From the schedule, we can determine team and racer stats and decide the overall winners based on
  // gold = 3pts, silver = 2pts, bronze = 1pt
  // lets say the race season goes from March (2) to September (8). months are zero-indexed.
  public schedule_year: number;
  public conference: any;
  public race_dates: Date[];
  public current_race_id: number;
  public races_per_weekend: number[];
  public race_list: any[];
  // public ordered_runner_points_5km: any[];
  // public team_ranking: any[];
  // public runner_ranking: any[];

  constructor(schedule_year: number, conference: any) {
    this.schedule_year = schedule_year;
    this.conference = conference;
    this.race_list = [];
    // this.ordered_runner_points_5km = []
    // this.team_ranking = [];
    // this.runner_ranking = [];
    this.race_dates = [];
    this.current_race_id = 0;
    this.createRaceDates();
    this.races_per_weekend = [];
    this.determineNumberOfRacesPerRaceWeekend();
    // this.allocateRunnersForIndividualRace(5);
    this.runTheRaces();
    this.consolidateTeamAndRunnerPoints();
    // I am at the point where i can start running the races because I can
  }

  private createRaceDates(): void {
    let firstDayOfMonth: any;
    for (let i = 1; i < 8; i++) {
      const newDate: Date = new Date(this.schedule_year, 2, i);
      const newDayOfWeek = newDate.getDay();
      if (newDayOfWeek === 6) {
        firstDayOfMonth = i;
        this.race_dates.push(newDate);
      }
    }
    let newDate: any;
    let i: number = 1;
    do {
      newDate = new Date(this.schedule_year, 2, firstDayOfMonth + 14 * i);
      if (newDate.getMonth() < 9) {
        this.race_dates.push(newDate);
      }
      i++;
    } while (newDate.getMonth() < 9);
  }

  private determineNumberOfRacesPerRaceWeekend(): void {
    for (let i = 0; i < this.race_dates.length; i++) {
      const number_of_races: number = Math.floor(
        boundedNormDist(3.5, 1.5, 2, 6)
      );
      this.races_per_weekend.push(number_of_races);
    }
  }

  private allocateRunnersForIndividualRace(
    numberOfRacesInCurrentWeekend: number
  ): any {
    // this method takes in the number of races in the current weekend
    // and returns an array of arrays. Each array contains a list of runner
    // objects which represent the runners in a particular race

    const runnerGroupings: any[] = [];
    for (let i = 0; i < numberOfRacesInCurrentWeekend; i++) {
      runnerGroupings.push([]);
    }
    let race_index = 0;
    let teamIndex = 0; //this number will cycle through the number of teams there are and reset after the last one
    // 8 runners on 20 teams = 160 runners to allocate

    // determine the number of runners in the conference for runner allocation
    let numberOfRunners: number = 0;
    const numberOfTeams: number = this.conference.generated_conference.length;
    for (let i = 0; i < numberOfTeams; i++) {
      numberOfRunners +=
        this.conference.generated_conference[i].team_members.length;
    }

    for (let i = 0; i < numberOfRunners; i++) {
      //this will continue to loop once for every runner
      const curr_team =
        this.conference.generated_conference[teamIndex].team_members;
      const rand = Math.floor(Math.random() * curr_team.length);

      let count = 0;
      while (count < 100) {
        if (curr_team[rand].already_chosen_for_current_race === false) {
          runnerGroupings[race_index].push(curr_team[rand]);
          curr_team[rand].already_chosen_for_current_race = true;
          break;
        } else {
          count++;
        }
      }

      if (teamIndex < numberOfTeams - 1) {
        teamIndex++;
      } else {
        teamIndex = 0;
      }

      if (race_index < numberOfRacesInCurrentWeekend - 1) {
        race_index++;
      } else {
        race_index = 0;
      }
    }

    for (let i = 0; i < numberOfRacesInCurrentWeekend; i++) {
      for (let j = 0; j < runnerGroupings[i].length; j++) {
        runnerGroupings[i][j].already_chosen_for_current_race = false;
      }
    }

    return runnerGroupings;
  }

  private runTheRaces() {
    let scheduled_race_id: number = 1;
    for (let i = 0; i < this.race_dates.length; i++) {
      const racesThisWeekend: number = this.races_per_weekend[i];
      const runnerGroupingsForCurrentWeekend: any =
        this.allocateRunnersForIndividualRace(racesThisWeekend);
      for (let j = 0; j < racesThisWeekend; j++) {
        this.race_list.push(
          new IndividualRace(
            this.conference,
            scheduled_race_id,
            runnerGroupingsForCurrentWeekend[j],
            this.race_dates[i]
          )
        );
        scheduled_race_id++;
      }
    }
  }

  private consolidateTeamAndRunnerPoints(): void {
    this.conference.consolidatePoints();
  }

  // public accumulateTopRunners(race_parameter: string): void {
  //   // race_parameter may be distance, terrain, or weather
  //   const list_of_applicable_races = this.race_list.filter((race) => race.race_distance === race_parameter)
  //   list_of_applicable_races.forEach((race) => {

  //   })

  // }
}
