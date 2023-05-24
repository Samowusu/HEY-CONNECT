//YET TO BE IMPLEMENTED
//IDEAS...

//PROPOSED SCHEMA FOR COMMENTS

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const CommentSchema = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//      ref : 'User'
//     required: [true, 'User ID is required']
//   },
//   postId: {
//     type: Schema.Types.ObjectId,
//      ref : 'Post'
//     required: [true, 'Post ID is required']
//   },
//   text: {
//     type: String,
//     required: [true, 'Comment text is required']
//   },
//   likes: {
//     type: Map,
//     of: Boolean
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   }
// });

// module.exports = mongoose.model('Comment', CommentSchema);
// userId: A required reference to the user who created the comment, stored as a MongoDB ObjectId.
// postId: A required reference to the post the comment belongs to, stored as a MongoDB ObjectId.
// text: The text of the comment, required.
// likes: A Map of user IDs to boolean values representing whether the user has liked the comment or not. The keys are stored as strings (because that's how Map works), but the values are stored as Booleans.
// createdAt: The date the comment was created, with a default value of the current time.

//PROPOSED LINKED SCHEMA

// const CommentSchema = new mongoose.Schema({
//     postId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Post',
//       required: true
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     text: {
//       type: String,
//       required: [true, 'Comment text is required']
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     }
//   });

//   const PostSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     text: {
//       type: String,
//       required: [true, "Post text can't be empty"]
//     },
//     picturePath: String,
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     likes: {
//       type: Map,
//       of: Boolean
//     },
//     comments: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Comment'
//     }]
//   });

//   const post = await Post.findById(postId).populate('comments');
