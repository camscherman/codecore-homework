const Express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')




const app = Express()

app.set('view engine', 'ejs')
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))

const cohorts = require('./routes/cohorts.js')



app.use('/cohorts', cohorts)
app.use('/', cohorts)

