<template>
  <div>
  	<router-view></router-view>
  </div>
</template>
//<router-view></router-view>渲染路径匹配到的视图组件.
//.<router-view> 渲染的组件还可以内嵌自己的 <router-view>，根据嵌套路径，渲染嵌套组件。
<script>
export default {
  name: "app"
}
</script>

