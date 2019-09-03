<template>
  <section class="container">
    <p>name: <input type="text" name="name" v-model="name"></p>
    <p>content: <input type="text" name="content" v-model="content"></p>
    <p>status: {{status}}</p>
    <p>workingTime: {{workingTime}}</p>
    <p>createdAt: {{createdAt}}</p>
    <button @click="submit">Submit</button>
  </section>
</template>

<script>
import {db} from '~/plugins/firebase.js'

export default {
  data: function () {
    return {
      name: '',
      content: '',
      status: '',
      workingTime: '',
      createdAt: ''
    }
  },
  mounted() {
    db.collection('tasks').doc(this.$route.params.id).get().then(doc => {
      let task = doc.data()

      this.name = task.name
      this.content = task.content
      this.status = task.status
      this.workingTime = task.workingTime
      this.createdAt = task.createdAt
    })
  },
  methods: {
    submit: function () {
      const task = {
        name: this.name,
        content: this.content,
      }
      const tasksRef = db.collection('tasks')
      tasksRef.doc(this.$route.params.id).set({name: this.name, content: this.content},　{merge: true})
    }
  }
}
</script>

<style lang="scss">

</style>
