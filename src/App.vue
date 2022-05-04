<script>
import createGraphScene from './lib/createGraphScene';

export default {
  data() {
    return {
      stepCount: 200
    }
  },

  methods: {
    runLayout() {
      this.scene.runLayout(this.stepCount);
    },
  },

  mounted() {
    const canvas = document.getElementById('cnv');
    this.scene = createGraphScene(canvas);
  },

  beforeUnmount() {
    if (this.scene) this.scene.dispose();
  }
}
</script>

<template>
  <a href="#" @click.prevent='runLayout' class='btn-command'>Make {{stepCount}} layout steps</a>
</template>


<style>
#app {
  position: absolute;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.row .label {
  flex: 1;
}
.row .value {
  flex: 1;
}
.row select {
  width: 100%;
}
.btn-command {
  display: block;
  padding: 4px;
  margin-top: 10px;
  border: 1px solid;
}

a {
  color: rgb(244, 244, 244);
  text-decoration: none;
  text-align: center;
  padding: 0 4px
}
</style>
