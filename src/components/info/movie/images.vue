<template>
    <div>
     <el-select v-model="value" placeholder="图片类型" @change="selChan" style="margin-bottom: 10px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
     </el-select>
       <el-upload
        class="upload-demo"
        action="/imgs/upload"
        :data='obj'
        :before-upload="before"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="success"
        :file-list="img"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="">
        <span class="">图片描述:</span>
        <el-input
          type="text"
          v-model="description"
          @blur="addDescriptionBlur"
          style="width: 200px;margin-top: 10px"
          placeholder="请输入图片描述">
        </el-input>
    </div>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
    export default {
        data() {
            return {
                options: [{
                    value: '1',
                    label: '主页图片'
                }, {
                    value: '2',
                    label: '剧情图片'
                }, {
                    value: '3',
                    label: '人物图片'
                }],
                obj:{
                    img:''
                },
                value: "1",
                movieId:'',
                description:""
            }
        },
        created(){
            this.movieId = this.$route.query.data
            this.obj = {
                img:JSON.stringify({
                    type:this.value,
                    movieId:this.movieId,
                    description:this.description
                })
            }
            this.getImg({
                type:this.value,
                movieId:this.movieId
            })

        },
        methods: {
          addDescriptionBlur(){
            this.obj = {
                img:JSON.stringify({
                    type:this.value,
                    movieId:this.movieId,
                    description:this.description
                })
            }
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
          success(response, file, fileList){
            console.log(response)
            console.log(file)
            console.log(fileList)
          },
          before(file){
            console.log(file)
          },
          selChan(){
            this.obj = {
                img:JSON.stringify({
                    type:this.value,
                    movieId:this.movieId,
                    description:this.description
                })
            }
            this.getImg({
                type:this.value,
                movieId:this.movieId
            })
          },
          ...mapActions('movieStore', ['getImg'])
        },
        computed: {
            ...mapState('movieStore',['img'])
        }
    }
</script>

