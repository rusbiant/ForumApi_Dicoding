/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      NotNull: true,
    },
    content: {
      type: 'TEXT',
      NotNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      NotNull: true,
    },
    thread_id: {
      type: 'VARCHAR(50)',
      NotNull: true,
    },
    date: {
      type: 'TIMESTAMP',
      NotNull: true,
      default: pgm.func('current_timestamp'),
    },
    is_deleted: {
      type: 'BOOLEAN',
      NotNull: true,
      default: false,
    },
  });

  pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
  pgm.addConstraint('comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropConstraint('fk_comments.owner_users.id');
  pgm.dropConstraint('fk_comments.thread_id_threads.id');
  pgm.dropTable('comments');
};

