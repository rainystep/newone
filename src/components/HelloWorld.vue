<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>准备出发</h2>
    <el-button type="primary" round @click="testFunction">testFunction</el-button>
    <div>
      <span>分割线</span>
      <el-divider></el-divider>
      <span>撰写记录</span>

      <el-input v-model="histTitle" placeholder="请在此填写标题"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        autosize
        placeholder="请在此填写正文内容"
        v-model="histContent">
      </el-input>
      
      <el-button type="success" round @click="confirm">确定</el-button>

      <el-divider></el-divider>
      <div>{{histRecord.title}}</div>
      <div>{{histRecord.content}}</div>
      <div>{{histRecord.comment}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '捣鼓一点新东西～',
      histTitle:'',
      histContent:'',
      histRecord:{
        title:'',
        content:'',
        comment:''
      }
    }
  },
  created:function(){
    console.log("created!!!")
    fetch('/.netlify/functions/getHistRecord')
    .then(response => response.json())
    .then(res=> {
        console.log(res)
        this.histRecord = {
          title: res[0].title,
          content: res[0].content,
          comment: res[0].comment
        }
      })
  },
  methods:{
    testFunction:function(){
      fetch('/.netlify/functions/getHistRecord')
      .then(response => response.json())
      .then(res=> {
          console.log(res)
          this.histRecord = {
            title: res[0].title,
            content: res[0].content,
            comment: res[0].comment
          }
        })
    },
   
    confirm:function(){
      const aHistRecord = {
        title: this.histTitle,
        content: this.histContent,
        comment: ""
      }
      fetch('/.netlify/functions/addHistRecord',
      {
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        method: "POST",
        body: JSON.stringify(aHistRecord)
      })
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
