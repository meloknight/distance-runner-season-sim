import "./style.css";
import {
  boundedNormDist,
  determineWeather,
  determineTerrain,
  determineRaceDistance,
} from "./utility_functions";
import { Team } from "./Team/Team";

// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

class Conference {
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

// Generate the conference and all the info
const conference1 = new Conference(1);
console.log(conference1);

class IndividualRace {
  public race_id: number;
  public race_distance: string;
  public runner_list: any[];
  public race_weather: string;
  public race_terrain: string;
  public gold_runner_id: number;
  public silver_runner_id: number;
  public bronze_runner_id: number;
  public race_date: Date;
  public runner_info: any[];

  constructor(race_id: number, runner_list: any[], race_date: Date) {
    // we want the updated runner stats to be pushed into raceday_runner_stats
    // These stats take weather and terrain into account and then
    this.race_id = race_id;
    this.race_date = race_date;
    this.gold_runner_id = -1;
    this.silver_runner_id = -1;
    this.bronze_runner_id = -1;
    this.runner_info = [];
    this.race_distance = determineRaceDistance();
    this.runner_list = runner_list;
    this.race_weather = determineWeather();
    this.race_terrain = determineTerrain();
    this.determineRacedaySkillClass();
    this.determinePlacements();
    this.addSpecificStatsToRunner("5 km");
    this.addSpecificStatsToRunner("10 km");
    this.addSpecificStatsToRunner("half marathon");
    this.addSpecificStatsToRunner("marathon");
    this.addSpecificStatsToRunner("100 mile");
  }

  private determineRacedaySkillClass(): any {
    this.runner_list.forEach((runner) => {
      const weatherModifier = (): number => {
        if (this.race_weather === runner.preferredWeather) {
          return 1.1;
        } else {
          return 1;
        }
      };
      const runner_weather_modifier: number = weatherModifier();

      const terrainModifier = (): number => {
        if (this.race_terrain === runner.preferredTerrain) {
          return 1.1;
        } else {
          return 1;
        }
      };
      const runner_terrain_modifier: number = terrainModifier();

      let runner_unmodified_skill_class: number;
      switch (this.race_distance) {
        case "5 km":
          runner_unmodified_skill_class = runner.skill_class_5km;
          break;
        case "10 km":
          runner_unmodified_skill_class = runner.skill_class_10km;
          break;
        case "half marathon":
          runner_unmodified_skill_class = runner.skill_class_half_marathon;
          break;
        case "marathon":
          runner_unmodified_skill_class = runner.skill_class_marathon;
          break;
        case "100 mile":
          runner_unmodified_skill_class = runner.skill_class_100mile;
          break;
        default:
          runner_unmodified_skill_class = 0;
      }

      const runner_raceday_luck: number = boundedNormDist(1, 0.08, 0.8, 1.2);

      const runner_modified_skill_class = Math.floor(
        runner_weather_modifier *
          runner_terrain_modifier *
          runner_raceday_luck *
          runner_unmodified_skill_class
      );

      // runner.current_runner_modified_skill_class = runner_modified_skill_class;
      // console.log(runner.runner_id);

      this.runner_info.push({
        runner_id: runner.runner_id,
        runner_modified_skill_class: runner_modified_skill_class,
      });

      runner.race_info_for_runner.push({
        race_id: this.race_id,
        runner_weather_modifier: runner_weather_modifier,
        runner_terrain_modifier: runner_terrain_modifier,
        runner_raceday_luck: runner_raceday_luck,
        runner_unmodified_skillclass: runner_unmodified_skill_class,
        runner_modified_skill_class: runner_modified_skill_class,
        //placement: "N/A", // placements are gold, silver, bronze, did not place, N/A
      });
    });
  }

  private determinePlacements(): any {
    // just use BubbleSort because small input array size.
    for (let i = 0; i < this.runner_info.length - 1; i++) {
      for (let j = 0; j < this.runner_info.length - 1 - i; j++) {
        if (
          this.runner_info[j].runner_modified_skill_class <
          this.runner_info[j + 1].runner_modified_skill_class
        ) {
          const tmp = this.runner_info[j];
          this.runner_info[j] = this.runner_info[j + 1];
          this.runner_info[j + 1] = tmp;
        }
      }
    }

    const gold_runner = this.runner_list.filter(
      (runner) => runner.runner_id === this.runner_info[0].runner_id
    )[0];
    const silver_runner = this.runner_list.filter(
      (runner) => runner.runner_id === this.runner_info[1].runner_id
    )[0];
    const bronze_runner = this.runner_list.filter(
      (runner) => runner.runner_id === this.runner_info[2].runner_id
    )[0];

    gold_runner.golds++;
    silver_runner.silvers++;
    bronze_runner.bronzes++;

    this.gold_runner_id = this.runner_info[0].runner_id;
    this.silver_runner_id = this.runner_info[1].runner_id;
    this.bronze_runner_id = this.runner_info[2].runner_id;

    this.runner_list.forEach((runner) => {
      for (let i = 0; i < runner.race_info_for_runner.length; i++) {
        if (runner.race_info_for_runner[i].race_id === this.race_id) {
          runner.race_info_for_runner[i].gold_runner_id =
            this.runner_list[0].runner_id;
          runner.race_info_for_runner[i].silver_runner_id =
            this.runner_list[1].runner_id;
          runner.race_info_for_runner[i].bronze_runner_id =
            this.runner_list[2].runner_id;
        }
      }
    });
  }

  private addSpecificStatsToRunner(race_parameter: string): void {
    conference1.all_runners.forEach((runner) => {
      if (this.race_distance === race_parameter) {
        runner.stats_per_race_type[race_parameter].race_run_in_category++;
        if (runner.runner_id === this.gold_runner_id) {
          runner.stats_per_race_type[race_parameter].golds++;
          runner.stats_per_race_type[race_parameter].points += 3;
        } else if (runner.runner_id === this.silver_runner_id) {
          runner.stats_per_race_type[race_parameter].silvers++;
          runner.stats_per_race_type[race_parameter].points += 2;
        } else if (runner.runner_id === this.bronze_runner_id) {
          runner.stats_per_race_type[race_parameter].bronzes++;
          runner.stats_per_race_type[race_parameter].points += 1;
        }
      }
    });
  }
}

class Schedule {
  // current plan is to have a race event every 2 weeks. A race event can have 3 to 8 races in it.
  // First, gen a schedule showing how many races each weekend. Pass in the race date when gen'ing an indiv race
  // Aim to have each runner participate in one race each weekend
  // From the schedule, we can determine team and racer stats and decide the overall winners based on
  // gold = 3pts, silver = 2pts, bronze = 1pt
  // lets say the race season goes from March (2) to September (8). months are zero-indexed.
  public schedule_year: number;
  public race_dates: Date[];
  public current_race_id: number;
  public races_per_weekend: number[];
  public race_list: any[];
  // public ordered_runner_points_5km: any[];
  // public team_ranking: any[];
  // public runner_ranking: any[];

  constructor(schedule_year: number) {
    this.schedule_year = schedule_year;
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
    const numberOfTeams: number = conference1.generated_conference.length;
    for (let i = 0; i < numberOfTeams; i++) {
      numberOfRunners +=
        conference1.generated_conference[i].team_members.length;
    }

    for (let i = 0; i < numberOfRunners; i++) {
      //this will continue to loop once for every runner
      const curr_team =
        conference1.generated_conference[teamIndex].team_members;
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
    conference1.consolidatePoints();
  }

  // public accumulateTopRunners(race_parameter: string): void {
  //   // race_parameter may be distance, terrain, or weather
  //   const list_of_applicable_races = this.race_list.filter((race) => race.race_distance === race_parameter)
  //   list_of_applicable_races.forEach((race) => {

  //   })

  // }
}

const sched1 = new Schedule(2024);
console.log(sched1);

class ScoreInformation {
  public runner_5km_stats: any[];
  public runner_10km_stats: any[];
  public runner_half_marathon_stats: any[];
  public runner_marathon_stats: any[];
  public runner_100mile_stats: any[];

  public team_5km_stats: any[];
  public team_10km_stats: any[];
  public team_half_marathon_stats: any[];
  public team_marathon_stats: any[];
  public team_100mile_stats: any[];

  constructor() {
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
    conference1.orderAllRunners();
  }

  private orderAllTeamsInConference(): void {
    conference1.orderAllTeams();
  }

  private accumulateStats(race_parameter: string): any[] {
    const runner_stats = [...conference1.all_runners];
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
    conference1.accumulateTeamPointsPerRaceType("5 km");
    conference1.accumulateTeamPointsPerRaceType("10 km");
    conference1.accumulateTeamPointsPerRaceType("half marathon");
    conference1.accumulateTeamPointsPerRaceType("marathon");
    conference1.accumulateTeamPointsPerRaceType("100 mile");
  }

  private orderTeamsByRaceType(race_parameter: string): any[] {
    const ordered_teams: any[] = [...conference1.generated_conference];
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

const accumulated_scores = new ScoreInformation();
console.log(accumulated_scores);

class DisplayInfo {
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

  constructor() {
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
      accumulated_scores.team_5km_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3Teams10kmUL,
      "10 km",
      accumulated_scores.team_10km_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3TeamsHalfMarathonUL,
      "half marathon",
      accumulated_scores.team_half_marathon_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3TeamsMarathonUL,
      "marathon",
      accumulated_scores.team_marathon_stats
    );
    this.displayRaceTypeTop3Teams(
      this.top3Teams100MileUL,
      "100 mile",
      accumulated_scores.team_100mile_stats
    );
    this.displayOverallTop3Runners();
    this.displayRaceTypeTop3Runners(
      this.top3Runners5kmUL,
      "5 km",
      accumulated_scores.runner_5km_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3Runners10kmUL,
      "10 km",
      accumulated_scores.runner_10km_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3RunnersHalfMarathonUL,
      "half marathon",
      accumulated_scores.runner_half_marathon_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3RunnersMarathonUL,
      "marathon",
      accumulated_scores.runner_marathon_stats
    );
    this.displayRaceTypeTop3Runners(
      this.top3Runners100MileUL,
      "100 mile",
      accumulated_scores.runner_100mile_stats
    );
  }

  private displayRaceTypeTop3Teams(
    HTMLObject: HTMLElement | null,
    race_parameter: string,
    team_list: any[]
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
    race_parameter: string,
    runner_list: any[]
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
        const team = conference1.generated_conference[i];
        this.overallTop3TeamsUL.children[
          i
        ].textContent = `${team.team_name} (ID: ${team.team_id}) - ${team.team_points} pts - ${team.golds} golds - ${team.silvers} silvers - ${team.bronzes} bronzes`;
      }
    }
  }

  private displayOverallTop3Runners(): void {
    if (this.overallTop3RunnersUL) {
      for (let i = 0; i < this.overallTop3RunnersUL.children.length; i++) {
        const runner = conference1.all_runners[i];
        const full_name = `${runner.first_name} ${runner.last_name}`;
        this.overallTop3RunnersUL.children[
          i
        ].textContent = `${full_name} (ID: ${runner.runner_id}) - ${runner.runner_points} pts - ${runner.golds} golds - ${runner.silvers} silvers - ${runner.bronzes} bronzes`;
      }
    }
  }
}

const displayInfo1 = new DisplayInfo();

// Current todo!
// - Look at possibly adding a loading animation or running dude or something? (something kinda flashy for the people)
// - Add types to a bunch of things!
// - Break the classes and such out into their own files and such! aka refactor this sucker!
// - Look into storing the Needed objects in localStorage and allowing
//    the user to reset the simulation if they want to.
