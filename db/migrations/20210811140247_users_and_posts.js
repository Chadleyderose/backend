exports.up = function (knex, Promise) {
	return knex.schema
		.createTable('users', function (table) {
			table.increments('id');
			table.string('name').notNullable();
			table.string('surname').notNullable();
			table.string('username').notNullable();
			table.string('email').notNullable().unique();
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
			table.string('post_title').notNullable().defaultTo('');
			table.integer('post_likes').defaultTo(0);
			table.string('post_tags');
			table.string('post_describtion');-
			table.string('image')
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})

		.createTable('users_comments', function (table) {
			table.increments('id');
			table.integer('user_id') 
			.notNullable() 
			.references('id') 
			.inTable('users') 
			table.string('comment_content').notNullable().defaultTo('');
			table.timestamps(true, true);
		})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTable('users').dropTable('users_posts').dropTable('users_comments');
};