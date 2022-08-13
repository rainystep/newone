<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>准备出发</h2>
     <button @click="testFunction">testFunction</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '捣鼓一点新东西～'
    }
  },
  methods:{
    testFunction:function(){
      fetch('/.netlify/functions/getUser')
      .then(response => response.json())
      .then(res=> console.log(res))

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
