const { Router } = require('express');
const router = Router();
const { Activity, Country} = require("../db");



router.post('/', async (req, res, next) => {

    const { name, difficulty, duration, season, countries } = req.body
 
    try {

        if(name && difficulty && duration && season && countries){
       const addActivity = await Activity.create({
          name,
          difficulty,
          duration,
          season
       })

       countries.forEach( async (element) => {
           const countryExist = await Country.findOne (
               {
                where: { name: element }
               }
           )
           await addActivity.addCountry(countryExist)
       });

       return res.json({ message: 'Activity Created' })
    } else {

        return res.status(400).send({msg: "Info required" });
    }

    } catch (error) {
       next(error)
    }
 })

//  router.post('/', async (req, res, next) => {

//     const { name, difficulty, duration, season, countries } = req.body
 
//     try {
//         // let countryExist = await Country.findAll(
//         //     {
//         //        where: { name: countries }
//         //     })
//         const addActivity = await Activity.create({
//           name,
//           difficulty,
//           duration,
//           season
//        })
       
//        countries.map(p => {
//              addActivity.addCountries(p)
//        })
//        return res.json({ message: 'Activity Created' })
       
//     } catch (error) {
//        next(error)
//     }
//  })




router.get('/',async (req,res, next)=>{

    await Activity.findAll({
        //  order: [ // eliminar estoooo
        //     ['name', 'ASC'],
        // ]
    })
    .then((c)=> { 
        res.send(c)
 })
 .catch(error => {
     next(error)
 })

})

module.exports = router;
