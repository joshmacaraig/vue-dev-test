<template>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span><h3>{{ topic.name }}</h3></span>
        <div v-if="user.guid === topic.by">
          <button class="btn btn-sm btn-outline-info" @click="$emit('edit-topic', topic)">Edit</button>
          <button class="btn btn-sm btn-outline-danger" @click="$emit('delete-topic', topic)">Delete</button>
        </div>
      </div>
      <p>Comments:</p>
      <ul>
        <CommentCard 
            v-for="comment in topic.comments" 
            :key="comment.date"
            :comment="comment"
            :user="user"
            @edit-comment="editComment"
            @delete-comment="deleteComment"
        />

      </ul>
      <div class="container">
      <div class="d-flex flex-column flex-md-row align-items-center">
        <textarea class="form-control mb-2 mb-md-0 mr-md-2" rows="3" v-model="newComment" placeholder="Your comment"></textarea>
        <button class="btn btn-primary" @click="addCommentInput">Add Comment</button>
      </div>
    </div>

      
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import CommentCard from './CommentCard.vue';  // Import CommentCard if you are using it
  
  export default {
    components: {
      CommentCard  // Register CommentCard if you are using it
    },
    props: ['topic', 'user'],
    setup(props) {
    const newComment = ref('');
  
      function addCommentInput() {
        if (newComment.value.trim()) {
          const newCommentObj = {
            comment: newComment.value,
            date: new Date().toISOString(),

            by: props.user.guid,
commenterDetails: {
  name: `${props.user.fname} ${props.user.lname}`,
  email: props.user.email
}

          };
          props.topic.comments.push(newCommentObj);
          newComment.value = '';  // Clear the input
        }
      }

  
      function editComment(editedComment) {
        // Logic to edit the comment in topic.comments array
      }
  
      function deleteComment(commentToDelete) {
        const index = props.topic.comments.findIndex(comment => comment.date === commentToDelete.date);
        if (index !== -1) {
          props.topic.comments.splice(index, 1);
        }
      }
  
      return {
        newComment,
        addCommentInput,
        editComment,
        deleteComment
      };
    }
  };
  </script>
  