const Express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')




const app = Express()

app.set('view engine', 'ejs')
app.use(morgan('dev'));
app.use(Express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}))

const cohorts = require('./routes/cohorts.js')



app.use('/cohorts', cohorts)
app.use('/', cohorts)

PORT = 4545

app.listen(PORT, () =>{
  console.log("Listening on http://localhost:4545.... peace out!")
})
