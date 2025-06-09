
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useBranch } from "../Pages/Branches";
import { GetAllBlogInitiate } from "../redux/actions/blog/getAllBlogsAction";
import { BASE_URL } from "../API/Constants";
import { AddCommentInitiate } from "../redux/actions/comments/addCommentAction";
import { GetAllCommentInitiate } from "../redux/actions/comments/getCommentsAction";
import { useParams } from "react-router-dom";

const BlogView = () => {
  const dispatch = useDispatch();
  const { selectedBranch } = useBranch();
    const { blogId } = useParams();
    console.log("blogId12:", blogId);

  // Fetch blogs from Redux store
  const { blogs } = useSelector((state) => state.blogs); // <- change `state.blog` as per your reducer name

  // const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", email: "", comment: "" });

  useEffect(() => {
    dispatch(GetAllBlogInitiate());
  }, [dispatch]);

 

// 2. Once latest blog is available, fetch comments for that blog
 useEffect(() => {
    if (blogs?.length > 0) {
      const currentBlog = blogId
        ? blogs.find((b) => b._id === blogId)
        : blogs[blogs.length - 1]; // default to latest

      if (currentBlog) {
        dispatch(GetAllCommentInitiate(currentBlog._id));
      }
    }
  }, [blogs, blogId, dispatch]);

  // 🔍 Get latest blog (optionally filter by branch here if needed)
   const latestBlog = blogId
    ? blogs.find((b) => b._id === blogId)
    : blogs[blogs.length - 1];
 const filteredComments = useSelector((state) => state.comments.comments);
console.log("Comments:", filteredComments);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

 const handleCommentSubmit = () => {
  if (newComment.name && newComment.email && newComment.comment && latestBlog?._id) {
    const commentData = {
      ...newComment,
      blogId: latestBlog._id,
    };

    dispatch(AddCommentInitiate(commentData));
    setNewComment({ name: "", email: "", comment: "" });
  } else {
    alert("Please fill all fields and ensure the blog is loaded.");
  }
};

  // const filteredComments = comments.filter((comment) => comment.branch === selectedBranch);
   const imageUrl = latestBlog?.blogImage
      ? `${BASE_URL}blogimages/${latestBlog?.blogImage}`
      : "https://via.placeholder.com/300x200";

  return (
    <div className="overflow-hidden" style={{ height: "90vh" }}>
      <div className="container h-full p-4 mx-auto max-w-7xl">
        <div className="flex flex-col h-full gap-6 lg:flex-row">
          <div className="h-full p-4 overflow-y-auto bg-white rounded shadow lg:w-2/3">
            <h1 className="mb-4 text-3xl font-bold">
              {latestBlog ? latestBlog.title : "Loading..."}
            </h1>
            <img
              src={imageUrl}
              alt="Blog Post"
              className="w-full h-auto mb-4 rounded"
            />
            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>{latestBlog?.createdAt?.slice(0, 10)}</span>
              <span>Author</span>
            </div>
            <p className="mb-6">{latestBlog?.description || "No description"}</p>

            {/* Share Post */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Share the Post</h2>
              <div className="flex gap-4 text-2xl">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-blue-500" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="text-blue-600" />
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-green-500" />
                </a>
              </div>
            </div>

            {/* Comments */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Comments ({filteredComments ? filteredComments.length : 0})</h2>
              {filteredComments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <strong>{comment.name}</strong> ({comment.email}): {comment.comment}
                </div>
              ))}
            </div>

            {/* Leave a Comment */}
            <div>
              <h2 className="mb-2 text-xl font-bold">Leave a Comment</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newComment.name}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newComment.email}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                placeholder="Comment"
                name="comment"
                value={newComment.comment}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <button onClick={handleCommentSubmit} className="px-4 py-2 text-white bg-blue-500 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;

