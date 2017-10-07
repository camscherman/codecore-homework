const Express= require('express')
const kx = require('./db/connection')
const router = Express.Router()
const path= require('path')

router.get('/', (req,res)=>{
    res.send('cohorts');

})

router.get('/new', (req,res) =>{
    res.send('new cohort')
})



module.exports = router