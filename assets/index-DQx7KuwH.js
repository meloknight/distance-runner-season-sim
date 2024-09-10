var L=Object.defineProperty;var w=(c,t,e)=>t in c?L(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var r=(c,t,e)=>w(c,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const b=["Brave","Calm","Daring","Eager","Faithful","Gentle","Happy","Jolly","Kind","Lively","Merry","Nice","Polite","Proud","Quiet","Silly","Thoughtful","Victorious","Witty","Zealous","Angry","Bold","Careful","Delightful","Elegant","Fancy","Graceful","Humble","Intelligent","Joyful","Keen","Lazy","Modest","Nervous","Optimistic","Peaceful","Reliable","Strong","Talented","Unique","Adventurous","Bright","Charming","Courageous","Diligent","Enthusiastic","Friendly","Generous","Harmonious","Imaginative","Jovial","Loyal","Magical","Noble","Patient","Resourceful","Sincere","Tough","Vibrant","Wise","Zany"],S=["Lions","Tigers","Elephants","Giraffes","Zebras","Kangaroos","Pandas","Gorillas","Chimpanzees","Hippopotamuses","Rhinoceroses","Leopards","Cheetahs","Wolves","Foxes","Bears","Deer","Moose","Antelopes","Buffalo","Camels","Horses","Donkeys","Sheep","Goats","Cows","Pigs","Dogs","Cats","Rabbits","Squirrels","Rats","Mice","Bats","Whales","Dolphins","Sharks","Octopuses","Lobsters","Crabs","Turtles","Frogs","Snakes","Crocodiles","Alligators","Lizards","Eagles","Hawks","Owls","Parrots","Penguins","Ostriches","Flamingos","Swans","Ducks","Chickens","Turkeys","Peacocks","Koalas","Salmons","Jellyfish"],z=["Willis","Timmy","Bilbo","Erevis","Sanic","Thomathy","Speedy","X-301","Mach","Chadley","Hailey","Kaley","Lily","Matthew","Chris","Alex","Miku","Spike","Delainie","Cegi","Saitama","Brody","John","Hank","Bugee","Emma","Michael","Sophia","James","Olivia","William","Ava","Benjamin","Isabella","Lucas","Mia","Henry","Charlotte","Alexander","Amelia","Jackson","Harper","Liam","Evelyn","Daniel","Abigail","Matthew","Emily","David","Ella","Joseph","Scarlett","Samuel","Grace","Gabriel","Hannah","Noah","Aria","Sebastian","Lily","Elijah","Zoe","Christopher","Chloe","Nathan","Sofia","Andrew","Victoria","Ethan","Aubrey","Isaac","Penelope","Caleb","Stella"],B=["Fimbleton","Whipplewomp","Knight","Vu","Schmakeit","Hong","Chen","Johnson","Wilson","Smith","Williams","Muller","Martinez","White","Anderson","Moore","Hall","Hill","Green","Adams","King","Nelson","Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts","Gomez"];function M(c,t){const e=Math.random(),s=Math.random();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*s)*t+c}function f(c,t,e,s){let n=M(c,t);for(;n<=e||n>=s;)n=M(c,t);return n}function u(c,t){const e=Math.pow(10,t);return Math.round(c*e)/e}function P(){switch(Math.floor(Math.random()*5)){case 0:return"5 km";case 1:return"10 km";case 2:return"half marathon";case 3:return"marathon";case 4:return"100 mile"}return"5 km"}function C(){switch(Math.floor(Math.random()*4)){case 0:return"moderate";case 1:return"hot";case 2:return"cold";case 3:return"rainy"}return"moderate"}function I(){return Math.floor(Math.random()*2)===0?"road":"trail"}class U{constructor(t){r(this,"age");r(this,"runner_id");r(this,"golds");r(this,"silvers");r(this,"bronzes");r(this,"runner_points");r(this,"first_name");r(this,"last_name");r(this,"current_runner_modified_skill_class");r(this,"race_info_for_runner");r(this,"already_chosen_for_current_race");r(this,"stats_per_race_type");r(this,"phys_factor");r(this,"training_factor");r(this,"nutri_factor");r(this,"psych_factor");r(this,"biomech_factor");r(this,"gene_factor");r(this,"skill_class_5km");r(this,"skill_class_10km");r(this,"skill_class_half_marathon");r(this,"skill_class_marathon");r(this,"skill_class_100mile");r(this,"runners_preferred_distance");r(this,"preferredTerrain");r(this,"preferredWeather");this.age=this.determineAge(),this.runner_id=t,this.runner_points=0,this.golds=0,this.silvers=0,this.bronzes=0,this.first_name=this.determineName(z),this.last_name=this.determineName(B),this.race_info_for_runner=[],this.current_runner_modified_skill_class=1,this.already_chosen_for_current_race=!1,this.stats_per_race_type={"5 km":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"10 km":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"half marathon":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},marathon:{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"100 mile":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0}},this.phys_factor=this.determinePhysFactor(this.age),this.training_factor=this.determineTrainingFactor(),this.nutri_factor=this.determineNutriFactor(),this.psych_factor=this.determinePsychFactor(),this.biomech_factor=this.determineBiomechFactor(),this.gene_factor=this.determineGeneFactor(),this.preferredTerrain=this.determineTerrainPreference(),this.preferredWeather=this.determineWeatherPreference(),this.skill_class_5km=this.determineSkillClass("5 km"),this.skill_class_10km=this.determineSkillClass("10 km"),this.skill_class_half_marathon=this.determineSkillClass("half marathon"),this.skill_class_marathon=this.determineSkillClass("marathon"),this.skill_class_100mile=this.determineSkillClass("100 mile"),this.runners_preferred_distance=this.determineDistancePreferrence()}determineAge(){let t=f(30,9,16,110);return u(t,0)}determineName(t){const e=t.length,s=Math.floor(Math.random()*e);return t[s]}determineSkillClass(t){return t==="5 km"?u(1.7*this.phys_factor+this.training_factor+.7*this.nutri_factor+1.2*this.psych_factor+1.3*this.biomech_factor+this.gene_factor,0):t==="10 km"?u(1.6*this.phys_factor+this.training_factor+.8*this.nutri_factor+1.2*this.psych_factor+1.3*this.biomech_factor+this.gene_factor,0):t==="half marathon"?u(1.3*this.phys_factor+this.training_factor+1.1*this.nutri_factor+1.2*this.psych_factor+1.3*this.biomech_factor+this.gene_factor,0):t==="marathon"?u(1.3*this.phys_factor+this.training_factor+1.2*this.nutri_factor+1.2*this.psych_factor+1.2*this.biomech_factor+this.gene_factor,0):t==="100 mile"?u(.9*this.phys_factor+this.training_factor+1.5*this.nutri_factor+1.6*this.psych_factor+.9*this.biomech_factor+this.gene_factor,0):5}determineDistancePreferrence(){const t=new Set,e=["5 km","10 km","half marathon","marathon","100 mile"];let s=[];for(;t.size<e.length;){const n=Math.floor(Math.random()*e.length);t.has(n)||(s.push(e[n]),t.add(n))}return s}determinePhysFactor(t){let e=0;return t<30?e=40:t<40?e=25:t<55&&(e=10),u(f(100+e,20,80,200),0)}determineTrainingFactor(){return u(f(130,30,80,200),0)}determineNutriFactor(){return u(f(130,10,100,200),0)}determinePsychFactor(){return u(f(130,40,70,200),0)}determineBiomechFactor(){return u(f(130,10,110,200),0)}determineGeneFactor(){return u(f(100,30,70,200),0)}determineTerrainPreference(){return I()}determineWeatherPreference(){return C()}describeRunner(){console.log(`Hello! My name is ${this.first_name} ${this.last_name} and my runner ID is ${this.runner_id}. I am ${this.age} years old. I have ${this.runner_points} points, ${this.golds} golds, ${this.silvers} silvers, and ${this.bronzes} bronzes. My 5km Skill Class is ${this.skill_class_5km}. My 10km Skill Class is ${this.skill_class_10km}. My half marathon Skill Class is ${this.skill_class_half_marathon}. My marathon Skill Class is ${this.skill_class_marathon}. My 100mile Skill Class is ${this.skill_class_100mile}. `)}}class D{constructor(t){r(this,"team_id");r(this,"team_name");r(this,"team_members");r(this,"team_points");r(this,"golds");r(this,"silvers");r(this,"bronzes");r(this,"team_stats_per_race_type");this.team_id=t,this.team_name=this.generateTeamName(),this.team_stats_per_race_type={"5 km":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"10 km":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"half marathon":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},marathon:{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0},"100 mile":{points:0,golds:0,silvers:0,bronzes:0,race_run_in_category:0}},this.team_points=0,this.golds=0,this.silvers=0,this.bronzes=0,this.team_members=this.generateTeam()}generateTeam(){const t=[];for(let e=1;e<=8;e++){const s=this.team_id+e;t.push(new U(s))}return t}generateTeamName(){const t=Math.floor(Math.random()*S.length),e=Math.floor(Math.random()*b.length);return`The ${b[e]} ${S[t]}`}}class A{constructor(t){r(this,"conference_id");r(this,"generated_conference");r(this,"all_runners");this.all_runners=[],this.conference_id=t,this.generated_conference=this.generateConference(),this.collectAllRunners()}generateConference(){const t=[];for(let e=1;e<=20;e++){const s=e*1e3;t.push(new D(s))}return t}consolidatePoints(){const t=this.generated_conference.length;for(let e=0;e<t;e++){const s=this.generated_conference[e].team_members.length;let n=0,a=0,i=0,o=0;for(let l=0;l<s;l++){const _=this.generated_conference[e].team_members[l];n+=3*_.golds,n+=2*_.silvers,n+=1*_.bronzes,a+=_.golds,i+=_.silvers,o+=_.bronzes;let m=0;m+=3*_.golds,m+=2*_.silvers,m+=1*_.bronzes,_.runner_points=m}this.generated_conference[e].team_points=n,this.generated_conference[e].golds=a,this.generated_conference[e].silvers=i,this.generated_conference[e].bronzes=o}}collectAllRunners(){this.generated_conference.forEach(t=>{t.team_members.forEach(e=>{this.all_runners.push(e)})})}orderAllRunners(){for(let t=0;t<this.all_runners.length-1;t++)for(let e=0;e<this.all_runners.length-1-t;e++)if(this.all_runners[e].runner_points<this.all_runners[e+1].runner_points){const s=this.all_runners[e];this.all_runners[e]=this.all_runners[e+1],this.all_runners[e+1]=s}}orderAllTeams(){for(let t=0;t<this.generated_conference.length-1;t++)for(let e=0;e<this.generated_conference.length-1-t;e++)if(this.generated_conference[e].team_points<this.generated_conference[e+1].team_points){const s=this.generated_conference[e];this.generated_conference[e]=this.generated_conference[e+1],this.generated_conference[e+1]=s}}accumulateTeamPointsPerRaceType(t){this.generated_conference.forEach(e=>{let s=0,n=0,a=0,i=0,o=0;e.team_members.forEach(l=>{s+=l.stats_per_race_type[t].golds,n+=l.stats_per_race_type[t].silvers,a+=l.stats_per_race_type[t].bronzes,i+=l.stats_per_race_type[t].points,o+=l.stats_per_race_type[t].race_run_in_category}),e.team_stats_per_race_type[t].golds=s,e.team_stats_per_race_type[t].silvers=n,e.team_stats_per_race_type[t].bronzes=a,e.team_stats_per_race_type[t].points=i,e.team_stats_per_race_type[t].race_run_in_category=o})}}class x{constructor(t,e,s,n){r(this,"conference");r(this,"race_id");r(this,"race_distance");r(this,"runner_list");r(this,"race_weather");r(this,"race_terrain");r(this,"gold_runner_id");r(this,"silver_runner_id");r(this,"bronze_runner_id");r(this,"race_date");r(this,"runner_info");this.conference=t,this.race_id=e,this.race_date=n,this.gold_runner_id=-1,this.silver_runner_id=-1,this.bronze_runner_id=-1,this.runner_info=[],this.race_distance=P(),this.runner_list=s,this.race_weather=C(),this.race_terrain=I(),this.determineRacedaySkillClass(),this.determinePlacements(),this.addSpecificStatsToRunner("5 km"),this.addSpecificStatsToRunner("10 km"),this.addSpecificStatsToRunner("half marathon"),this.addSpecificStatsToRunner("marathon"),this.addSpecificStatsToRunner("100 mile")}determineRacedaySkillClass(){this.runner_list.forEach(t=>{const s=this.race_weather===t.preferredWeather?1.1:1,a=this.race_terrain===t.preferredTerrain?1.1:1;let i;switch(this.race_distance){case"5 km":i=t.skill_class_5km;break;case"10 km":i=t.skill_class_10km;break;case"half marathon":i=t.skill_class_half_marathon;break;case"marathon":i=t.skill_class_marathon;break;case"100 mile":i=t.skill_class_100mile;break;default:i=0}const o=f(1,.08,.8,1.2),l=Math.floor(s*a*o*i);this.runner_info.push({runner_id:t.runner_id,runner_modified_skill_class:l}),t.race_info_for_runner.push({race_id:this.race_id,runner_weather_modifier:s,runner_terrain_modifier:a,runner_raceday_luck:o,runner_unmodified_skillclass:i,runner_modified_skill_class:l})})}determinePlacements(){for(let n=0;n<this.runner_info.length-1;n++)for(let a=0;a<this.runner_info.length-1-n;a++)if(this.runner_info[a].runner_modified_skill_class<this.runner_info[a+1].runner_modified_skill_class){const i=this.runner_info[a];this.runner_info[a]=this.runner_info[a+1],this.runner_info[a+1]=i}const t=this.runner_list.filter(n=>n.runner_id===this.runner_info[0].runner_id)[0],e=this.runner_list.filter(n=>n.runner_id===this.runner_info[1].runner_id)[0],s=this.runner_list.filter(n=>n.runner_id===this.runner_info[2].runner_id)[0];t.golds++,e.silvers++,s.bronzes++,this.gold_runner_id=this.runner_info[0].runner_id,this.silver_runner_id=this.runner_info[1].runner_id,this.bronze_runner_id=this.runner_info[2].runner_id}addSpecificStatsToRunner(t){this.conference.all_runners.forEach(e=>{this.race_distance===t&&(e.stats_per_race_type[t].race_run_in_category++,e.runner_id===this.gold_runner_id?(e.stats_per_race_type[t].golds++,e.stats_per_race_type[t].points+=3):e.runner_id===this.silver_runner_id?(e.stats_per_race_type[t].silvers++,e.stats_per_race_type[t].points+=2):e.runner_id===this.bronze_runner_id&&(e.stats_per_race_type[t].bronzes++,e.stats_per_race_type[t].points+=1))})}}class F{constructor(t,e){r(this,"schedule_year");r(this,"conference");r(this,"race_dates");r(this,"current_race_id");r(this,"races_per_weekend");r(this,"race_list");this.schedule_year=t,this.conference=e,this.race_list=[],this.race_dates=[],this.current_race_id=0,this.createRaceDates(),this.races_per_weekend=[],this.determineNumberOfRacesPerRaceWeekend(),this.runTheRaces(),this.consolidateTeamAndRunnerPoints()}createRaceDates(){let t=1;for(let n=1;n<8;n++){const a=new Date(this.schedule_year,2,n);a.getDay()===6&&(t=n,this.race_dates.push(a))}let e,s=1;do e=new Date(this.schedule_year,2,t+14*s),e.getMonth()<9&&this.race_dates.push(e),s++;while(e.getMonth()<9)}determineNumberOfRacesPerRaceWeekend(){for(let t=0;t<this.race_dates.length;t++){const e=Math.floor(f(3.5,1.5,2,6));this.races_per_weekend.push(e)}}allocateRunnersForIndividualRace(t){const e=[];for(let o=0;o<t;o++)e.push([]);let s=0,n=0,a=0;const i=this.conference.generated_conference.length;for(let o=0;o<i;o++)a+=this.conference.generated_conference[o].team_members.length;for(let o=0;o<a;o++){const l=this.conference.generated_conference[n].team_members,_=Math.floor(Math.random()*l.length);let m=0;for(;m<100;)if(l[_].already_chosen_for_current_race===!1){e[s].push(l[_]),l[_].already_chosen_for_current_race=!0;break}else m++;n<i-1?n++:n=0,s<t-1?s++:s=0}for(let o=0;o<t;o++)for(let l=0;l<e[o].length;l++)e[o][l].already_chosen_for_current_race=!1;return e}runTheRaces(){let t=1;for(let e=0;e<this.race_dates.length;e++){const s=this.races_per_weekend[e],n=this.allocateRunnersForIndividualRace(s);for(let a=0;a<s;a++)this.race_list.push(new x(this.conference,t,n[a],this.race_dates[e])),t++}}consolidateTeamAndRunnerPoints(){this.conference.consolidatePoints()}}class H{constructor(t){r(this,"conference");r(this,"runner_5km_stats");r(this,"runner_10km_stats");r(this,"runner_half_marathon_stats");r(this,"runner_marathon_stats");r(this,"runner_100mile_stats");r(this,"team_5km_stats");r(this,"team_10km_stats");r(this,"team_half_marathon_stats");r(this,"team_marathon_stats");r(this,"team_100mile_stats");this.conference=t,this.orderAllRunnersInConference(),this.orderAllTeamsInConference(),this.runner_5km_stats=this.accumulateStats("5 km"),this.runner_10km_stats=this.accumulateStats("10 km"),this.runner_half_marathon_stats=this.accumulateStats("half marathon"),this.runner_marathon_stats=this.accumulateStats("marathon"),this.runner_100mile_stats=this.accumulateStats("100 mile"),this.accumulateTeamStats(),this.team_5km_stats=this.orderTeamsByRaceType("5 km"),this.team_10km_stats=this.orderTeamsByRaceType("10 km"),this.team_half_marathon_stats=this.orderTeamsByRaceType("half marathon"),this.team_marathon_stats=this.orderTeamsByRaceType("marathon"),this.team_100mile_stats=this.orderTeamsByRaceType("100 mile")}orderAllRunnersInConference(){this.conference.orderAllRunners()}orderAllTeamsInConference(){this.conference.orderAllTeams()}accumulateStats(t){const e=[...this.conference.all_runners];for(let s=0;s<e.length-1;s++)for(let n=0;n<e.length-1-s;n++)if(e[n].stats_per_race_type[t].points<e[n+1].stats_per_race_type[t].points){const a=e[n];e[n]=e[n+1],e[n+1]=a}return e}accumulateTeamStats(){this.conference.accumulateTeamPointsPerRaceType("5 km"),this.conference.accumulateTeamPointsPerRaceType("10 km"),this.conference.accumulateTeamPointsPerRaceType("half marathon"),this.conference.accumulateTeamPointsPerRaceType("marathon"),this.conference.accumulateTeamPointsPerRaceType("100 mile")}orderTeamsByRaceType(t){const e=[...this.conference.generated_conference];for(let s=0;s<e.length-1;s++)for(let n=0;n<e.length-1-s;n++)if(e[n].team_stats_per_race_type[t].points<e[n+1].team_stats_per_race_type[t].points){const a=e[n];e[n]=e[n+1],e[n+1]=a}return e}}class N{constructor(t,e){r(this,"conference");r(this,"ScoreInformation");r(this,"overallTop3RunnersUL");r(this,"overallTop3TeamsUL");r(this,"top3Teams5kmUL");r(this,"top3Runners5kmUL");r(this,"top3Teams10kmUL");r(this,"top3Runners10kmUL");r(this,"top3TeamsHalfMarathonUL");r(this,"top3RunnersHalfMarathonUL");r(this,"top3TeamsMarathonUL");r(this,"top3RunnersMarathonUL");r(this,"top3Teams100MileUL");r(this,"top3Runners100MileUL");this.conference=t,this.ScoreInformation=e,this.overallTop3TeamsUL=document.getElementById("overall-top-3-teams"),this.overallTop3RunnersUL=document.getElementById("overall-top-3-runners"),this.top3Teams5kmUL=document.getElementById("5km-top-3-teams"),this.top3Runners5kmUL=document.getElementById("5km-top-3-runners"),this.top3Teams10kmUL=document.getElementById("10km-top-3-teams"),this.top3Runners10kmUL=document.getElementById("10km-top-3-runners"),this.top3TeamsHalfMarathonUL=document.getElementById("half-marathon-top-3-teams"),this.top3RunnersHalfMarathonUL=document.getElementById("half-marathon-top-3-runners"),this.top3TeamsMarathonUL=document.getElementById("marathon-top-3-teams"),this.top3RunnersMarathonUL=document.getElementById("marathon-top-3-runners"),this.top3Teams100MileUL=document.getElementById("100mile-top-3-teams"),this.top3Runners100MileUL=document.getElementById("100mile-top-3-runners"),this.updateTeamSelect(),this.displayOverallTop3Teams(),this.displayRaceTypeTop3Teams(this.top3Teams5kmUL,"5 km",this.ScoreInformation.team_5km_stats),this.displayRaceTypeTop3Teams(this.top3Teams10kmUL,"10 km",this.ScoreInformation.team_10km_stats),this.displayRaceTypeTop3Teams(this.top3TeamsHalfMarathonUL,"half marathon",this.ScoreInformation.team_half_marathon_stats),this.displayRaceTypeTop3Teams(this.top3TeamsMarathonUL,"marathon",this.ScoreInformation.team_marathon_stats),this.displayRaceTypeTop3Teams(this.top3Teams100MileUL,"100 mile",this.ScoreInformation.team_100mile_stats),this.displayOverallTop3Runners(),this.displayRaceTypeTop3Runners(this.top3Runners5kmUL,"5 km",this.ScoreInformation.runner_5km_stats),this.displayRaceTypeTop3Runners(this.top3Runners10kmUL,"10 km",this.ScoreInformation.runner_10km_stats),this.displayRaceTypeTop3Runners(this.top3RunnersHalfMarathonUL,"half marathon",this.ScoreInformation.runner_half_marathon_stats),this.displayRaceTypeTop3Runners(this.top3RunnersMarathonUL,"marathon",this.ScoreInformation.runner_marathon_stats),this.displayRaceTypeTop3Runners(this.top3Runners100MileUL,"100 mile",this.ScoreInformation.runner_100mile_stats)}updateTeamSelect(){const t=document.getElementById("team-select");t&&(t.innerHTML="");const e=document.createElement("option");e.value="",e.text="-- Select a team --",t==null||t.appendChild(e);for(let s=0;s<this.conference.generated_conference.length;s++){const n=this.conference.generated_conference[s],a=document.createElement("option");a.value=n.team_id.toString(),a.text=`${n.team_name} (ID: ${n.team_id})`,t==null||t.appendChild(a)}}displayRunnerReview(t){const e=document.getElementById("runner-review-id"),s=document.getElementById("runner-review-name"),n=document.getElementById("runner-review-age"),a=document.getElementById("runner-review-team"),i=document.getElementById("runner-review-points"),o=document.getElementById("runner-review-golds"),l=document.getElementById("runner-review-silvers"),_=document.getElementById("runner-review-bronzes"),m=document.getElementById("runner-review-races-run"),y=document.getElementById("runner-review-5km-sc"),p=document.getElementById("runner-review-10km-sc"),T=document.getElementById("runner-review-half-marathon-sc"),g=document.getElementById("runner-review-marathon-sc"),k=document.getElementById("runner-review-100mile-sc"),h=this.conference.all_runners.filter(v=>v.runner_id==t)[0];s&&(s.textContent=`Name: ${h.first_name} ${h.last_name}`),e&&(e.textContent=`Runner ID: ${h.runner_id}`),n&&(n.textContent=`Age: ${h.age}`);const $=Math.floor(h.runner_id/1e3)*1e3,E=this.conference.generated_conference.filter(v=>v.team_id===$)[0].team_name;a&&(a.textContent=`Team: ${E}`),i&&(i.textContent=`Points: ${h.runner_points}`),o&&(o.textContent=`Gold(s): ${h.golds}`),l&&(l.textContent=`Silver(s): ${h.silvers}`),_&&(_.textContent=`Bronze(s): ${h.bronzes}`),m&&(m.textContent=`Number of Races Run: ${h.race_info_for_runner.length}`),y&&(y.textContent=`5km Skill Class: ${h.skill_class_5km}`),p&&(p.textContent=`10km Skill Class: ${h.skill_class_10km}`),T&&(T.textContent=`Half Marathon Skill Class: ${h.skill_class_half_marathon}`),g&&(g.textContent=`Marathon Skill Class: ${h.skill_class_marathon}`),k&&(k.textContent=`100mile Skill Class: ${h.skill_class_100mile}`)}displayRaceTypeTop3Teams(t,e,s){if(t)for(let n=0;n<t.children.length;n++){const a=s[n];t.children[n].textContent=`${a.team_name} (ID: ${a.team_id}) - ${a.team_stats_per_race_type[e].points} pts - ${a.team_stats_per_race_type[e].golds} golds - ${a.team_stats_per_race_type[e].silvers} silvers - ${a.team_stats_per_race_type[e].bronzes} bronzes`}}displayRaceTypeTop3Runners(t,e,s){if(t)for(let n=0;n<t.children.length;n++){const a=s[n],i=`${a.first_name} ${a.last_name}`;t.children[n].textContent=`${i} (ID: ${a.runner_id}) - ${a.stats_per_race_type[e].points} pts - ${a.stats_per_race_type[e].golds} golds - ${a.stats_per_race_type[e].silvers} silvers - ${a.stats_per_race_type[e].bronzes} bronzes`}}displayOverallTop3Teams(){if(this.overallTop3TeamsUL)for(let t=0;t<this.overallTop3TeamsUL.children.length;t++){const e=this.conference.generated_conference[t];this.overallTop3TeamsUL.children[t].textContent=`${e.team_name} (ID: ${e.team_id}) - ${e.team_points} pts - ${e.golds} golds - ${e.silvers} silvers - ${e.bronzes} bronzes`}}displayOverallTop3Runners(){if(this.overallTop3RunnersUL)for(let t=0;t<this.overallTop3RunnersUL.children.length;t++){const e=this.conference.all_runners[t],s=`${e.first_name} ${e.last_name}`;this.overallTop3RunnersUL.children[t].textContent=`${s} (ID: ${e.runner_id}) - ${e.runner_points} pts - ${e.golds} golds - ${e.silvers} silvers - ${e.bronzes} bronzes`}}}const R=document.getElementById("how-it-works-reveal-button"),d=document.getElementById("how-it-works-list");console.log("hello");R==null||R.addEventListener("click",()=>{d&&((d==null?void 0:d.style.display)==="none"||(d==null?void 0:d.style.display)===""?(d.style.display="block",R.textContent="Collapse"):(d.style.display="none",R.textContent="Expand"))});document.addEventListener("DOMContentLoaded",()=>{document.getElementById("user-form").addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("year").value;console.log(e);const s=new A(1);console.log(s);const n=new F(Number(e),s);console.log(n);const a=new H(s);console.log(a);const i=new N(s,a),o=document.getElementById("team-select");o==null||o.addEventListener("change",l);function l(m){if(m.target){const y=m.target.value,p=document.getElementById("runner-select");p&&(p.innerHTML='<option value="">-- Select a runner --</option>');const T=s.generated_conference.filter(g=>g.team_id==y)[0];for(let g=0;g<T.team_members.length;g++){const k=T.team_members[g],h=document.createElement("option");h.value=k.runner_id.toString(),h.text=`${k.first_name} ${k.last_name} (ID: ${k.runner_id})`,p==null||p.appendChild(h)}}}const _=document.getElementById("runner-select");_&&(_.innerHTML='<option value="">-- Select a runner --</option>',_.addEventListener("change",function(m){if(m.target){const y=m.target.value;console.log(y),i.displayRunnerReview(y)}}))})});
