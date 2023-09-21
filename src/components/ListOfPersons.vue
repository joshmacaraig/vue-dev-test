<template>
    <ul>
      <li v-for="person in persons" :key="person.guid">
        {{ person.first }} {{ person.last }} - {{ person.email }}
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: ['persons']
  };
  </script>
  