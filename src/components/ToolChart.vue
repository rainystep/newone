<template>
  <div class="hello">
    <input v-show="false" ref="refFileInput" type="file" @change="loadFile">
    <el-button type="primary" style="width:20%" @click="selectFile">选择文件</el-button>

    <div style="width: 100%; flex-grow:1" ref="chart"></div>
  </div>
</template>

<script>
  //按需引用 bar=柱状图
  let Echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar'); 
  //不引入则会报错xAxis 0 not found
  require('echarts/lib/component/grid');
  require('echarts/lib/component/graphic');
  const XLSX = require('xlsx');

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: '出现次数',
        times:1,
        strDate:"",
        interval:500,
        dataTable:[],
        rowIndex: 1,
        chart: null,
        refreshTimer:null,
      }
    },
    created:function(){
    },
    watch:{
      dataTable:{
        deep:true,
        handler(){
          
        }
      }
    },
    mounted(){
      this.init();
      window.addEventListener('resize', ()=>{
        this.chart.resize();
      });
    },
    methods:{
      selectFile(){
        this.$refs.refFileInput.dispatchEvent(new MouseEvent('click'))
      },
      loadFile(){
        var fReader = new FileReader()
        fReader.readAsBinaryString(this.$refs.refFileInput.files[0])
        fReader.onloadend = (event)=>{
          try{
            let content = event.target.result;
            let workbook = XLSX.read(content, {type:"binary"}) //以二进制流方式读取得到整份excel表格对象
            let sheetName = workbook.Sheets[workbook.SheetNames[0]]; //获取sheet1
            this.dataTable = XLSX.utils.sheet_to_json(sheetName, {
              header:1,  //生成数组类型的数组 ("二维数组")
              raw:true,
              defval:" " //从头开始，空格替换为“ ”字符串
            })
           
            this.chart.setOption({
              dataset:{
                source:this.dataTable,
              },
              series:[{
                encode:{
                  x:this.rowIndex,
                  y:0,
                }
              }]
            })

            /**初始化工作 */
            this.rowIndex = 0
            clearInterval(this.refreshTimer)
            /**启动定时器 */
            this.refreshTimer = setInterval(()=>{
              this.rowIndex++;
              if(this.rowIndex < this.dataTable.length){
                console.log(this.rowIndex)
                this.refresh();
              }
              else{
                clearInterval(this.refreshTimer)
              }
            },this.interval);

            this.$once('hook:beforeDestroy',()=>{
              clearInterval(this.refreshTimer);
            })
          }catch(e){
            console.log("文件类型不正确")
          }
          
        }
        this.$refs.refFileInput.value = null//赋值为空，再选择同一个文件的时候就会触发onchange事件了
      },
      refresh(){
          this.strDate = this.dataTable[this.rowIndex][0];
          this.chart.setOption({
              graphic:// 将旋转过的 group 整体定位右下角：
              [
                {
                  id:'labelDate',
                  style:{
                    text: this.strDate,
                    font: '20px simsun',
                    fill: '#fff',
                  },
                },
              ],
              series:[{
                encode:{
                  x:this.rowIndex,
                  y:0,
                }
              }]
          });
          
        // }
         
      },
      init(){
          //初始化
          this.chart = Echarts.init(this.$refs.chart, 'dark');
          //配置数据
          let option={
            dataset:{
              source:this.dataTable,
            },
            yAxis:{
              type:'category',
              inverse:true,
              animationDuration:300,
              animationDurationUpdate:300,
              axisLabel:{
                  interval:0,
              }
              
            },//Y轴
            xAxis:{
              max: 'dataMax'
            },     //X轴
            grid:{
              left:50
            },
            
            series:[{ 
              realtimeSort:true,
              type:'bar',
              itemStyle:{
                color:param=>{
                  if(param.dataIndex%2 == 0){
                    return "#c93756";
                  }else{
                    return "#ffb3a7";
                  }
                }
              },
              label:{
                show:true,
                position:'right',
                valueAnimation:true
              },
              seriesLayoutBy:'row',
              encode:{
                x:this.rowIndex,
                y:0,
              }
            },
            
            ],  //配置项
            graphic:// 将旋转过的 group 整体定位右下角：
            [
              {
                id:'labelDate',
                type:'text',
                right:'10%',
                top:'5%',
                z:10,
                
                style:{
                  text:this.strDate,
                  font: '20px simsun',
                  fill: '#fff',
                },
              },
              {
                type:'text',
                silent:true,
                left:'center',
                top:'middle',
                rotation: Math.PI / 4,
                z:100,
                style:{
                  fill: 'rgba(255,255,255,0.5)',
                  text:[
                    '                        水印@copyright',
                    '',
                    '',
                    '',
                    '            水印@copyright',
                    '',
                    '',
                    '',
                    '水印@copyright'
                  ].join('\n'),
                  fontSize:24
                }
              },
            ],

            animationDuration: this.interval,
            animationDurationUpdate: this.interval,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
          };
          //传入数据
          this.chart.setOption(option);
          
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width:100%;
  height:100vh;
  display:flex;
  flex-direction:column;
  background-color:#eee;
}

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
