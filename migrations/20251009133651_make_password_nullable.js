export async function up(knex) {
    await knex.schema.alterTable("users", (table) => {
      table.string("password").nullable().alter();
    });
  }
  
  export async function down(knex) {
    await knex.schema.alterTable("users", (table) => {
      table.string("password").notNullable().alter();
    });
  }