const express = require("express");
const cors = require("cors");
const { connectDB } = require("./connection");
const BlogPost = require("./models/BlogPost");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.post("/post-blog", async(req, res) => {
  let blog = new BlogPost({
    title:req.body.title,
    description:req.body.description,
  })
  await blog.save();
  res.json({message:"Blog post saved successfully"})
});

app.get("/get-blogs", async(req,res)=>{
  let blogs = await BlogPost.find()
  if(!blogs){
    res.status(404).json({message:"No Blogs found"})
  }
  res.json({blogs})
})

app.delete("/delete-blog/:id",async(req,res)=>{
  let blog = await BlogPost.findByIdAndDelete(req.params.id)
  if(!blog){
    res.status(404).json({message:"No blog found"})
  }
  res.status(200).json({message:" blog deleted successfully"})
})

app.put("/update-blog/:id",async (req,res)=>{
  let blog = await BlogPost.findByIdAndUpdate(req.params.id);
  if(!blog){
    res.status(404).json({message:"No blog found"})
  }
  if(!req.body.title & !req.body.description){
    res.json({message:"Please enter title or description"})
  } else if(!req.body.title){
    blog.description = req.body.description
  }
  else if(!req.body.description){
    blog.title = req.body.title;
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description;
  }
  await blog.save()
  res.status(200).json({message:"Blog Updated successfully"})
})

app.listen(port, () => {
  console.log("Server is running");
});
