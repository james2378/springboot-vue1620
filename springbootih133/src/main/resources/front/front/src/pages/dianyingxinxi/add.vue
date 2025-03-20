<template>
<div :style='{"border":"1px solid #dfdfdf","padding":"20px","margin":"20px auto 0","borderRadius":"16px","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="电影名称" prop="dianyingmingcheng">
            <el-input v-model="ruleForm.dianyingmingcheng" 
                placeholder="电影名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}'  label="电影分类" prop="dianyingfenlei">
            <el-select v-model="ruleForm.dianyingfenlei" placeholder="请选择电影分类"  >
              <el-option
                  v-for="(item,index) in dianyingfenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="电影海报" v-if="type!='cross' || (type=='cross' && !ro.dianyinghaibao)" prop="dianyinghaibao">
            <file-upload
            tip="点击上传电影海报"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.dianyinghaibao?ruleForm.dianyinghaibao:''"
            @change="dianyinghaibaoUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' class="upload" v-else label="电影海报" prop="dianyinghaibao">
                <img v-if="ruleForm.dianyinghaibao.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.dianyinghaibao.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.dianyinghaibao.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="电影片段" prop="dianyingpianduan">
            <file-upload
            tip="点击上传电影片段"
            action="file/upload"
            :limit="1"
            :multiple="true"
            :fileUrls="ruleForm.dianyingpianduan?ruleForm.dianyingpianduan:''"
            @change="dianyingpianduanUploadChange"
            ></file-upload>
          </el-form-item> 
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="导演" prop="daoyan">
            <el-input v-model="ruleForm.daoyan" 
                placeholder="导演" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="演员" prop="yanyuan">
            <el-input v-model="ruleForm.yanyuan" 
                placeholder="演员" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="上映日期" prop="shangyingriqi" >
              <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.shangyingriqi" 
                  type="date"
                  placeholder="上映日期">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}'  label="地区" prop="diqu">
            <el-select v-model="ruleForm.diqu" placeholder="请选择地区"  >
              <el-option
                  v-for="(item,index) in diquOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="放映场次" prop="fangyingchangci">
            <el-input v-model="ruleForm.fangyingchangci" 
                placeholder="放映场次" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="放映时间" prop="fangyingshijian">
            <el-input v-model="ruleForm.fangyingshijian" 
                placeholder="放映时间" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}'  label="放映厅" prop="fangyingting">
            <el-select v-model="ruleForm.fangyingting" placeholder="请选择放映厅"  >
              <el-option
                  v-for="(item,index) in fangyingtingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="影院名称" prop="yingyuanmingcheng">
            <el-input v-model="ruleForm.yingyuanmingcheng" 
                placeholder="影院名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="影院地址" prop="yingyuandizhi">
            <el-input v-model="ruleForm.yingyuandizhi" 
                placeholder="影院地址" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="价格" prop="price">
            <el-input v-model="ruleForm.price" 
                placeholder="价格" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="座位总数" prop="number">
            <el-input v-model="ruleForm.number" 
                placeholder="座位总数" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="已选座位[用,号隔开]" prop="selected">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="已选座位[用,号隔开]"
              v-model="ruleForm.selected">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"border":"1px solid #dfdfdf","padding":"10px","boxShadow":"1px 2px 3px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"radial-gradient(circle, rgba(246,246,246,1) 0%, rgba(230,230,230,1) 100%)"}' label="电影介绍" prop="dianyingjieshao">
            <editor 
                :style='{"minHeight":"300px","padding":"0","margin":"0","borderColor":"#ccc","backgroundColor":"#f9f9f9","borderRadius":"0","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.dianyingjieshao" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"20px 0 20px 0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"1px 2px 6px #52a1db","margin":"0 20px 0 0","color":"rgba(255, 255, 255, 1)","outline":"none","borderRadius":"30%","background":"radial-gradient(circle, rgba(128,184,246,1) 0%, rgba(36,153,251,1) 100%)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #bbb","cursor":"pointer","padding":"0","boxShadow":"1px 2px 6px #ccc","margin":"0","color":"#999","outline":"none","borderRadius":"30%","background":"#fff","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            dianyingmingcheng : false,
            dianyingfenlei : false,
            dianyinghaibao : false,
            dianyingpianduan : false,
            daoyan : false,
            yanyuan : false,
            shangyingriqi : false,
            diqu : false,
            fangyingchangci : false,
            fangyingshijian : false,
            fangyingting : false,
            yingyuanmingcheng : false,
            yingyuandizhi : false,
            dianyingjieshao : false,
            thumbsupnum : false,
            crazilynum : false,
            clicktime : false,
            clicknum : false,
            price : false,
            number : false,
            selected : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          dianyingmingcheng: '',
          dianyingfenlei: '',
          dianyinghaibao: '',
          dianyingpianduan: '',
          daoyan: '',
          yanyuan: '',
          shangyingriqi: '',
          diqu: '',
          fangyingchangci: '',
          fangyingshijian: '',
          fangyingting: '',
          yingyuanmingcheng: '',
          yingyuandizhi: '',
          dianyingjieshao: '',
          thumbsupnum: '',
          crazilynum: '',
          clicktime: '',
          clicknum: '',
          price: '',
          number: '',
          selected: '',
        },
        dianyingfenleiOptions: [],
        diquOptions: [],
        fangyingtingOptions: [],
        rules: {
          dianyingmingcheng: [
            { required: true, message: '电影名称不能为空', trigger: 'blur' },
          ],
          dianyingfenlei: [
            { required: true, message: '电影分类不能为空', trigger: 'blur' },
          ],
          dianyinghaibao: [
          ],
          dianyingpianduan: [
          ],
          daoyan: [
          ],
          yanyuan: [
          ],
          shangyingriqi: [
          ],
          diqu: [
            { required: true, message: '地区不能为空', trigger: 'blur' },
          ],
          fangyingchangci: [
          ],
          fangyingshijian: [
          ],
          fangyingting: [
          ],
          yingyuanmingcheng: [
          ],
          yingyuandizhi: [
          ],
          dianyingjieshao: [
          ],
          thumbsupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          number: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          selected: [
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.shangyingriqi = this.getCurDate()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='dianyingmingcheng'){
              this.ruleForm.dianyingmingcheng = obj[o];
              this.ro.dianyingmingcheng = true;
              continue;
            }
            if(o=='dianyingfenlei'){
              this.ruleForm.dianyingfenlei = obj[o];
              this.ro.dianyingfenlei = true;
              continue;
            }
            if(o=='dianyinghaibao'){
              this.ruleForm.dianyinghaibao = obj[o].split(",")[0];
              this.ro.dianyinghaibao = true;
              continue;
            }
            if(o=='dianyingpianduan'){
              this.ruleForm.dianyingpianduan = obj[o];
              this.ro.dianyingpianduan = true;
              continue;
            }
            if(o=='daoyan'){
              this.ruleForm.daoyan = obj[o];
              this.ro.daoyan = true;
              continue;
            }
            if(o=='yanyuan'){
              this.ruleForm.yanyuan = obj[o];
              this.ro.yanyuan = true;
              continue;
            }
            if(o=='shangyingriqi'){
              this.ruleForm.shangyingriqi = obj[o];
              this.ro.shangyingriqi = true;
              continue;
            }
            if(o=='diqu'){
              this.ruleForm.diqu = obj[o];
              this.ro.diqu = true;
              continue;
            }
            if(o=='fangyingchangci'){
              this.ruleForm.fangyingchangci = obj[o];
              this.ro.fangyingchangci = true;
              continue;
            }
            if(o=='fangyingshijian'){
              this.ruleForm.fangyingshijian = obj[o];
              this.ro.fangyingshijian = true;
              continue;
            }
            if(o=='fangyingting'){
              this.ruleForm.fangyingting = obj[o];
              this.ro.fangyingting = true;
              continue;
            }
            if(o=='yingyuanmingcheng'){
              this.ruleForm.yingyuanmingcheng = obj[o];
              this.ro.yingyuanmingcheng = true;
              continue;
            }
            if(o=='yingyuandizhi'){
              this.ruleForm.yingyuandizhi = obj[o];
              this.ro.yingyuandizhi = true;
              continue;
            }
            if(o=='dianyingjieshao'){
              this.ruleForm.dianyingjieshao = obj[o];
              this.ro.dianyingjieshao = true;
              continue;
            }
            if(o=='thumbsupnum'){
              this.ruleForm.thumbsupnum = obj[o];
              this.ro.thumbsupnum = true;
              continue;
            }
            if(o=='crazilynum'){
              this.ruleForm.crazilynum = obj[o];
              this.ro.crazilynum = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='clicknum'){
              this.ruleForm.clicknum = obj[o];
              this.ro.clicknum = true;
              continue;
            }
            if(o=='price'){
              this.ruleForm.price = obj[o];
              this.ro.price = true;
              continue;
            }
            if(o=='number'){
              this.ruleForm.number = obj[o];
              this.ro.number = true;
              continue;
            }
            if(o=='selected'){
              this.ruleForm.selected = obj[o];
              this.ro.selected = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/dianyingfenlei/dianyingfenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.dianyingfenleiOptions = res.data.data;
          }
        });
        this.diquOptions = "大陆,香港,台湾,欧美,其他".split(',')
        this.fangyingtingOptions = "1号厅,2号厅,3号厅,4号厅,5号厅,6号厅,情侣厅,巨幕厅".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('dianyingxinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('dianyingxinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('dianyingxinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('dianyingxinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      dianyinghaibaoUploadChange(fileUrls) {
          this.ruleForm.dianyinghaibao = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
      dianyingpianduanUploadChange(fileUrls) {
          this.ruleForm.dianyingpianduan = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #999;
	  background: #f9f9f9;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #999;
	  background: #f9f9f9;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #999;
	  background: #f9f9f9;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #f9f9f9;
	  width: 200px;
	  font-size: 32px;
	  line-height: 180px;
	  text-align: center;
	  height: 180px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #f9f9f9;
	  width: 200px;
	  font-size: 32px;
	  line-height: 180px;
	  text-align: center;
	  height: 180px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #f9f9f9;
	  width: 200px;
	  font-size: 32px;
	  line-height: 180px;
	  text-align: center;
	  height: 180px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #999;
	  background: #f9f9f9;
	  width: 400px;
	  font-size: 14px;
	  min-height: 120px;
	}
</style>
