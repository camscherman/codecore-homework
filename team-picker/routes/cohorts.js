const Express= require('express')
const kx = require('../db/connection')
const router = Express.Router()
const path= require('path')
const helpers = require('../helpers.js')
const multer = require('multer')
const Cohort = require('../helpers/cohort')

const upload = multer({dest: path.join(__dirname, '..','/public','/uploads')})

router.get('/', (req,res)=>{
    kx.select().from('cohorts').then((cohorts)=>{
      debugger
      res.render('cohorts/index', {cohorts});
    })

})

router.get('/new', (req,res) =>{
  res.render('cohorts/new')
})

router.post('/',upload.single('teamphoto'), (req,res) =>{
  
   const {filename} = req.file
   const {name, members} = req.body
   kx.insert({name: name, members: members, logo_url: `/uploads/${filename}`}).into('cohorts')
   .then(() => res.redirect('/cohorts'))

} )

router.get('/:id', (req, res) =>{
  
  let my_id = +req.params.id
  let teams = null
  let {count , selection} = req.query
  kx.first().from('cohorts').where('id',my_id ).then((cohort) =>{
    let curr_cohort = new Cohort(cohort.name, cohort.members, cohort.id)
    if(!!count){
      curr_cohort.makeTeams(count, selection)
    }
    res.render('cohorts/show', {curr_cohort})
  })
  
})













module.exports = router

