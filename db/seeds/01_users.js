const { v4 } = require("uuid");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Test', 
          surname: 'Test',
          username: 'Test',
          email: 'test@gmail.com',
          password: 'Admin'
        },
      ]);
    });
};
