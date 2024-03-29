const fs = require('fs');
const axios = require('axios');
const { format } = require('date-fns');

// This function parse the raw data from the API and reduce the size of each file
const parseData = async (listStation) => {
  let i = 0;
  console.log('===Parse data===');
  for (const station of listStation) {
    try {
      const data = fs.readFileSync(`./${station}.json`, 'utf8');

      const parsedData = JSON.parse(data);

      const dataFiltered = parsedData.records
        .map((measure) => ({
          s: measure.fields.sum_counts,
          d: format(new Date(measure.fields.date), 'yyyy-MM-dd:HH'), // Reduce as much as possible json size
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const dataToWrite = {
        nom: parsedData.records[0].fields.nom_compteur,
        id: parsedData.records[0].fields.id_compteur,
        installation_date: parsedData.records[0].fields.installation_date,
        data: dataFiltered,
      };

      fs.writeFileSync(`./${parsedData.records[0].fields.id_compteur}_parsed.json`, JSON.stringify(dataToWrite), 'utf8');
      i += 1;
      console.log(`[${i}/${listStation.length}]Success with station : `, station);
    } catch (e) {
      console.error('Error with the station : ', station, e);
    }
  }
};

// Return a list with the id of each station
const listEveryStation = () => {
  const data = JSON.parse(fs.readFileSync('./comptage-velo-compteurs.json', 'utf8'));
  return data.map((station) => station.fields.id_compteur);
};

// This function query a timeserie for each counter and write it as a json
const fetchAPI = async (listStation) => {
  let i = 0;
  const sleep = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  console.log('===Fetch API===');
  for (const station of listStation) {
    // Can be improved by making simultaneous call (Promise.all)
    try {
      const res = await axios.get(`http://opendata.paris.fr/api/records/1.0/search/?dataset=comptage-velo-donnees-compteurs&q=&rows=10000&refine.id_compteur=${station}`);
      await sleep(10000); // Limit charge on API

      fs.writeFileSync(`./${station}.json`, JSON.stringify(res.data), 'utf8');
      i += 1;
      console.log(`[${i}/${listStation.length}]Success with station : `, station);
    } catch (e) {
      console.error('Error with the station : ', station, e);
    }
  }
};

// This function filter segments depending on the number of contributions to this segments
const filterSegments = async (filter) => {
  const data = JSON.parse(fs.readFileSync('./75056-troncons.json', 'utf8'));
  console.log('Nombre de troncons avant filtrage : ', data.features.length);
  data.features = data.features
    .filter((segment) => parseInt(segment.properties.contributions, 10) >= filter)
    .map((segment) => {
      const obj = segment;
      delete obj.id;
      return obj;
    });
  console.log('Nombre de troncons après filtrage : ', data.features.length);
  fs.writeFileSync('./75056-troncons-filtered.json', JSON.stringify(data), 'utf8');
};

if (require.main === module) {
  // const stationList = listEveryStation();
  // fetchAPI(stationList).then(() => parseData(stationList));
  // parseData(stationList);
  filterSegments(2);
}
