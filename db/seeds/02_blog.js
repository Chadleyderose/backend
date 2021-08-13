
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_posts').insert([
        {
          id: 1,
          user_id: 1,
          post_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }
      ]);
    });
};
