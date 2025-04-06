import client from "../../config/database.js";
export const createPostModel = async (title, content, id) => {
  const query = {
    text: "INSERT INTO articles (user_id,title,content) VALUES ($1,$2,$3)",
    values: [id, title, content],
  };
  const response = await client.query(query);
  return response.rowCount > 0;
};
export const editBlogModel = async (user_id, id, field) => {
  const fieldKeys = Object.keys(field);
  const fieldValues = Object.values(field);
  const query = {
    text: `UPDATE articles 
            SET ${fieldKeys.map((key, index) => `${key} = $${index + 1}`).join(",")}
            WHERE id=$${fieldKeys.length + 1} AND user_id=$${fieldKeys.length + 2} RETURNING *`,
    values: [...fieldValues, id, user_id],
  };
  const response = await client.query(query);
  if (response.rowCount > 0) {
    return response.rows[0];
  } else {
    return null;
  }
};
export const deleteBlogModel = async (user_id, id) => {
  const query = {
    text: "DELETE FROM articles WHERE user_id=$1 AND id=$2",
    values: [user_id, id],
  };
  const response = await client.query(query);
  if (response.rowCount > 0) {
    return true;
  } else {
    return null;
  }
};
export const getUserContentModel = async (id) => {
  const query = {
    text: `SELECT 
      u.id AS user_id, 
      u.name AS username, 
      u.email,
      -- Get articles
      COALESCE(json_agg(
          json_build_object(
              'article_id', a.id,
              'title', a.title,
              'content', a.content,
              'comments', (
                  SELECT COALESCE(json_agg(
                      json_build_object(
                          'comment_id', c.id,
                          'content', c.content,
                          'created_at', c.created_at
                      )
                  ), '[]'::json) FROM comments c WHERE c.article_id = a.id
              ),
              'likes', (
                  SELECT COALESCE(json_agg(
                      json_build_object(
                          'like_id', l.id,
                          'liked_by', l.user_id
                      )
                  ), '[]'::json) FROM likes l WHERE l.article_id = a.id
              )
          )
      ), '[]'::json) AS articles
  FROM users u
  LEFT JOIN articles a ON u.id = a.user_id
  WHERE u.id = $1
  GROUP BY u.id, u.name, u.email;`,
    values: [id],
  };
  const response = await client.query(query);
  if (response) {
    return response.rows[0];
  } else {
    return null;
  }
};
export const commentsModel = async (user_id, content, articles_id) => {
  const query = {
    text: "INSERT INTO comments(article_id,user_id,content) VALUES($1,$2,$3)",
    values: [articles_id, user_id, content],
  };
  const response = await client.query(query);
  if (response.rowCount > 0) {
    return response.rows[0];
  } else {
    return null;
  }
};
