
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_comments').insert([
        {
          user_id: 1, 
          id: 1,
          comment_content: "This is a comment"
        }
      ]);
    });
};
