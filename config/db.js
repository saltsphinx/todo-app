import k from "knex";
import bcrypt from "bcryptjs"

const knex = k({
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  useNullAsDefault: false,
});

async function setup() {
  await createTable("user", (table) => {
    table.increments("id");
    table.string("username").notNullable().checkLength(">=", 5);
    table.string("password").notNullable().checkLength(">=", 8);
  });

  await createTable("todo", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("description").notNullable();
    table.boolean("is_complete").notNullable();

    table.foreign("user_id").references("id").inTable("user");
  });

  if (!(await knex("user").first()) && !(await knex("todo").first())) {
    await knex
      .insert({ username: "Bytebugs", password: await bcrypt.hash("abcd123!", 10) })
      .into("user");
    await knex
      .insert({
        user_id: "1",
        description: "Text mom 'I love you'",
        is_complete: false,
      })
      .into("todo");
  }  
}

async function createTable(tableName, cb) {
  if (!(await knex.schema.hasTable(tableName))) {
    return knex.schema.createTable(tableName, cb);
  }
}

setup();

export default knex;
