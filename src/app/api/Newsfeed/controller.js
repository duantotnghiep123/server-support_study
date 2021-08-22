const Comment = require ('../../models/Comment');

const Like = require ('../../models/Like');

const Post = require("../../models/Post")
const PostController = require("../../controllers/PostController");
const { post } = require('./router');
exports.addComment = async function (req, res) {
  const data = req.body;
  const comment = new Comment (data);
  try {
    const payload = await comment
      .save()
      .then(() => Post.findById(req.body.postId))
      .then((post) => {
        post.comment.unshift(comment)
        return post.save()
      })
    res.status(200).json({ payload })
  } catch (error) {
    console.log ('ERR', error);
  }
};

exports.getAllPost = async function (req, res) {
  const payload = await Post.find ()
    .populate ([
      {
        path: 'comment',
        model: 'Comment',
        select: 'content createdAt userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name image',
        },
        populate: {
          path: 'like',
          model: 'Like',
          select: 'like userId',
        },
      },
    ])
    .populate ('userId', 'name image').populate('like', 'like userId')
  res.status (200).json ({
    payload,
  });
};

exports.createPost = async function (req, res) {
  var post_image=req.file.filename
  let post = new Post({
      description: req.body.description,
      image: `http://localhost:3000/post/${post_image}`,
      userId: req.body.userId,
  });
  try {
    const payload = await post.save ();
    res.status (200).json ({payload});
  } catch (error) {
    console.log ('ERR', err);
  }
};

exports.getById = async function (req, res) {
  try {
    const {like, userId, postId} = req.body;
    const payload = await Post.findById (postId)
      .populate ([
        {
          path: 'comment',
          model: 'Comment',
          select: 'content createdAt',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'name image',
          },
        },
      ])
      .populate ([
        {
          path: 'like',
          model: 'Like',
          select: 'content',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'name image',
          },
        },
      ])
      .populate ('userId', 'name image');

    if (!payload) {
      res.status (404).json ({
        error: 'Resource not found!!',
      });
    } else {
      res.status (200).json ({
        payload,
      });
    }
  } catch (error) {
    res.status (500).json ({
      error: error.message,
    });
  }
};

exports.like = async function (req, res) {
  try {
    const {like, userId, postId} = req.body;
    // const {id} = req.params;
    
    Like.find ({userId, postId: postId})
      .then (liked => {
        if (liked.length > 0 ) {
          return Like.findByIdAndUpdate ({_id: liked[0]._id}, {like});
        }else{
          const likeCheck = new Like ({like, userId,postId});
          const payload = likeCheck
            .save ()
            .then (() => Post.findById (postId))
            .then (post => {
              post.like.unshift (likeCheck);
              return post.save ();
            });
         return payload
        }   
      })
      .then (data => res.json (data));

   
  } catch (error) {
    console.log ('ERR', error);
  }
}

exports.deletePost = PostController.delete

exports.updatePost = PostController.update
