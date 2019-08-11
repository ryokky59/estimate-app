<template>
  <section class="container">
    <h1>Estimate App</h1>
    <table>
      <thead v-pre>
        <tr>
          <th class="name">タスク名</th>
          <th class="content">内容</th>
          <th class="created-at">作成日</th>
        </tr>
      </thead>
      <tbody>
        <!-- ★STEP5 ToDo の要素をループ -->
        <tr v-for="(task, index) in tasks" :key="index">
          <th>{{task.name}}</th>
          <td>{{task.content}}</td>
          <td>{{createdAt(task)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="form">
      <h2>新しい作業の追加</h2>
      <button @click="submit">Submit</button>
      <div>
        タスク名: <input type="text" name="name" v-model="name">
      </div>
      <div>
        内容: <input type="text" name="content" v-model="content">
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
    ...mapGetters({ tasks: 'getTasks' }),
    createdAt() {
      return function(task) {
        const createdAtToDate = new Date(task.createdAt.seconds * 1000)
        const month = createdAtToDate.getMonth() + 1;
        const date = createdAtToDate.getDate();
        const hour = createdAtToDate.getHours();
        const min = createdAtToDate.getMinutes();

        return `${month}/${date} ${hour}:${min}`
      }

    }
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
        createdAt: new Date()
      }
      const tasksRef = db.collection('tasks')
      tasksRef.add(task)
      this.name = ''
      this.content = ''
    }
  },
}
</script>

<style lang="scss">

</style>
