const { Router } = require('express');
const router = Router();
const {Op} = require('sequelize')
const {Country, Activity} = require ('../db') // me traigo los modelos 

router.get('/',async (req,res,next)=>{
    const { name } = req.query;
    try {
        if(name){
            const country = await Country.findAll({
                include: Activity,
                // attributes: [ 'name', 'id'], // 
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`,
                    }
                },
            })
            if(country.length === 0){
                res.status(404).send(`Country doesn't exist`)
            }else{
            res.json(country)
            }
        }else{
            await Country.findAll({
                include: Activity,
                //  order: [ 
                //     ['name', 'ASC'],
                // ]
            })
            .then((c)=> { 
                res.send(c)
         })
         .catch(error => {
             next(error, 'sere yo')
         })
        }
    } catch (error) {
        next(error, 'o yo ')
    }
})


router.get('/:id',async (req,res,next)=>{

    const {id} = req.params
    try {
        if(id){
            const countryId = await Country.findByPk(id, {
                include: Activity,
            })
            res.send(countryId);
        }
    } catch (error) {
        next(error)
    }

})


// router.get('/',(req,res)=>{
//     res.send('Soy get /country')
// })

// router.post('/',(req,res)=>{
//     res.send('Soy post /country')
// })

// router.put('/',(req,res)=>{
//     res.send('Soy put /country')
// })

// router.delete('/',(req,res)=>{
//     res.send('Soy delete /country')
// })

module.exports = router;
