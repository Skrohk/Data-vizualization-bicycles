// Sources
// velibStations : https://www.velos-paris.com/en/20th-district.html
// surface (en hectares) : https://fr.vikidia.org/wiki/Arrondissements_de_Paris
// Longueur de pistes cyclables (en km): https://opendata.paris.fr/explore/dataset/reseau-cyclable/
// conflictZoneNb : baromètres des pistes cyclables (même que ce qu'on affiche sur la carte)
// BicycleAccidents : https://www.data.gouv.fr/en/datasets/accidents-de-velo/

const districts = {
  1: {
    velibStations: 26,
    surface: 183,
    bicycleLanesLengthInKm: 39.72937788685002,
    conflictZoneNb: 206,
    bicycleAccidents: 39,
  },
  2: {
    velibStations: 25,
    surface: 99,
    bicycleLanesLengthInKm: 24.721217930080012,
    conflictZoneNb: 156,
    bicycleAccidents: 14,
  },
  3: {
    velibStations: 14,
    surface: 117,
    bicycleLanesLengthInKm: 16.803117091019995,
    conflictZoneNb: 1,
    bicycleAccidents: 47,
  },
  4: {
    velibStations: 27,
    surface: 160,
    bicycleLanesLengthInKm: 33.88434588531001,
    conflictZoneNb: 160,
    bicycleAccidents: 58,
  },
  5: {
    velibStations: 37,
    surface: 254,
    bicycleLanesLengthInKm: 31.137377854980013,
    conflictZoneNb: 0,
    bicycleAccidents: 65,
  },
  6: {
    velibStations: 33,
    surface: 215,
    bicycleLanesLengthInKm: 28.78847791797,
    conflictZoneNb: 147,
    bicycleAccidents: 58,
  },
  7: {
    velibStations: 31,
    surface: 409,
    bicycleLanesLengthInKm: 42.783767180290006,
    conflictZoneNb: 0,
    bicycleAccidents: 50,
  },
  8: {
    velibStations: 54,
    surface: 388,
    bicycleLanesLengthInKm: 38.88017503168999,
    conflictZoneNb: 0,
    bicycleAccidents: 58,
  },
  9: {
    velibStations: 46,
    surface: 218,
    bicycleLanesLengthInKm: 28.222356026909992,
    conflictZoneNb: 239,
    bicycleAccidents: 36,
  },
  10: {
    velibStations: 56,
    surface: 289,
    bicycleLanesLengthInKm: 39.847545720730054,
    conflictZoneNb: 2,
    bicycleAccidents: 101,
  },
  11: {
    velibStations: 58,
    surface: 367,
    bicycleLanesLengthInKm: 56.32567890808995,
    conflictZoneNb: 240,
    bicycleAccidents: 100,
  },
  12: {
    velibStations: 68,
    surface: 637,
    bicycleLanesLengthInKm: 112.67272976998994,
    conflictZoneNb: 0,
    bicycleAccidents: 113,
  },
  13: {
    velibStations: 71,
    surface: 715,
    bicycleLanesLengthInKm: 87.5532313973501,
    conflictZoneNb: 299,
    bicycleAccidents: 78,
  },
  14: {
    velibStations: 56,
    surface: 564,
    bicycleLanesLengthInKm: 66.33841729561995,
    conflictZoneNb: 463,
    bicycleAccidents: 50,
  },
  15: {
    velibStations: 90,
    surface: 848,
    bicycleLanesLengthInKm: 85.3804414843499,
    conflictZoneNb: 2,
    bicycleAccidents: 96,
  },
  16: {
    velibStations: 63,
    surface: 791,
    bicycleLanesLengthInKm: 72.09743985973006,
    conflictZoneNb: 0,
    bicycleAccidents: 110,
  },
  17: {
    velibStations: 61,
    surface: 567,
    bicycleLanesLengthInKm: 49.37893226140003,
    conflictZoneNb: 275,
    bicycleAccidents: 73,
  },
  18: {
    velibStations: 63,
    surface: 601,
    bicycleLanesLengthInKm: 68.01470035359,
    conflictZoneNb: 272,
    bicycleAccidents: 65,
  },
  19: {
    velibStations: 64,
    surface: 679,
    bicycleLanesLengthInKm: 78.91182621183006,
    conflictZoneNb: 242,
    bicycleAccidents: 74,
  },
  20: {
    velibStations: 66,
    surface: 598,
    bicycleLanesLengthInKm: 80.17065370062002,
    conflictZoneNb: 216,
    bicycleAccidents: 61,
  },
};

const scores = [];
let maxScore = 0;
for (let i = 1; i <= 20; i++) {
  const district = districts[i];
  const surface = district.surface;
  const score =
    ((district.velibStations / surface) * (district.bicycleLanesLengthInKm / surface)) /
    (district.bicycleAccidents * (district.conflictZoneNb + 1));
  if (score >= maxScore) {
    maxScore = score;
  }
  console.log(`Arrondissement ${i}: score = ${score}`);
  scores.push({ arr: i, score: score });
}

const normalizedScores = scores.map((score) => ({ arr: score.arr, score: score.score / maxScore }));

normalizedScores.sort((a, b) => {
  if (a.score > b.score) return -1;
  if (b.score > a.score) return 1;
  return 0;
});

console.log(normalizedScores);

// [
//   { arr: 5, score: 1 },
//   { arr: 8, score: 0.8752408018842658 },
//   { arr: 3, score: 0.6654498649140026 },
//   { arr: 12, score: 0.6082294573125668 },
//   { arr: 7, score: 0.5771930919281097 },
//   { arr: 10, score: 0.3209580845430903 },
//   { arr: 16, score: 0.24022144201225026 },
//   { arr: 15, score: 0.1350559562358037 },
//   { arr: 2, score: 0.1044260434299226 },
//   { arr: 4, score: 0.013930479466429627 },
//   { arr: 1, score: 0.013907370015675206 },
//   { arr: 9, score: 0.011508570887582123 },
//   { arr: 6, score: 0.008714912756141786 },
//   { arr: 20, score: 0.004068782289083291 },
//   { arr: 11, score: 0.0036633826689306944 },
//   { arr: 18, score: 0.002433410735708922 },
//   { arr: 19, score: 0.0022173872966184285 },
//   { arr: 13, score: 0.0018914706912158703 },
//   { arr: 14, score: 0.001832331167688562 },
//   { arr: 17, score: 0.001692662991007479 }
// ]
