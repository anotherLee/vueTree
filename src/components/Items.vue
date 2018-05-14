<template>
  <li class="folderWrapper">
    <div class="name">
      <span v-if="control" @click="toggle">
        <i class="iconfont icon-caozuo-zhedie" v-if="open"></i>
        <i class="iconfont icon-caozuo-zhankai" v-if="!open"></i>
      </span>
      <span v-if="newModel.data" :class="{left: !control}">{{newModel.data.menuName}}</span>
    </div>
    <ul v-if="control" v-show="!isFolder" class="panel">
      <Items v-for="cel in model.childTreeNode" :key="cel.id" :model="cel"></Items>
    </ul>
  </li>
</template>

<script>
export default {
  name: "Items",
  props: ['model'],
  data() {
    return {
      isFolder: true,
      open: false,
      newModel: this.model
    };
  },
  created() {
  },
  computed: {
    control() {
      return this.model.childTreeNode && this.model.childTreeNode.length;
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
      this.isFolder = !this.isFolder
    }
  }
};
</script>
<style>
.name{
  margin: 7px 0;
  font-size:15px;
  cursor: pointer;
}
.folderWrapper{
  position: relative;
  left:20px;
  /* border: 1px solid red; */
}
.left{
  margin-left: 20px;
}
</style>


