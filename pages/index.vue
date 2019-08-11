<template>
  <section class="container">
    <h1>Estimate App</h1>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span>タスク名：{{ task.name }}</span>
        <span>内容：{{ task.content }}</span>
      </li>
    </ul>
    <div class="form">
      <h1>タスクを入力</h1>
      <div>
        タスク名: <input type="text" name="name" v-model="name">
      </div>
      <div>
        内容: <input type="text" name="content" v-model="content">
      </div>
      <div>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import {mapGetters} from 'vuex';

export default {
  created: function () {
    this.$store.dispatch('setTasksRef', db.collection('tasks'))
  },
  computed: {
    ...mapGetters({ tasks: 'getTasks' })
  },
  data: function () {
    return {
      name: '',
      content: '',
    }
  },
  methods: {
    submit: function () {
      const task = {
        name: this.name,
        content: this.content,
      }
      const tasksRef = db.collection('tasks')
      tasksRef.add(task)
      this.name = ''
      this.content = ''
    }
  },
}
</script>
