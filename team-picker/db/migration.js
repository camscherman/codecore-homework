const kx = require('./connection')

kx.schema.createTable('cohorts', table =>{
    table.increments('id')
    table.string('name')
    table.string('logo_url')
    table.text('members')
}).then(()=> process.exit(console.log)).catch(()=> process.exit(console.log))
