const Express= require('express')
//const kx = require('./db/connection')
const router = Express.Router()
const path= require('path')
const fake_db = require('../db/fake_db')
const helpers = require('../helpers.js')

router.get('/', (req,res)=>{
    const {name, photo_url, members, id} = fake_db;
    res.render('cohorts/index', {name,photo_url, members,id});

})

router.get('/:id', (req, res) =>{
  const  params = fake_db;
  params['id'] = req.params.id
  const query = req.query
  const names = fake_db.members.split(',')
  // extra parameter will ensure that teams won't be rendered if a teamcount or
  // member count exceeds total members
  if(query.selection === 'team_count' && query.count <= names.length){
    res.render('cohorts/show', {name: fake_db.name,
                                members: fake_db.members,
                                id: fake_db.id,
                                teams: helpers.divideIntoNteams(names, query.count)})
  }
  else if (query.selection === 'number_per_team' && query.count <= names.length ) {
    res.render('cohorts/show', {name: fake_db.name,
                                members: fake_db.members,
                                id: fake_db.id,
                                teams: helpers.membersPerTeam(names, query.count)})
  }
  else{
     res.render('cohorts/show', {name: fake_db.name,
                                 members: fake_db.members,
                                 id: fake_db.id,
                                 teams: null})

  }
})

router.get('/new', (req,res) =>{
    res.render('cohorts/new')
})




module.exports = router
