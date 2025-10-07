export async function up(knex) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("phone");
      table.boolean("subscribed").defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTableIfExists("users");
  }
  