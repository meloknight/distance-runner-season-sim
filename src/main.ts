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
  public wins: number;
  public losses: number;
  public golds: number;
  public silvers: number;
  public bronzes: number;
  public first_name: string;
  public last_name: string;
  public race_info_for_runner: any[];

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
    this.wins = 0;
    this.losses = 0;
    this.golds = 0;
    this.silvers = 0;
    this.bronzes = 0;
    this.first_name = this.determineName(first_names);
    this.last_name = this.determineName(last_names);
    this.race_info_for_runner = [];

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
      // 0.7-0.3+0.2+0.3=0.9
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

// const runner1 = new Runner(1004);
// runner1.describeRunner();
// console.log(runner1.runners_preferred_distance);

class Team {
  public team_id: number;
  public team_members: any[];

  constructor(team_id: number) {
    this.team_id = team_id;
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

// const team1 = new Team(3000);
// console.log(team1.team_members);

class Conference {
  public conference_id: number;
  public generated_conference: any;

  constructor(conference_id: number) {
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
}

// Generate the conference and all the info
const conference1 = new Conference(1);
// console.log(conference1.generated_conference);

class IndividualRace {
  public race_id: number;
  public race_distance: string;
  public runner_list: any[];
  public race_weather: string;
  public race_terrain: string;
  public race_info: any;

  constructor(race_id: number, runner_list: any[]) {
    // we want the updated runner stats to be pushed into raceday_runner_stats
    // These stats take weather and terrain into account and then
    this.race_id = race_id;
    this.race_distance = determineRaceDistance();
    this.runner_list = runner_list;
    this.race_weather = determineWeather();
    this.race_terrain = determineTerrain();
    this.determineRacedaySkillClass();
    this.determinePlacements();
  }

  public displayGeneratedConference() {
    console.log(conference1.generated_conference[12]);
  }

  private determineRacedaySkillClass(): any {
    this.runner_list.forEach((runner) => {
      //forEach runner in the runner_list

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

      runner.race_info_for_runner.push({
        race_id: this.race_id,
        runner_weather_modifier: runner_weather_modifier,
        runner_terrain_modifier: runner_terrain_modifier,
        runner_raceday_luck: runner_raceday_luck,
        runner_unmodified_skillclass: runner_unmodified_skill_class,
        runner_modified_skill_class: runner_modified_skill_class,
        placement: "N/A", // placements are gold, silver, bronze, did not place, N/A
      });
    });
  }

  // private determinePlacements(): any {
  //   this.runner_list.forEach((runner) => {
  //     runner.race_info_for_runner.filter
  //   });
  // }
}

const race1 = new IndividualRace(1, [
  conference1.generated_conference[1].team_members[1],
  conference1.generated_conference[5].team_members[4],
  conference1.generated_conference[11].team_members[0],
  conference1.generated_conference[1].team_members[7],
  conference1.generated_conference[3].team_members[3],
]);
// race1.displayGeneratedConference();
// console.log(race1.raceday_runner_stats);
console.log(
  conference1.generated_conference[1].team_members[1].race_info_for_runner[0]
);

// class Schedule {
// current plan is to have a race event every 2 weeks. A race event can have 3 to 8 races in it.
// I think it may be best to pre-generate the races and then distribute them out to their respective weekends
// Create a race class that takes in the distance, terrain, weather
// }

// const conference1 = new Conference(1);

// conference1.generated_conference[0].team_members[5].wins++;

// conference1.generated_conference[0].team_members[2].wins = 20;

// for (let i = 0; i < 8; i++) {
//   console.log(conference1.generated_conference[3].team_members[i]);
// }
