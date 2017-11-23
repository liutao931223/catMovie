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
            <label class='labels'>电影状态</label><el-select v-model="state" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.state"
                  :label="item.label"
                  :value="item.state">
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
        <el-button type="primary" @click="getData">确认</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
          <el-button v-if='disab' type="primary"  @click="intoImg">进入图片编辑页</el-button>
    </div>
</template>

<script>

import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'


export default {
  name: "addMovie",
  data() {
    return {
      cName: '',
      eName: '',
      type: '',
      country: '',
      duration: '',
      release: '',
      synopsis: '',
      state: 1,
      scoring: '',
      options: [{
        state: 2,
        label: '即将上映'
      }, {
        state: 1,
        label: '热映'
      }],
      disab:false
    }
  },
  created() {
      if(this.$route.query.data){
        let data = this.$route.query.data
        this.cName = data.cName
        this.eName = data.eName
        this.type = data.type
        this.country = data.country
        this.duration = data.duration
        this.release = data.release
        this.synopsis = data.synopsis
        this.scoring = data.scoring
        this.$store.state.movieStore.movieId = data._id
        this.disab = true
      }
  },
  computed: {
           ...mapState("movieStore", ['movieId'])
  },
  methods: {
    reset() {
      this.cName = ''
      this.eName = ''
      this.type = ''
      this.country = ''
      this.duration = ''
      this.release = ''
      this.synopsis = ''
      this.state = 1
      this.scoring = ''
    },
    intoImg(){
      this.$router.push({
               path: '/info/images',
               query: {
                 data:this.$store.state.movieStore.movieId
               }
             })
    },
    ...mapActions("movieStore", ['addMovies','changeMovies']),
    getData() {
      if(this.movieId){
        this.changeMovies(this.$data)
        this.reset()
        this.$router.push({
          path:`/info/movieList`
        })
        this.disab = true
      }else{
        this.addMovies(this.$data)
        this.disab = true
      }
    }
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
    .btn{
      margin-bottom: 20px;
    }
</style>