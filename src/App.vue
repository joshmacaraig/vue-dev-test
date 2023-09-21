<template>
  <div>
    <UserLoginModal :personsLength="persons.length" v-if="!user.name" @user-logged-in="setUser" @close-modal="user.name = `${user.fname} ${user.lname}`" />
    
    <button @click="showAddTopicModal = true">Add Topic</button>
    <AddTopicModal 
      v-if="showAddTopicModal" 
      :user="user" 
      @topic-added="addNewTopic" 
      @close="showAddTopicModal = false" 
    />
    <ListOfTopics :topics="topics" :user="user" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListOfTopics from './components/ListOfTopics.vue';
import UserLoginModal from './components/UserLoginModal.vue';
import AddTopicModal from './components/AddTopicModal.vue';
import localData from './assets/topics.json';


export default {
  components: {
    ListOfTopics,
    UserLoginModal,
    AddTopicModal
  },
  setup() {
    const topics = ref([]);
    const persons = ref([]);
    const user = ref({ fname: '',lname: '', email: '', guid: '' });
    const showAddTopicModal = ref(false);

    onMounted(async () => {
      // const response = await fetch("https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json");
      // const data = await response.json();
      const data = localData;
      
      // Process topics to embed commenter details
      data.topics.forEach(topic => {
        topic.comments.forEach(comment => {
          const person = data.persons.find(p => p.guid === comment.by);
          if (person) {
            comment.commenterDetails = {
              name: `${person.first} ${person.last}`,
              email: person.email
            };
          } else {
            comment.commenterDetails = {
              name: 'Unknown',
              email: 'Unknown'
            };
          }
        });
      });

      topics.value = data.topics;
      persons.value = data.persons;
    });

    function setUser(userData) {
      user.value = userData;
    }

    function addNewTopic(newTopic) {
      topics.value.unshift(newTopic);
    }

  // Don't forget to return it so it's available in the template
  return {
    topics,
    persons,
    user,
    showAddTopicModal,
    setUser,
    addNewTopic 
  };
}
};
</script>


<!-- <style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

</style> -->