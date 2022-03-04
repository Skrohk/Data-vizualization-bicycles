// Sources
// velibStations : https://www.velos-paris.com/en/20th-district.html
// surface (en hectares) : https://fr.vikidia.org/wiki/Arrondissements_de_Paris
// Longueur de pistes cyclables (en km): https://opendata.paris.fr/explore/dataset/reseau-cyclable/
// conflictZoneNb : baromètres des pistes cyclables (même que ce qu'on affiche sur la carte)
// segmentsToImprove : baromètres des pistes cyclables (même que ce qu'on affiche sur la carte)
// BicycleAccidents : https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2020/

const districts = {
  1: {
    velibStations: 26,
    surface: 183,
    bicycleLanesLengthInKm: 39.72937788685002,
    conflictZoneNb: 206,
    bicycleAccidents: 39,
    segmentsToImprove: 206,
  },
  2: {
    velibStations: 25,
    surface: 99,
    bicycleLanesLengthInKm: 24.721217930080012,
    conflictZoneNb: 156,
    bicycleAccidents: 14,
    segmentsToImprove: 608,
  },
  3: {
    velibStations: 14,
    surface: 117,
    bicycleLanesLengthInKm: 16.803117091019995,
    conflictZoneNb: 1,
    bicycleAccidents: 47,
    segmentsToImprove: 259,
  },
  4: {
    velibStations: 27,
    surface: 160,
    bicycleLanesLengthInKm: 33.88434588531001,
    conflictZoneNb: 160,
    bicycleAccidents: 58,
    segmentsToImprove: 307,
  },
  5: {
    velibStations: 37,
    surface: 254,
    bicycleLanesLengthInKm: 31.137377854980013,
    conflictZoneNb: 0,
    bicycleAccidents: 65,
    segmentsToImprove: 261,
  },
  6: {
    velibStations: 33,
    surface: 215,
    bicycleLanesLengthInKm: 28.78847791797,
    conflictZoneNb: 147,
    bicycleAccidents: 58,
    segmentsToImprove: 229,
  },
  7: {
    velibStations: 31,
    surface: 409,
    bicycleLanesLengthInKm: 42.783767180290006,
    conflictZoneNb: 0,
    bicycleAccidents: 50,
    segmentsToImprove: 170,
  },
  8: {
    velibStations: 54,
    surface: 388,
    bicycleLanesLengthInKm: 38.88017503168999,
    conflictZoneNb: 0,
    bicycleAccidents: 58,
    segmentsToImprove: 922,
  },
  9: {
    velibStations: 46,
    surface: 218,
    bicycleLanesLengthInKm: 28.222356026909992,
    conflictZoneNb: 239,
    bicycleAccidents: 36,
    segmentsToImprove: 559,
  },
  10: {
    velibStations: 56,
    surface: 289,
    bicycleLanesLengthInKm: 39.847545720730054,
    conflictZoneNb: 2,
    bicycleAccidents: 101,
    segmentsToImprove: 659,
  },
  11: {
    velibStations: 58,
    surface: 367,
    bicycleLanesLengthInKm: 56.32567890808995,
    conflictZoneNb: 240,
    bicycleAccidents: 100,
    segmentsToImprove: 503,
  },
  12: {
    velibStations: 68,
    surface: 637,
    bicycleLanesLengthInKm: 112.67272976998994,
    conflictZoneNb: 0,
    bicycleAccidents: 113,
    segmentsToImprove: 369,
  },
  13: {
    velibStations: 71,
    surface: 715,
    bicycleLanesLengthInKm: 87.5532313973501,
    conflictZoneNb: 299,
    bicycleAccidents: 78,
    segmentsToImprove: 528,
  },
  14: {
    velibStations: 56,
    surface: 564,
    bicycleLanesLengthInKm: 66.33841729561995,
    conflictZoneNb: 463,
    bicycleAccidents: 50,
    segmentsToImprove: 795,
  },
  15: {
    velibStations: 90,
    surface: 848,
    bicycleLanesLengthInKm: 85.3804414843499,
    conflictZoneNb: 2,
    bicycleAccidents: 96,
    segmentsToImprove: 477,
  },
  16: {
    velibStations: 63,
    surface: 791,
    bicycleLanesLengthInKm: 72.09743985973006,
    conflictZoneNb: 0,
    bicycleAccidents: 110,
    segmentsToImprove: 294,
  },
  17: {
    velibStations: 61,
    surface: 567,
    bicycleLanesLengthInKm: 49.37893226140003,
    conflictZoneNb: 275,
    bicycleAccidents: 73,
    segmentsToImprove: 388,
  },
  18: {
    velibStations: 63,
    surface: 601,
    bicycleLanesLengthInKm: 68.01470035359,
    conflictZoneNb: 272,
    bicycleAccidents: 65,
    segmentsToImprove: 652,
  },
  19: {
    velibStations: 64,
    surface: 679,
    bicycleLanesLengthInKm: 78.91182621183006,
    conflictZoneNb: 242,
    bicycleAccidents: 74,
    segmentsToImprove: 332,
  },
  20: {
    velibStations: 66,
    surface: 598,
    bicycleLanesLengthInKm: 80.17065370062002,
    conflictZoneNb: 216,
    bicycleAccidents: 61,
    segmentsToImprove: 522,
  },
};

const scores = {};
let maxVelib = 0;
let maxBicycleLaneLength = 0;
let maxSegmentsToImprove = 0;
let maxBicycleAccidents = 0;

for (let i = 1; i <= 20; i++) {
  const district = districts[i];
  const surface = district.surface;

  const velibScore = district.velibStations / surface;
  const bicycleLanesScore = district.bicycleLanesLengthInKm / surface;
  const segmentsToImproveScore = district.segmentsToImprove;
  const bicycleAccidentsScore = district.bicycleAccidents;
  if (velibScore >= maxVelib) {
    maxVelib = velibScore;
  }
  if (bicycleLanesScore >= maxBicycleLaneLength) {
    maxBicycleLaneLength = bicycleLanesScore;
  }
  if (segmentsToImproveScore >= maxSegmentsToImprove) {
    maxSegmentsToImprove = segmentsToImproveScore;
  }
  if (bicycleAccidentsScore >= maxBicycleAccidents) {
    maxBicycleAccidents = bicycleAccidentsScore;
  }
}

for (let i = 1; i <= 20; i++) {
  const district = districts[i];
  const surface = district.surface;

  const velibScore = district.velibStations / surface;
  const bicycleLanesScore = district.bicycleLanesLengthInKm / surface;
  const segmentsToImproveScore = district.segmentsToImprove;
  const bicycleAccidentsScore = district.bicycleAccidents;

  const normalizedVelibScore = (velibScore / maxVelib) * 25;
  const normalizedBicycleLanesScore = (bicycleLanesScore / maxBicycleLaneLength) * 25;
  const normalizedSegmentsToImproveScore = (1 - segmentsToImproveScore / maxSegmentsToImprove) * 25;
  const normalizedBicycleAccidentsScore = (1 - bicycleAccidentsScore / maxBicycleAccidents) * 25;

  scores[i] = {
    velibScore: normalizedVelibScore,
    bicycleLanesScore: normalizedBicycleLanesScore,
    segmentsToImproveScore: normalizedSegmentsToImproveScore,
    bicycleAccidentsScore: normalizedBicycleAccidentsScore,
    score:
      normalizedVelibScore +
      normalizedBicycleLanesScore +
      normalizedSegmentsToImproveScore +
      normalizedBicycleAccidentsScore,
  };
}

console.log('scores : ', scores);
