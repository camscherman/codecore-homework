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
    let curr_cohort = new Cohort(cohort.name, cohort.members, cohort.id)
    if(!!count){
      curr_cohort.makeTeams(count, selection)
    }
    res.render('cohorts/show', {curr_cohort})
  })
  
})

//  I've created a class Cohort to isolate the methods and data for each cohort into an object

class Cohort{
  
  constructor(name, members, id){
    this.name = name
    this.members = members
    this.id = id
    this.has_teams = false
    this.teams = []
  }
  
  makeTeams(number, method){
    const cohortArray = this.members.split(',')
    let split = number
    if(cohortArray.length < number){
      let split = cohortArray.length
    } 
    if(method === 'team_count'){
        
      this.teams = this.breakIntoNTeams(cohortArray, split, this.shuffleArray)
    } else {
        this.teams = this.nMembersPerTeam(cohortArray, split, this.shuffleArray)
    }
    this.has_teams = true  
  }



  breakIntoNTeams (arr, N, fn = (arr)=>{ return arr}) {
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
  
  nMembersPerTeam (arr, N, fn) {
    const numTeams = Math.ceil(arr.length/N)
    return this.breakIntoNTeams(arr, numTeams, fn)  
  }
  
  
  
  shuffleArray(arr) {
    let arrayClone= arr.map((item) => {return item})
    let shuffledArray =[]
    let l = arrayClone.length
    while( l > 0){
      shuffledArray.push(arrayClone.splice(Math.floor(Math.random() * l ),1)[0])
      l = arrayClone.length
    }
    return shuffledArray
  }
  hasTeams(){
    return this.has_teams
  }

  returnTeams(){
    let teams = {}
    for(let i=1; i <= this.teams.length; i++){
      teams[i] = this.teams[i-1].join(", ") 
    }
    return teams
  }
  returnMembers(){
    return this.members
  }
  returnName(){
    return this.name
  }


}












module.exports = router

