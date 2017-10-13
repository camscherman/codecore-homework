const Express= require('express')
const kx = require('../db/connection')
const router = Express.Router()
const path= require('path')
const fake_db = require('../db/fake_db')
const helpers = require('../helpers.js')
const multer = require('multer')

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
    if(!!count){
      teams = makeTeams(cohort.members, count , selection)
    }
    res.render('cohorts/show', {cohort, teams})
  })
  
})

// Helper methods

function makeTeams(cohort, number, method){
  const cohortArray = cohort.split(',')
  let split = number
  if(cohortArray.length < number){
    let split = cohortArray.length
  } 
  if(method === 'team_count'){
      
    return breakIntoNTeams(cohortArray, split, shuffleArray)
  } else {
      return nMembersPerTeam(cohortArray, split, shuffleArray)
  }
  
}


// I'm adding an extra function argument to these functions because I want them to be generic team 
// separaters that can shuffle their members arbitrarily (mostly, i'm just trying to practice using higher order function :-))

function breakIntoNTeams(arr, N, fn = (arr)=>{ return arr}){
  let clone = fn(arr.map((n)=> {return n}))
  let teams = []
  const length = arr.length
  for (let i = 0; i < N; i++){
    teams.push([]);
  }
  for(let j = 0; j < length; j++){
    let index = j%N
    teams[index].push(clone.pop())
  }
  return teams    
}

function nMembersPerTeam(arr, N, fn){
  const numTeams = Math.ceil(arr.length/N)
  return breakIntoNTeams(arr, numTeams, fn)  
}



function shuffleArray(arr){
  let arrayClone= arr.map((item) => {return item})
  let shuffledArray =[]
  let l = arrayClone.length
  while( l > 0){
    shuffledArray.push(arrayClone.splice(Math.floor(Math.random() * l ),1)[0])
    l = arrayClone.length
  }
  return shuffledArray
}


module.exports = router

