import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 
} from "@mui/material";
import { Link } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useBranch } from "../Pages/Branches";
import { AddBlogInitiate } from "../redux/actions/blog/addBlogAction";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBlogInitiate } from "../redux/actions/blog/getAllBlogsAction";
import { BASE_URL } from "../API/Constants";
import { UpdateBlogInitiate } from "../redux/actions/blog/updateBlogAction";
import { DeleteBlogInitiate } from "../redux/actions/blog/deleteBlogAction";

const useStyles = makeStyles({
  modal: {
    minWidth: "500px",
  },
});

const BlogList = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedBranch } = useBranch();
  const [imageName, setImageName] = useState("");
  const dispatch = useDispatch();
  // 🔥 Mock Data Added

  const { blogs, loading } = useSelector((state) => state.blogs);
  console.log("Blogs from Redux:", blogs);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    subCategory: "",
    description: "",
    tags: "",
    status: "Active",
  });
  useEffect(() => {
  dispatch(GetAllBlogInitiate());
}, [dispatch]);

  const [editBlogId, setEditBlogId] = useState(null);
  const classes = useStyles();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   setImagePreview(`${BASE_URL}blogimages/${blogs.blogImage}`);
    setFormData((prev) => ({
      ...prev,
      image: file, // for upload
    }));
     setImageName(file.name);
  }
};

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const handlePublish = () => {
  //   const blogWithDate = {
  //     ...formData,
  //     date: getFormattedDate(),
  //     id: Date.now(),
  //   };

  //   if (editBlogId !== null) {
  //     setBlogs((prevBlogs) =>
  //       prevBlogs.map((blog) =>
  //         blog.id === editBlogId ? { ...blog, ...blogWithDate } : blog
  //       )
  //     );
  //   } else {
  //     setBlogs((prevBlogs) => [...prevBlogs, blogWithDate]);
  //   }

  //   setFormData({
  //     title: "",
  //     image: null,
  //     category: "",
  //     subCategory: "",
  //     description: "",
  //     tags: "",
  //     status: "Active",
  //   });
  //   setEditBlogId(null);
  //   handleCloseModal();
  // };
// const handlePublish = () => {
//   const formattedDate = getFormattedDate();

//   const blogForm = new FormData();
//   blogForm.append("title", formData.title);
//   blogForm.append("category", formData.category);
//   blogForm.append("subCategory", formData.subCategory);
//   blogForm.append("description", formData.description);
//   blogForm.append("tags", formData.tags);
//   blogForm.append("status", formData.status);
//   blogForm.append("date", formattedDate);
//   blogForm.append("branch", selectedBranch); // Add branch info

//   if (formData.image instanceof File) {
//     blogForm.append("blogImage", formData.image);
//   }
  
//   for (let pair of blogForm.entries()) {
//     console.log(`📦 ${pair[0]}:`, pair[1]);
//   }
//   dispatch(AddBlogInitiate(blogForm));

//   // Reset form and close modal
//   setFormData({
//     title: "",
//     image: null,
//     category: "",
//     subCategory: "",
//     description: "",
//     tags: "",
//     status: "Active",
//   });
//   setEditBlogId(null);
//   handleCloseModal();
// };

const handlePublish = () => {
  const formattedDate = getFormattedDate();

  const blogForm = new FormData();
  blogForm.append("title", formData.title);
  blogForm.append("category", formData.category);
  blogForm.append("subCategory", formData.subCategory);
  blogForm.append("description", formData.description);
  blogForm.append("tags", formData.tags);
  blogForm.append("status", formData.status);
  blogForm.append("date", formattedDate);
  blogForm.append("branch", selectedBranch);

  if (formData.image instanceof File) {
    blogForm.append("blogImage", formData.image);
  }

  for (let pair of blogForm.entries()) {
    console.log(`📦 ${pair[0]}:`, pair[1]);
  }

  if (editBlogId) {
    blogForm.append("_id", editBlogId); // Add the ID for backend update
    dispatch(UpdateBlogInitiate(blogForm, (success) => {
      if (success) {
        dispatch(GetAllBlogInitiate()); // Refresh list on success
      }
    }));
  } else {
    dispatch(AddBlogInitiate(blogForm));
  }

  setFormData({
    title: "",
    image: null,
    category: "",
    subCategory: "",
    description: "",
    tags: "",
    status: "Active",
  });
  setImageName("");
  setEditBlogId(null);
  handleCloseModal();
};


  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      image: blog.blogImage,
      category: blog.category,
      subCategory: blog.subCategory,
      description: blog.description,
      tags: blog.tags,
      status: blog.status,
    });
    
    setImageName(blog.blogImage);
  setImagePreview(`${BASE_URL}blogimages/${blogs.blogImage}`);
    // setEditBlogId(blog.id);
     setEditBlogId(blog._id);
    handleShowModal();
  };

 const handleDelete = (id) => {
  dispatch(DeleteBlogInitiate(id));
};
    const imageUrl = blogs.blogImage
    ? `${BASE_URL}blogimages/${blogs.blogImage}`
    : "https://via.placeholder.com/300x200";

  return (
    <div className="container mt-4">
      <div className="mb-3 ml-4 row">
        <div className="col">
          <h2 className="text-2xl font-bold">Blog List</h2>
        </div>
      </div>

      <div className="mb-3 row">
        <div className="text-right col" title="Add Blog">
          <Button
            color="primary"
            startIcon={
              <AddIcon style={{ fontSize: "34px", marginRight: "8px" }} />
            }
            onClick={handleShowModal}
          ></Button>
        </div>
      </div>

      {/* 🔥 Blog Cards Displaying Mock Data */}
        {blogs.map((blog) => {
      const imageUrl = blog.blogImage
        ? `${BASE_URL}blogimages/${blog.blogImage}`
        : "https://via.placeholder.com/300x200";

      return (
        <div key={blog.id} className="mb-4">
          <div className="border rounded-lg shadow-md">
            <img
              src={imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200";
              }}
              className="object-cover w-full h-48 rounded-t-lg"
              alt="Blog"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold">{blog.title}</h5>
              <p className="text-sm">{blog.description}</p>
            {/* <Link to="/blogs/blogview" className="text-blue-500 underline">
              Read More
            </Link> */}
            <Link to={`/blogs/blogview/${blog._id}`} className="text-blue-500 underline">
  Read More
</Link>

            </div>
            <div className="flex items-center justify-between p-3 text-sm text-gray-500">
              <span>{blog.date}</span>
              <div>
               <EditIcon
                onClick={() => handleEdit(blog)}
                className="mr-4 text-blue-500 cursor-pointer hover:text-blue-700"
              />
            <DeleteIcon
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this blog?")) {
                handleDelete(blog._id);  // Make sure to use blog._id here, not blog.id
              }
            }}
            className="text-red-600 cursor-pointer hover:text-red-800"
             />

              </div>
            </div>
          </div>
        </div>
      );
    })}

      {/* Add Blog Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
          <h3 className="mb-6 text-2xl font-semibold text-center">Add Blog</h3>
          <form>
            {/* Blog Name */}
            <div className="mb-4">
              <TextField
                label="Blog Name"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Blog Image */}
            <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {imageName && (
            <p className="mt-1 text-sm text-gray-600">Selected: {imageName}</p>
          )}
        </div>
            {/* <div className="mb-4">
              <TextField
                type="file"
                label="Blog Image"
                onChange={handleFileChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              {/* {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              )} */}
            {/* </div> */} 

            {/* Blog Category */}
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel>Blog Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Blog Category"
                >
                  <MenuItem value="">
                    <em>Select category</em>
                  </MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Programming">Programming</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Blog Description */}
            <div className="mb-4">
              <TextField
                label="Blog Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-6 mt-4">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BlogList;
