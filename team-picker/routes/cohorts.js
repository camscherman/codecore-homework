const Express= require('express')
//const kx = require('./db/connection')
const router = Express.Router()
const path= require('path')
const fake_db = require('../db/fake_db')

router.get('/', (req,res)=>{
    const {name, photo_url, members, id} = fake_db;
    res.render('cohorts/index', {name,photo_url, members,id});

})

router.get('/new', (req,res) =>{
    res.render('cohorts/new')
})




module.exports = router
