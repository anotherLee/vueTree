<template>
  <div class="parent">
    <Items v-for="model in treedata" :model="model" :key="model.id"></Items>
    <div class="wrapper" v-for="(item, index) in resultData" :key="item.code" v-if="false">
      <input type="text"
      class="input"
      readonly
      :value="item.name"
      @click="switchState(index)"
      >
      <ul class="downList" v-show="item.isShow">
        <li
        v-for="option in item.options"
        :key="option.code"
        @click="select(option, index)"
        >{{option.name}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { getTestData } from "../axios/api";
import testData from '../../static/data'
import Items from './Items'
export default {
  data() {
    return {
      testData: testData,
      resultData: [],
      tempOptions: [],
      treedata: [
        {
          id: "1",
          data: {
            menuName: "项目管理",
            menuCode: ""
          },
          childTreeNode: [
            {
              id:'101',
              data: {
                menuName: "项目",
                menuCode: "BusProject"
              },
              childTreeNode: [
                {
                  id: '1001',
                  data: {
                    menuName: '上海项目组',
                    menuCode: 'shanghai'
                  }
                },
                {
                  id: '1002',
                  data: {
                    menuName: '北京项目组',
                    menuCode: 'beijing'
                  }
                }
              ]
            },
            {
              id: '102',
              data: {
                menuName: "我的任务",
                menuCode: "BusProject"
              },
              childTreeNode: []
            },
            {
              id: '103',
              data: {
                menuName: "人员周报",
                menuCode: "BusProject"
              },
              childTreeNode: []
            }
          ]
        },
        {
          id: "2",
          data: {
            menuName: "数据统计",
            menuCode: "BusClock"
          },
          childTreeNode: [
            {
              id: '201',
              data: {
                menuName: '流量统计',
                menuCode: '2011'
              }
            },
            {
              id: '202',
              data: {
                menuName: '人员统计',
                menuCode: '2021'
              }
            }
          ]
        },
        {
          id: "3",
          data: {
            menuName: "人事管理",
            menuCode: ""
          },
          childTreeNode: [
            {
              id: '33',
              data: {
                menuName: '新人入职手续',
                menuCode: ''
              }
            },
            {
              id: '34',
              data: {
                menuName: '公积金缴纳',
                menuCode: ''
              }
            }
          ]
        },
        {
          id: "4",
          data: {
            menuName: "基础管理",
            menuCode: ""
          },
          childTreeNode: [
            {
              id: '41',
              data: {
                menuName: '日常报销',
                menuCode: ''
              }
            }
          ]
        }
      ]
    }
  },
  created() {
    this.pushFirst()
    this.initOptions(this.testData)
  },
  methods: {
    switchState(index) {
      let newState = !this.resultData[index].isShow
      this.$set(this.resultData[index], 'isShow', newState)

    },
    select(option, index) {
      this.$set(this.resultData[index], 'name', option.name)
      this.$set(this.resultData[index], 'isShow', false)
      let exact = this.findExact(this.testData, option.code, option.name)
      this.initOptions(exact, index)
    },
    findExact(obj, code, name) {
      if (obj.code === code && obj.name === name) return obj
      if (obj.child && obj.child.length > 0) {
        let res = obj.child.find((item) => {
          return item.code === code && item.name === name
        })
        if (res) return res
        if (!res) {
          let childrenCount = obj.child.length
          for (let i=0; i<childrenCount; i++) {
            let newRes = this.findExact(obj.child[i], code, name)
            if (newRes) return newRes
          }
        }
        return false
      }
      return false
    },
    pushFirst() {
      let {name, code} = this.testData
      this.resultData.push({
        name,
        code,
        isShow: false,
        options: [
          {name, code}
        ]
      })
    },
    initOptions(obj, index=0) {
      this.tempOptions = []
      this.tempOptions.length = 0
      this.getOptions(obj)
      this.comOptions(this.tempOptions, index)
    },
    getOptions(obj) {
      if (obj.child && obj.child.length >0) {
        let res = obj.child.map(item => {
          return {
            name: item.name,
            code: item.code
          }
        })
        this.tempOptions.push(res)
        this.getOptions(obj.child[0])
      }
    },
    comOptions(options, index) {
      let that = this
      that.tempOptions = options.map(ele => {
        return {
          name: ele[0].name,
          code: ele[0].code,
          isShow: false,
          options: ele
        }
      })
      this.resultData.splice(index+1)
      this.resultData.push.apply(this.resultData, that.tempOptions)
    }
  },
  components: {
    Items
  }
};
</script>

<style>
.parent {
  position: relative;
  font-size: 12px;
  color: black;
}
.wrapper {
  display: inline-block;
  position: relative;
  margin-left: 20px;
}
.wrapper:first-child {
  margin-left: 0;
}
input {
  text-align: center;
  width: 190px;
  height: 30px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}
.downList {
  position: absolute;
  left: 0;
  top: 102%;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.downList > li {
  text-align: center;
  width: 100%;
  font-size: 12px;
  line-height: 1.5;
  padding: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}
.downList > li:last-child {
  border-bottom: none;
}
</style>


