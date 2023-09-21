<template>
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Topic</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="editedTopic.name" placeholder="Topic Name">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateTopic">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['topic', 'user'],
    setup(props, { emit }) {
      const editedTopic = ref({ ...props.topic });  // Create a copy of the topic for editing
  
      function closeModal() {
        emit('close');
      }
  
      function updateTopic() {
        if (editedTopic.value.name.trim()) {
          emit('topic-updated', editedTopic.value);
          closeModal();
        }
      }
  
      return {
        editedTopic,
        closeModal,
        updateTopic
      };
    }
  };
  </script>
  