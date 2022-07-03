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

       countries.forEach( async (country) => {
           const countryExist = await Country.findOne (
               {
                where: { name: country }
               }
           )
           await addActivity.addCountries(countryExist)
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


router.get('/', (req,res, next)=>{
    Activity.findAll({
    })
    .then((c)=> { 
        res.send(c)
 })
 .catch(error => {
     next(error)
 })

})

router.get('/:id',async (req,res,next)=>{
    const {id} = req.params
    try {
        if(id){
            const countryId = await Activity.findByPk(id)
            res.send(countryId);
        }
    } catch (error) {
        next(error)
    }

})

router.delete('/:id',async (req,res,next)=>{
    const {id} = req.params
    try {
        const row = await Activity.findOne({
            where: {
                id: id
            }
          });
        if(row){
            await row.destroy(); 
            res.send('deleted');
        }
    } catch (error) {
        next(error, 'error del delete')
    }

})


module.exports = router;
