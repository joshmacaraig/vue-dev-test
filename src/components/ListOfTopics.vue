<template>
  <div>
    <div v-for="topic in topics" :key="topic.guid">
      <TopicCard 
        :topic="topic" 
        :user="user" 
        @edit-topic="triggerEditTopic" 
        @delete-topic="triggerDeleteTopic"
      />
    </div>

    <EditTopicModal
      v-if="showEditTopicModal"
      :topic="topicToEdit"
      :user="user"
      @topic-updated="updateTopic"
      @close="showEditTopicModal = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import TopicCard from './TopicCard.vue';
import EditTopicModal from './EditTopicModal.vue';

export default {
  components: {
    TopicCard,
    EditTopicModal
  },
  props: ['topics', 'user'],
  setup(props, { emit }) {
    const showEditTopicModal = ref(false);
    const topicToEdit = ref(null);

    function triggerEditTopic(topic) {
      topicToEdit.value = topic;
      showEditTopicModal.value = true;
    }

    function triggerDeleteTopic(topic) {
      const index = props.topics.findIndex(t => t.guid === topic.guid);
      if (index !== -1) {
        props.topics.splice(index, 1);
      }
    }

    function updateTopic(updatedTopic) {
      const index = props.topics.findIndex(t => t.guid === updatedTopic.guid);
      if (index !== -1) {
        props.topics[index] = updatedTopic;
      }
      showEditTopicModal.value = false;
    }

    return {
      showEditTopicModal,
      topicToEdit,
      triggerEditTopic,
      triggerDeleteTopic,
      updateTopic
    };
  }
};
</script>
