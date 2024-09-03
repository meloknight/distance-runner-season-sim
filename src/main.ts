import "./style.css";
import {
  boundedNormDist,
  roundToChosenDecimal,
  determineWeather,
  determineTerrain,
  determineRaceDistance,
} from "./utility_functions";
import { first_names, last_names } from "./names";

// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

class Runner {
  public age: number;
  public runner_id: number;
  // public wins: number;
  // public losses: number;
  public golds: number;
  public silvers: number;
  public bronzes: number;
  public runner_points: number;
  public first_name: string;
  public last_name: string;
  public current_runner_modified_skill_class: number;
  public race_info_for_runner: any[];
  public already_chosen_for_current_race: boolean; //used by allocateRunners in Schedule

  public phys_factor: number;
  public training_factor: number;
  public nutri_factor: number;
  public psych_factor: number;
  public biomech_factor: number;
  public gene_factor: number;

  public skill_class_5km: number;
  public skill_class_10km: number;
  public skill_class_half_marathon: number;
  public skill_class_marathon: number;
  public skill_class_100mile: number;

  public runners_preferred_distance: string[];
  // Perhaps could randomly decide if a runner prefers road/trail AND what weather they perform best in (most will be moderate weather)
  // envFactor
  public preferredTerrain: string;
  public preferredWeather: string;

  constructor(runner_id: number) {
    this.age = this.determineAge();
    this.runner_id = runner_id;
    // this.wins = 0;
    // this.losses = 0;
    this.runner_points = 0;
    this.golds = 0;
    this.silvers = 0;
    this.bronzes = 0;
    this.first_name = this.determineName(first_names);
    this.last_name = this.determineName(last_names);
    this.race_info_for_runner = [];
    this.current_runner_modified_skill_class = 1;
    this.already_chosen_for_current_race = false;

    this.phys_factor = this.determinePhysFactor(this.age);
    this.training_factor = this.determineTrainingFactor();
    this.nutri_factor = this.determineNutriFactor();
    this.psych_factor = this.determinePsychFactor();
    this.biomech_factor = this.determineBiomechFactor();
    this.gene_factor = this.determineGeneFactor();
    this.preferredTerrain = this.determineTerrainPreference();
    this.preferredWeather = this.determineWeatherPreference();

    this.skill_class_5km = this.determineSkillClass("5 km");
    this.skill_class_10km = this.determineSkillClass("10 km");
    this.skill_class_half_marathon = this.determineSkillClass("half marathon");
    this.skill_class_marathon = this.determineSkillClass("marathon");
    this.skill_class_100mile = this.determineSkillClass("100 mile");

    this.runners_preferred_distance = this.determineDistancePreferrence();
  }

  private determineAge(): number {
    let unroundedAge = boundedNormDist(30, 9, 16, 110);
    return roundToChosenDecimal(unroundedAge, 0);
  }

  private determineName(name_array: string[]): string {
    const arr_length: number = name_array.length;
    const rand_index: number = Math.floor(Math.random() * arr_length);
    return name_array[rand_index];
  }

  private determineSkillClass(distance: string): number {
    if (distance === "5 km") {
      return roundToChosenDecimal(
        1.7 * this.phys_factor +
          this.training_factor +
          0.7 * this.nutri_factor +
          1.2 * this.psych_factor +
          1.3 * this.biomech_factor +
          this.gene_factor,
        0
      );
    } else if (distance === "10 km") {
      // 0.6-0.2+0.2+0.3=0.9
      return roundToChosenDecimal(
        1.6 * this.phys_factor +
          this.training_factor +
          0.8 * this.nutri_factor +
          1.2 * this.psych_factor +
          1.3 * this.biomech_factor +
          this.gene_factor,
        0
      );
    } else if (distance === "half marathon") {
      // 0.3+0.2+0.3=0.9
      return roundToChosenDecimal(
        1.3 * this.phys_factor +
          this.training_factor +
          1.1 * this.nutri_factor +
          1.2 * this.psych_factor +
          1.3 * this.biomech_factor +
          this.gene_factor,
        0
      );
    } else if (distance === "marathon") {
      // 0.3+0.2+0.2+0.2=0.9
      return roundToChosenDecimal(
        1.3 * this.phys_factor +
          this.training_factor +
          1.2 * this.nutri_factor +
          1.2 * this.psych_factor +
          1.2 * this.biomech_factor +
          this.gene_factor,
        0
      );
    } else if (distance === "100 mile") {
      // -0.2+0.5+0.6=0.9
      return roundToChosenDecimal(
        0.9 * this.phys_factor +
          this.training_factor +
          1.5 * this.nutri_factor +
          1.6 * this.psych_factor +
          0.9 * this.biomech_factor +
          this.gene_factor,
        0
      );
    }
    return 5;
  }

  private determineDistancePreferrence(): string[] {
    const index_set: Set<number> = new Set();
    const distances: string[] = [
      "5 km",
      "10 km",
      "half marathon",
      "marathon",
      "100 mile",
    ];
    let res: string[] = [];

    while (index_set.size < distances.length) {
      const index: number = Math.floor(Math.random() * distances.length);
      if (index_set.has(index)) {
        continue;
      }
      res.push(distances[index]);
      index_set.add(index);
    }
    return res;
  }

  private determinePhysFactor(age: number): number {
    let physMod: number = 0;
    if (age < 30) {
      physMod = 40;
    } else if (age < 40) {
      physMod = 25;
    } else if (age < 55) {
      physMod = 10;
    }
    return roundToChosenDecimal(boundedNormDist(100 + physMod, 20, 80, 200), 0);
  }

  private determineTrainingFactor(): number {
    return roundToChosenDecimal(boundedNormDist(130, 30, 80, 200), 0);
  }

  private determineNutriFactor(): number {
    return roundToChosenDecimal(boundedNormDist(130, 10, 100, 200), 0);
  }

  private determinePsychFactor(): number {
    return roundToChosenDecimal(boundedNormDist(130, 40, 70, 200), 0);
  }

  private determineBiomechFactor(): number {
    return roundToChosenDecimal(boundedNormDist(130, 10, 110, 200), 0);
  }

  private determineGeneFactor(): number {
    return roundToChosenDecimal(boundedNormDist(100, 30, 70, 200), 0);
  }

  private determineTerrainPreference(): string {
    // Possible terrains are road or trail
    return determineTerrain();
  }

  private determineWeatherPreference(): string {
    // Possible weathers are moderate, hot, cold, or rainy
    return determineWeather();
  }

  public describeRunner(): void {
    console.log(
      `Hello! My name is ${this.first_name} ${this.last_name} ` +
        `and my runner ID is ${this.runner_id}. I am ${this.age} years old. ` +
        `I have ${this.golds} golds, ${this.silvers} silvers, and ${this.bronzes} bronzes. ` +
        `My 5km Skill Class is ${this.skill_class_5km}. ` +
        `My 10km Skill Class is ${this.skill_class_10km}. ` +
        `My half marathon Skill Class is ${this.skill_class_half_marathon}. ` +
        `My marathon Skill Class is ${this.skill_class_marathon}. ` +
        `My 100mile Skill Class is ${this.skill_class_100mile}. `
    );
  }
}

class Team {
  public team_id: number;
  public team_members: any[];
  public team_points: number;

  constructor(team_id: number) {
    this.team_id = team_id;
    this.team_points = 0;
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
}

class Conference {
  public conference_id: number;
  public generated_conference: any;
  public ordered_runner_points: any[];

  constructor(conference_id: number) {
    this.ordered_runner_points = [];
    this.conference_id = conference_id;
    this.generated_conference = this.generateConference();
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
      // console.log(this.generated_conference[i].team_points);
      const number_of_runners: number =
        this.generated_conference[i].team_members.length;

      let curr_team_points: number = 0;
      for (let j = 0; j < number_of_runners; j++) {
        const runner: any = this.generated_conference[i].team_members[j];
        curr_team_points += 3 * runner.golds; // golds are worth 3 points
        curr_team_points += 2 * runner.silvers; // silvers are worth 2 points
        curr_team_points += 1 * runner.bronzes; // bronzes are worth 1 points

        let runner_points: number = 0;
        runner_points += 3 * runner.golds;
        runner_points += 2 * runner.silvers;
        runner_points += 1 * runner.bronzes;
        runner.runner_points = runner_points;

        this.ordered_runner_points.push({
          runner_id: runner.runner_id,
          runner_points: runner.runner_points,
          runner_golds: runner.golds,
          runner_silvers: runner.silvers,
          runner_bronzes: runner.bronzes,
        });
      }
      this.generated_conference[i].team_points = curr_team_points;
    }

    for (let i = 0; i < this.ordered_runner_points.length - 1; i++) {
      for (let j = 0; j < this.ordered_runner_points.length - 1 - i; j++) {
        if (
          this.ordered_runner_points[j].runner_points <
          this.ordered_runner_points[j + 1].runner_points
        ) {
          const tmp = this.ordered_runner_points[j];
          this.ordered_runner_points[j] = this.ordered_runner_points[j + 1];
          this.ordered_runner_points[j + 1] = tmp;
        }
      }
    }

    console.log(this.ordered_runner_points);
    // create the sorted list of runners based on points
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
  public team_ranking: any[];
  public runner_ranking: any[];

  constructor(schedule_year: number) {
    this.schedule_year = schedule_year;
    this.race_list = [];
    this.team_ranking = [];
    this.runner_ranking = [];
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
      const number_of_races: number = Math.floor(boundedNormDist(5, 1.5, 3, 9));
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
}

const sched1 = new Schedule(2024);
console.log(sched1);
