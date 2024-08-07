import "./style.css";
import {
  normDist,
  boundedNormDist,
  roundToChosenDecimal,
} from "./utility_functions";

const first_names = [
  "Willis",
  "Timmy",
  "Bilbo",
  "Erevis",
  "Sanic",
  "Thomathy",
  "Speedy",
  "X-301",
  "Mach",
  "Chadley",
  "Hailey",
  "Kaley",
  "Lily",
  "Matthew",
  "Chris",
  "Alex",
  "Miku",
  "Spike",
  "Delainie",
  "Cegi",
  "Saitama",
  "Brody",
  "John",
  "Hank",
];

const last_names = [
  "Fimbleton",
  "Whipplewomp",
  "Knight",
  "Vu",
  "Schmakeit",
  "Hong",
  "Chen",
  "Johnson",
  "Wilson",
  "Smith",
  "Williams",
  "Muller",
  "Martinez",
  "White",
  "Anderson",
  "Moore",
  "Hall",
  "Hill",
  "Green",
  "Adams",
  "King",
  "Nelson",
];

// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

class Runner {
  public age: number;
  public runner_id: number;
  public wins: number;
  public losses: number;
  public first_name: string;
  public last_name: string;

  public phys_factor: number;
  public training_factor: number;
  public nutri_factor: number;
  public psych_factor: number;
  public biomech_factor: number;
  public gene_factor: number;

  // Perhaps could randomly decide if a runner prefers road/trail AND what weather they perform best in (most will be moderate weather)
  // envFactor
  public preferredTerrain: string;
  public preferredWeather: string;

  constructor(runner_id: number) {
    this.age = this.determineAge();
    this.runner_id = runner_id;
    this.wins = 0;
    this.losses = 0;
    this.first_name = this.determineName(first_names);
    this.last_name = this.determineName(last_names);
    this.phys_factor = this.determinePhysFactor(this.age);
    this.training_factor = this.determineTrainingFactor();
    this.nutri_factor = this.determineNutriFactor();
    this.psych_factor = this.determinePsychFactor();
    this.biomech_factor = this.determineBiomechFactor();
    this.gene_factor = this.determineGeneFactor();
    this.preferredTerrain = this.determineTerrainPreference();
    this.preferredWeather = this.determineWeatherPreference();
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
    return roundToChosenDecimal(boundedNormDist(150, 10, 100, 200), 0);
  }

  private determinePsychFactor(): number {
    return roundToChosenDecimal(boundedNormDist(100, 40, 70, 200), 0);
  }

  private determineBiomechFactor(): number {
    return roundToChosenDecimal(boundedNormDist(150, 10, 110, 200), 0);
  }

  private determineGeneFactor(): number {
    return roundToChosenDecimal(boundedNormDist(100, 30, 70, 200), 0);
  }

  private determineTerrainPreference(): string {
    // Possible terrains are road or trail
    const rand_num: number = Math.floor(Math.random() * 2);
    if (rand_num === 0) return "road";
    else return "trail";
  }

  private determineWeatherPreference(): string {
    // Possible weathers are moderate, hot, cold, or rainy
    const rand_num: number = Math.floor(Math.random() * 4);
    switch (rand_num) {
      case 0:
        return "moderate";
      case 1:
        return "hot";
      case 2:
        return "cold";
      case 3:
        return "rainy";
    }
    return "empty plane or existence";
  }

  public describeRunner(): void {
    console.log(
      `Hello! My name is ${this.first_name} ${this.last_name} ` +
        `and my runner ID is ${this.runner_id}. I am ${this.age} years old. ` +
        `I have ${this.wins} wins and ${this.losses} losses. ` +
        `My Physical Factor is ${this.phys_factor}.`
    );
  }
}

const runner1 = new Runner(1004);
runner1.describeRunner();

// class Team {
//   public team_id: number;
//   public team_members: any[];

//   constructor(team_id: number) {
//     this.team_id = team_id;
//     this.team_members = this.generateTeam();
//   }

//   private generateTeam(): any[] {
//     const generated_team: any[] = [];
//     for (let i = 1; i <= 8; i++) {
//       const age_class_generator = Math.floor(Math.random() * (10 + 1));
//       const age = 50;
//       const player_id_generator = 1000 + i;
//       generated_team.push(
//         new Runner(age_class_generator, age, player_id_generator, 0, 0)
//       );
//     }
//     return generated_team;
//   }
// })();

// class Conference {
//   public conference_id: number;
//   public generated_conference: any;

//   constructor(conference_id: number) {
//     this.conference_id = conference_id;
//     this.generated_conference = this.generateConference();
//   }

//   private generateConference(): any[] {
//     const generated_conference: any[] = [];
//     for (let i = 1; i <= 20; i++) {
//       const team_id: number = i * 1000;
//       generated_conference.push(new Team(team_id));
//     }
//     return generated_conference;
//   }
// }

// class IndividualRace {
//   public race_id: number;
// }

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
