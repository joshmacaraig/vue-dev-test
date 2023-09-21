<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Topic</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" v-model="topicName" placeholder="Topic Name">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button type="button" class="btn btn-primary" @click="addTopic">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['user'],
  
  setup(props, { emit }) {
    const topicName = ref('');

    function closeModal() {
      emit('close');
    }

    function addTopic() {
      if (topicName.value.trim()) {
        const newTopic = {
          name: topicName.value,
          guid: `${Date.now().toString()}-${props.user.guid}`,
          by:props.user.guid,
          comments: []
        };
        console.log("Emitting new topic:", newTopic); // Correct place for logging
        emit('topic-added', newTopic);
        closeModal();
      }
    }


    return {
      topicName,
      closeModal,
      addTopic
    };
  }
};
</script>
