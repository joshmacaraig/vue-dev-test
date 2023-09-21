<template>
  <div class="card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
  <div class="comment-by">
    <strong>{{ comment.commenterDetails.name }}</strong>
    <span> | </span>
    <span class="comment-date">{{ formatDate(comment.date) }}</span>
  </div>
  <div v-if="comment.by === user.guid">
    <button class="btn btn-sm btn-outline-danger" @click="triggerDelete">Delete</button>
  </div>
      </div>
      <div class="card-body">
          <p class="card-text">{{ comment.comment }}</p>
      </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
props: ['comment', 'user'],

setup(props, { emit }) {
  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  function triggerEdit() {
    emit('edit-comment', props.comment);
  }

  function triggerDelete() {
    emit('delete-comment', props.comment);
  }

  return {
    formatDate,
    triggerEdit,
    triggerDelete
  };
}
};
</script>


<style>
.comment-by strong{
  margin-right: 10px;
}
.comment-date{
  margin-left: 10px;
}
</style>