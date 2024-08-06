import "./style.css";
// class notes
// public - accessible from inside or outside the class object
// private - accessible only from within the class object for other variables / methods to use
// static - belong to the class itself rather than instances of it so Player.staticProperty rather than player1.staticProperty

// Box-Muller Transform is used to derive a single value pulled from a normal distribution
function normDist(mean: number, standardDeviation: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * standardDeviation + mean;
}

// upper and lower bounds are inclusive
function boundedNormDist(
  mean: number,
  standardDeviation: number,
  lowerBound: number,
  upperBound: number
): number {
  let value = normDist(mean, standardDeviation);
  while (value <= lowerBound || value >= upperBound) {
    value = normDist(mean, standardDeviation);
  }
  return value;
}

function roundToChosenDecimal(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

class Runner {
  public age: number;
  public player_id: number;
  public wins: number;
  public losses: number;

  public physFactor: number;
  public trainingFactor: number;
  public nutriFactor: number;
  // public psychFactor: number;
  // public biomechFactor: number;
  // public geneFactor: number;

  // Perhaps could randomly decide if a runner prefers road/trail AND what weather they perform best in (most will be moderate weather)
  // public envFactor: number;

  // I think the nutriFactor should be determined from a score on the team aka a team may have dialed in nutrition or not.
  constructor(player_id: number) {
    this.age = this.determineAge();
    this.player_id = player_id;
    this.wins = 0;
    this.losses = 0;
    this.physFactor = this.determinePhysFactor(this.age);
    this.trainingFactor = this.determineTrainingFactor();
    this.nutriFactor = this.determineNutriFactor();
  }

  private determineAge(): number {
    let unroundedAge = boundedNormDist(30, 9, 16, 110);
    return roundToChosenDecimal(unroundedAge, 0);
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
}

const runner1 = new Runner(1004);
console.log(runner1.trainingFactor);

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
