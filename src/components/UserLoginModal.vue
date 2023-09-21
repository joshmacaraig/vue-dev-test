<template>
    <div class="modal show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">First Name:</label>
              <input type="text" class="form-control" v-model="firstName" />
            </div>
            <div class="mb-3">
              <label class="form-label">Last Name:</label>
              <input type="text" class="form-control" v-model="lastName" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email:</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { ref } from 'vue';
  export default {
    props: ['personsLength'],
    setup(props, { emit }) {
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');

        function closeModal() {
            emit('close-modal');
        }

        function login() {
            const generatedGuid = `${firstName.value.charAt(0)}${lastName.value.charAt(0)}${props.personsLength}`;
            emit('user-logged-in', {
                fname: firstName.value,
                lname: lastName.value,
                email: email.value,
                guid: generatedGuid
            });
            closeModal();
        }
        return {
        firstName,
        lastName,
        email,
        login,
        closeModal
        };
    }
  };
  </script>
  