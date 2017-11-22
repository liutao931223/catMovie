<template>
    <div style="width: 500px">
        <div class="box">
            <label class='labels'>中文名称</label><el-input v-model="cName" placeholder="请输入中文名称"></el-input>
        </div>
        <div class="box">
            <label class='labels'>英文名称</label><el-input v-model="eName" placeholder="请输入英文名称"></el-input>
        </div>
        <div class="box">
            <label class='labels'>影片类型</label><el-input v-model="type" placeholder="请输入影片类型"></el-input>
        </div>
        <div class="box">
            <label class='labels'>制片国家/地区</label><el-input v-model="country" placeholder="请输入国家"></el-input>
        </div>
        <div class="box">
            <label class='labels'>片长, 单位 分钟</label><el-input v-model="duration" placeholder="请输入片长"></el-input>
        </div>
        <div class="box">
            <label class='labels'>上映时间 格式: 2016-08-23</label><el-input v-model="release" placeholder="请输入上映时间"></el-input>
        </div>
        <div class="box">
            <label class='labels'>电影状态</label><el-select v-model="status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.status"
                  :label="item.label"
                  :value="item.status">
                </el-option>
            </el-select>
        </div>
        <div class="box">
            <label class='labels'>评分</label><el-input v-model="scoring" placeholder="请输入内容"></el-input>
        </div>
        <div class="box">
            <label class='labels'>剧情简介</label><el-input 
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="synopsis" placeholder="请输入内容"></el-input>
        </div> 
        <el-button type="primary">确认添加并进入图片编辑页</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
    </div>
</template>

<script>
import { mapState,mapGetters,mapMutations } from 'Vuex'
export default {
  data() {
    return {
      cName: '',
      eName: '',
      type: '',
      country: '',
      duration: '',
      release: '',
      synopsis: '',
      status: 1,
      scoring: '',
      options: [{
          status: 0,
          label: '下映'
        }, {
          status: 1,
          label: '上映'
        }] 
    }
  },
  methods: {
      ...mapMutations(['reset'])
    }
}
</script>
<style>
    .box{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .labels{
        margin-right: 10px
    }
</style>