import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    createBlog(newBlog);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
