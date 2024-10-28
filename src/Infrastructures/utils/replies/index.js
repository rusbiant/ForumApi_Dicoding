const mapDBToModel = ({
  id, content, username, date, is_deleted,
}) => ({
  id,
  content: is_deleted ? '**komentar telah dihapus**' : content,
  date,
  username,
});

module.exports = { mapDBToModel };
