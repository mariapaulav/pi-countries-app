const { Router } = require('express');
// Importar todos los routers;
const countryRoute = require('./country')
const activityRoute = require('./activity')
// const {Country} = require ('../db')
// const axios = require('axios')

const router = Router();

// genero los middlewares para usar las rutas 
router.use('/country',countryRoute )
router.use('/activity',activityRoute )



module.exports = router;
