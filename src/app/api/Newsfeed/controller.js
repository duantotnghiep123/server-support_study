const Comment = require ('../../models/Comment');
const Post = require ('../../models/Post');
const Like = require ('../../models/Like');

const postController = require ('../../controllers/PostController');
exports.addComment = async function (req, res) {
  const data = req.body;
  const comment = new Comment (data);
  try {
    const payload = await comment
      .save ()
      .then (() => Post.findById (req.params.id))
      .then (post => {
        post.comment.unshift (comment);
        return post.save ();
      });
    res.status (200).json ({payload});
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
        select: 'content',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name image',
        },
      },
    ])
    .populate ('userId', 'name image');
  res.status (200).json ({
    payload,
  });
};

exports.createPost = async function (req, res) {
  var post_image = req.file.filename;
  let post = new Post ({
    title: req.body.title,
    description: req.body.description,
    groupDesc: req.body.groupDescription,
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
    const payload = await Post.findById (req.params.id)
      .populate ([
        {
          path: 'comment',
          model: 'Comment',
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
    const {like, userId} = req.body;
    const {id} = req.params;
    
    Like.find ({userId, postId: id})
      .then (liked => {
        if (liked.length > 0 ) {
          return Like.findByIdAndUpdate ({_id: liked[0]._id}, {like});
        }else{
          const likeCheck = new Like ({like, userId,postId: id});
          const payload = likeCheck
            .save ()
            .then (() => Post.findById (id))
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
};
