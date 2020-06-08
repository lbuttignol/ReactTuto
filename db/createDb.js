const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./mydb.sqlite');
    await db.migrate({force: 'last'});

    const game = await sqlite.all('SELECT * FROM Game');
    console.log('ALL PEOPLE', JSON.stringify(game));
    
    const Board = await sqlite.all('SELECT * FROM Board');
    console.log('ALL PEOPLE', JSON.stringify(Board));
}

setup();