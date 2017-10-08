const kx = require("knex")({
    client:'sqlite3',
    connection: {

        database: "./teamPicker.sqlite"
    },
    useNullAsDefault: true

})

kx.on('query', query=>{
    console.log(query.sql)
    console.log(query.bindings)
})

module.exports = kx
