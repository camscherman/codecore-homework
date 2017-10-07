const kx = require("knex")({
    client:'pg',
    connection: {
        database: "team_picker"
    }

})

kx.on('query', query=>{
    console.log(query.sql)
    console.log(query.bindings)
})

module.exports = kx