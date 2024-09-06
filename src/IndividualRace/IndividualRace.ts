// import { Conference } from "../Conference/Conference";
import {
  determineRaceDistance,
  determineTerrain,
  determineWeather,
  boundedNormDist,
} from "../utility_functions";
import { ConferenceInterface } from "../Conference/Conference";
import { raceDistanceType, RunnerInterface } from "../Runner/Runner";

export interface IndividualRaceInterface {
  conference: ConferenceInterface;
  race_id: number;
  race_distance: string;
  runner_list: RunnerInterface[];
  race_weather: string;
  race_terrain: string;
  gold_runner_id: number;
  silver_runner_id: number;
  bronze_runner_id: number;
  race_date: Date;
  runner_info: RunnerInfoInterface[];
}

interface RunnerInfoInterface {
  runner_id: number;
  runner_modified_skill_class: number;
}

export class IndividualRace {
  public conference: ConferenceInterface;
  public race_id: number;
  public race_distance: string;
  public runner_list: RunnerInterface[];
  public race_weather: string;
  public race_terrain: string;
  public gold_runner_id: number;
  public silver_runner_id: number;
  public bronze_runner_id: number;
  public race_date: Date;
  public runner_info: RunnerInfoInterface[];

  constructor(
    conference: ConferenceInterface,
    race_id: number,
    runner_list: RunnerInterface[],
    race_date: Date
  ) {
    this.conference = conference;
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

  private determineRacedaySkillClass(): void {
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
      });
    });
  }

  private determinePlacements(): void {
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
  }

  private addSpecificStatsToRunner(race_parameter: raceDistanceType): void {
    this.conference.all_runners.forEach((runner: RunnerInterface) => {
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
