import { first_names, last_names } from "./names";
import {
  boundedNormDist,
  roundToChosenDecimal,
  determineTerrain,
  determineWeather,
} from "../utility_functions";

export class Runner {
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
