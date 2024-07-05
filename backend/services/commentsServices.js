const commentModel = require("../data/comment_model")
const {v4:uuidv4} = require('uuid')
const commentsServices = {
    getComment: async(commentId) =>{
        console.log("Reached GET comments services")
        console.log(commentId)
        const response = await commentModel.findOne({id:commentId},{});
        return response
    },
    createComment: (commentObj) =>{
        console.log("Reached POST comments services")
        console.log(commentObj)
        commentObj.id = uuidv4();
        commentObj.date = new Date().toISOString();
        const commentToBeCreated = new commentModel(commentObj);
        commentToBeCreated.save().then(() => console.log("Comment created"))
    },
}
module.exports = commentsServices