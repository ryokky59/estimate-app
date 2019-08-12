<template>
  <section class="container">
    <h1>Estimate App</h1>
    <table>
      <thead v-pre>
        <tr>
          <th class="name">タスク名</th>
          <th class="content">内容</th>
          <th class="status">ステータス</th>
          <th class="created-at">作成日</th>
          <th class="working-time">作業時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <th>{{task.name}}</th>
          <td>{{task.content}}</td>
          <td @click="changeStatus(task)">{{task.status}}</td>
          <td>{{createdAt(task)}}</td>
          <td><Timer :workingTime="task.workingTime" @timer-stop-event="updateWorkingTime($event, task)"></Timer></td>
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
import {db} from '~/plugins/firebase.js'
import {mapGetters} from 'vuex';

import Timer from '../components/Timer';

export default {
  components: {
    Timer
  },
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
        status: 0,
        workingTime: 0,
        createdAt: new Date()
      }
      const tasksRef = db.collection('tasks')
      tasksRef.add(task)
      this.name = ''
      this.content = ''
    },
    changeStatus: function (task) {
      const taskRef = db.collection('tasks')
      if (task.status == 1) {
        taskRef.doc(task.id).set({status: 0},　{merge: true})
      } else {
        taskRef.doc(task.id).set({status: task.status+1},　{merge: true})
      }
    },
    updateWorkingTime: function (time, task) {
      const taskRef = db.collection('tasks')
      taskRef.doc(task.id).set({workingTime: time},　{merge: true})
    }
  },
}
</script>

<style lang="scss">

</style>
