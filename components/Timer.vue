<template>
  <div class="text container">
    <div class="center aligned">
      <p>
        {{ hours }} :
        {{ minutes | zeroPad }} :
        {{ seconds | zeroPad }}
        <button class="secondary button" @click="startTimer" :disabled="isRunning">START</button>
        <button class="button" @click="stopTimer(); emitWorkingTime();" :disabled="!isRunning">STOP</button>
        <button class="basic button" @click="clearAll(); emitWorkingTime()">CLEAR</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workingTime: Number
  },
  data: function () {
    return {
      times: [],
      animateFrame: 0,
      nowTime: 0,
      startTime: 0,
      isRunning: false
    }
  },
  methods: {
    setSubtractStartTime: function (time) {
      var time = typeof time !== 'undefined' ? time : 0;
      this.startTime = Math.floor(performance.now() - time);
    },
    startTimer: function () {
      this.$emit('timer-start-event');
      const vm = this;
      vm.isRunning = true;
      vm.setSubtractStartTime(vm.workingTime);
      (function loop(){
        vm.nowTime = Math.floor(performance.now());
        vm.workingTime = vm.nowTime - vm.startTime;
        vm.animateFrame = requestAnimationFrame(loop);
      }());
    },
    stopTimer: function () {
      this.isRunning = false;
      cancelAnimationFrame(this.animateFrame);
    },
    clearAll: function () {
      this.startTime = 0;
      this.nowTime = 0;
      this.workingTime = 0;
      this.times = [];
      this.stopTimer();
      this.animateFrame = 0;
    },
    emitWorkingTime: function () {
      this.$emit('timer-stop-event', this.workingTime);
    }
  },
  computed: {
    hours: function () {
      return Math.floor(this.workingTime / 1000 / 60 / 60);
    },
    minutes: function () {
      return Math.floor(this.workingTime / 1000 / 60) % 60;
    },
    seconds: function () {
      return Math.floor(this.workingTime / 1000) % 60;
    }
  },
  filters: {
    zeroPad: function(value, num){
      var num = typeof num !== 'undefined' ? num : 2;
      return value.toString().padStart(num,"0");
    }
  }
}
</script>

<style lang="scss">

</style>
