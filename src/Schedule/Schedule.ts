import { boundedNormDist } from "../utility_functions";
import {
  IndividualRace,
  IndividualRaceInterface,
} from "../IndividualRace/IndividualRace";
import { ConferenceInterface } from "../Conference/Conference";
import { RunnerInterface } from "../Runner/Runner";

export class Schedule {
  // have a race event every 2 weeks. A race event can have 3 to 8 races in it.
  // First, gen a schedule showing how many races each weekend. Pass in the race date when gen'ing an indiv race
  // Aim to have each runner participate in one race each weekend
  // From the schedule, we can determine team and racer stats and decide the overall winners based on
  // gold = 3pts, silver = 2pts, bronze = 1pt
  // race season goes from March (2) to September (8). months are zero-indexed.
  public schedule_year: number;
  public conference: ConferenceInterface;
  public race_dates: Date[];
  public current_race_id: number;
  public races_per_weekend: number[];
  public race_list: IndividualRaceInterface[];

  constructor(schedule_year: number, conference: ConferenceInterface) {
    this.schedule_year = schedule_year;
    this.conference = conference;
    this.race_list = [];
    this.race_dates = [];
    this.current_race_id = 0;
    this.createRaceDates();
    this.races_per_weekend = [];
    this.determineNumberOfRacesPerRaceWeekend();
    this.runTheRaces();
    this.consolidateTeamAndRunnerPoints();
  }

  private createRaceDates(): void {
    let firstDayOfMonth: number = 1;
    for (let i = 1; i < 8; i++) {
      const newDate: Date = new Date(this.schedule_year, 2, i);
      const newDayOfWeek = newDate.getDay();
      if (newDayOfWeek === 6) {
        firstDayOfMonth = i;
        this.race_dates.push(newDate);
      }
    }
    let newDate: Date;
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
  ): RunnerInterface[][] {
    const runnerGroupings: RunnerInterface[][] = [];
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
      const runnerGroupingsForCurrentWeekend: RunnerInterface[][] =
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
}
