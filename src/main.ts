import "./style.css";
import {
  boundedNormDist,
  roundToChosenDecimal,
  determineWeather,
  determineTerrain,
  determineRaceDistance,
} from "./utility_functions";
import { first_names, last_names } from "./names";
import { animals, adjectives } from "./team_names";

// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

class Runner {
  public age: number;
  public runner_id: number;
  public golds: number;
  public silvers: number;
  public bronzes: number;
  public runner_points: number;
  public first_name: string;
  public last_name: string;
  public current_runner_modified_skill_class: number;
  public race_info_for_runner: any[];
  public already_chosen_for_current_race: boolean; //used by allocateRunners in Schedule
  public stats_per_race_type: any;

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
  public preferredTerrain: string;
  public preferredWeather: string;

  constructor(runner_id: number) {
    this.age = this.determineAge();
    this.runner_id = runner_id;
    this.runner_points = 0;
    this.golds = 0;
    this.silvers = 0;
    this.bronzes = 0;
    this.first_name = this.determineName(first_names);
    this.last_name = this.determineName(last_names);
    this.race_info_for_runner = [];
    this.current_runner_modified_skill_class = 1;
    this.already_chosen_for_current_race = false;
    this.stats_per_race_type = {
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
  public team_name: string;
  public team_members: any[];
  public team_points: number;
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
      }
      this.generated_conference[i].team_points = curr_team_points;
    }
  }

  private collectAllRunners(): void {
    this.generated_conference.forEach((team: any) => {
      team.team_members.forEach((runner: any) => {
        this.all_runners.push(runner);
      });
    });
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
console.log(accumulated_scores.team_5km_stats);

// const testZone = document.getElementById("test-zone");
// if (testZone) {
//   testZone.innerHTML = `<h1>${conference1.generated_conference[2].team_points}</h1>`;
// }

const overallTop3RunnersUL = document.getElementById("overall-top-3-runners");
// if (overallTop3RunnersUL) {
//   for (let i = 0; i < overallTop3RunnersUL.children.length; i++) {
//     const runner = conference1.ordered_runner_points[i];
//     const full_name = `${runner.runner_first_name} ${runner.runner_last_name}`;
//     overallTop3RunnersUL.children[
//       i
//     ].textContent = `${full_name} (ID: ${runner.runner_id}) - ${runner.runner_points} pts -
//     ${runner.runner_golds} golds - ${runner.runner_silvers} silvers - ${runner.runner_bronzes} bronzes`;
//   }
// }

// Current todo!
// - Display the top runners and teams in each category!
// - Add types to a bunch of things!
// - Break the classes and such out into their own files and such! aka refactor this sucker!
