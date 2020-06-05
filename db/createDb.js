const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./mydb.sqlite');
    await db.migrate({force: 'last'});

    const games = await db.all('SELECT * FROM Game');
    console.log('ALL PEOPLE', JSON.stringify(games, null, 2));
}

setup();