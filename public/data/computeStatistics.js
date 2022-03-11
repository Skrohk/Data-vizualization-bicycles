const fs = require('fs');
const csv = require('csv-parser');

const getBicyleLaneLengthByDistrict = () => {
  const rawdata = fs.readFileSync('reseau-cyclable.json');
  const data = JSON.parse(rawdata);

  const sumByDisctrict = {};
  for (let lane of data) {
    if (!lane.fields.arrdt) {
      continue;
    }
    if (sumByDisctrict[lane.fields.arrdt]) {
      sumByDisctrict[lane.fields.arrdt] += lane.fields.longueur_du_troncon_en_km;
    } else {
      sumByDisctrict[lane.fields.arrdt] = lane.fields.longueur_du_troncon_en_km;
    }
  }

  console.log(sumByDisctrict);
};

const getAccidentsByDistrict = () => {
  const data = [];
  const accidentsByDistrict = {};
  const minDate = new Date('2000-01-01');
  fs.createReadStream('accidents-velos.csv')
    .pipe(csv())
    .on('data', (row) => {
      const commune = parseInt(row.commune);
      const date = new Date(row.date);
      if (commune >= 75000 && commune <= 75020 && date >= minDate) {
        data.push(row);
        if (!accidentsByDistrict[commune]) {
          accidentsByDistrict[commune] = 1;
        } else {
          accidentsByDistrict[commune] += 1;
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(data.length);
      console.log(accidentsByDistrict);
    });
};

// Fonction used in Map.vue component to compute some geographic stats
// computeStats() {
//   const pointNbByDistrict = {};
//   let totalSum = 0;
//   dataSegments.features.forEach((segment) => {
//     this.district.forEach((district) => {
//       if (d3.geoContains(district, segment.geometry.coordinates[0])) {
//         const districtNb = district.properties.c_ar;
//         if (!pointNbByDistrict[districtNb]) {
//           pointNbByDistrict[districtNb] = segment.properties.contributions;
//         } else {
//           pointNbByDistrict[districtNb] += segment.properties.contributions;
//         }
//         totalSum += 1;
//       }
//     });
//   });
// }

// Function used in Map.vue to filter the conflict points
// We only wanted to keep points inside Paris, not the whole Ile de France

// computeStats() {
//   const pointsInParis = [];
//   console.log('Total point nb : ', dataDangerousPoints.features.length);
//   dataDangerousPoints.features.forEach((point, index) => {
//     if (index % 10000 === 0) {
//       console.log('Index : ', index, 'Points : ', pointsInParis.length);
//     }
//     this.district.forEach((district) => {
//       if (d3.geoContains(district, point.geometry.coordinates)) {
//         pointsInParis.push(point);
//       }
//     });
//   });
//   console.log(pointsInParis);
// }
