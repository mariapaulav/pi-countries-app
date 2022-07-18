//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 
const { default: axios } = require("axios");
const server = require('./src/app.js'); // importo el server
const { conn, Country} = require('./src/db.js'); // importo la connexion a la DB


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3002, async () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
    try {
      const getAllCountries = await axios.get("https://restcountries.com/v3/all");
      getAllCountries.data.map(async (e) => {
        await Country.findOrCreate({
          where: {
            id: e.cca3,
            name: e.name.common,
            flag: e.flags[0],
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : 'no capital',
            subregion: e.subregion || 'no sr',
            area: e.area,
            population: e.population
          },
        });
      });
      //console.log(getAllCountries)
    } catch (error) {
      console.log(error);
    }
  });
});
