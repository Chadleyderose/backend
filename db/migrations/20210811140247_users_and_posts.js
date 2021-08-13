exports.up = function (knex, Promise) {
	return knex.schema
		.createTable('users', function (table) {
			table.increments('id');
			table.string('name').notNullable();
			table.string('surname').notNullable();
			table.string('username').notNullable();
			table.string('email').notNullable();
			table.string('password').notNullable();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})

		.createTable('users_posts', function (table) {
			table.increments('id');
			table.integer('user_id')
				.notNullable()
				.references('id')
				.inTable('users')
			table.string('post_id').notNullable().defaultTo('');
			table.string('post_content').notNullable().defaultTo('');
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})

		.createTable('users_comments', function (table) {
			table.integer('user_id') 
			.notNullable() 
			.references('id') 
			.inTable('users') 
			table.integer('id') 
			.notNullable() 
			.references('id')
			.inTable('users_posts')
			table.string('comment_content').notNullable().defaultTo('');
			table.timestamps(true, true);
		})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('users').dropTable('users_posts').dropTable('users_comments');
};