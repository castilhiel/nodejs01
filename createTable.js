import { sql } from "./dbConnection.js";

// sql`DROP TABLE IF EXISTS videos;`.then(() => {
//     console.log('tabela videos apagada.')
// })

sql`
    CREATE TABLE videos (
        id TEXT,
        title TEXT,
        description TEXT,
        duration INTEGER
    );
`.then(() => {
  console.log("tabela criada.");
});
