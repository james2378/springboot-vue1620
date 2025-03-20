<template>
	<div class="addEdit-block" :style='{"padding":"10px 30px 30px","background":"url(http://codegen.caihongy.cn/20230228/47752d6be3a94e8892a83ec2a70c8443.png)"}' style="width: 100%;">
		<el-form
			:style='{"border":"1px solid #ddd","padding":"30px","boxShadow":"0 0px 0px #ddd","borderRadius":"5px","background":"#ffffff"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="80px"
		>
			<template >
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" clearable  :readonly="ro.dianyingmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="电影分类" prop="dianyingfenlei">
					<el-select :disabled="ro.dianyingfenlei" v-model="ruleForm.dianyingfenlei" placeholder="请选择电影分类" >
						<el-option
							v-for="(item,index) in dianyingfenleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影分类" prop="dianyingfenlei">
					<el-input v-model="ruleForm.dianyingfenlei"
						placeholder="电影分类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.dianyinghaibao" label="电影海报" prop="dianyinghaibao">
					<file-upload
						tip="点击上传电影海报"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.dianyinghaibao?ruleForm.dianyinghaibao:''"
						@change="dianyinghaibaoUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.dianyinghaibao" label="电影海报" prop="dianyinghaibao">
					<img v-if="ruleForm.dianyinghaibao.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.dianyinghaibao.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.dianyinghaibao.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-if="type!='info'&& !ro.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<file-upload
						tip="点击上传电影片段"
						action="file/upload"
						:limit="1"
						:multiple="true"
						:fileUrls="ruleForm.dianyingpianduan?ruleForm.dianyingpianduan:''"
						@change="dianyingpianduanUploadChange"
					></file-upload>
				</el-form-item> 
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<el-button :style='{"border":"1px solid #3ca512","cursor":"pointer","padding":"0 35px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/ca1c191554d24b108bc94f4a2046d636.png) #41b314 no-repeat 15px 12px","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small" @click="download($base.url+ruleForm.dianyingpianduan)">预览</el-button>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="!ruleForm.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<el-button :style='{"border":"1px solid #3ca512","cursor":"pointer","padding":"0 35px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"url(http://codegen.caihongy.cn/20221011/ca1c191554d24b108bc94f4a2046d636.png) #41b314 no-repeat 15px 12px","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small">无</el-button>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" clearable  :readonly="ro.daoyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="演员" prop="yanyuan">
					<el-input v-model="ruleForm.yanyuan" placeholder="演员" clearable  :readonly="ro.yanyuan"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="演员" prop="yanyuan">
					<el-input v-model="ruleForm.yanyuan" placeholder="演员" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="date" v-if="type!='info'" label="上映日期" prop="shangyingriqi">
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.shangyingriqi" 
						type="date"
						:readonly="ro.shangyingriqi"
						placeholder="上映日期"
					></el-date-picker> 
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.shangyingriqi" label="上映日期" prop="shangyingriqi">
					<el-input v-model="ruleForm.shangyingriqi" placeholder="上映日期" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="地区" prop="diqu">
					<el-select :disabled="ro.diqu" v-model="ruleForm.diqu" placeholder="请选择地区" >
						<el-option
							v-for="(item,index) in diquOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="地区" prop="diqu">
					<el-input v-model="ruleForm.diqu"
						placeholder="地区" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="放映场次" prop="fangyingchangci">
					<el-input v-model="ruleForm.fangyingchangci" placeholder="放映场次" clearable  :readonly="ro.fangyingchangci"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="放映场次" prop="fangyingchangci">
					<el-input v-model="ruleForm.fangyingchangci" placeholder="放映场次" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="放映时间" prop="fangyingshijian">
					<el-input v-model="ruleForm.fangyingshijian" placeholder="放映时间" clearable  :readonly="ro.fangyingshijian"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="放映时间" prop="fangyingshijian">
					<el-input v-model="ruleForm.fangyingshijian" placeholder="放映时间" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="放映厅" prop="fangyingting">
					<el-select :disabled="ro.fangyingting" v-model="ruleForm.fangyingting" placeholder="请选择放映厅" >
						<el-option
							v-for="(item,index) in fangyingtingOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="放映厅" prop="fangyingting">
					<el-input v-model="ruleForm.fangyingting"
						placeholder="放映厅" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="影院名称" prop="yingyuanmingcheng">
					<el-input v-model="ruleForm.yingyuanmingcheng" placeholder="影院名称" clearable  :readonly="ro.yingyuanmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="影院名称" prop="yingyuanmingcheng">
					<el-input v-model="ruleForm.yingyuanmingcheng" placeholder="影院名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="影院地址" prop="yingyuandizhi">
					<el-input v-model="ruleForm.yingyuandizhi" placeholder="影院地址" clearable  :readonly="ro.yingyuandizhi"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="影院地址" prop="yingyuandizhi">
					<el-input v-model="ruleForm.yingyuandizhi" placeholder="影院地址" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" clearable  :readonly="ro.price"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="座位总数" prop="number">
					<el-input v-model="ruleForm.number" placeholder="座位总数" clearable  :readonly="ro.number"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="座位总数" prop="number">
					<el-input v-model="ruleForm.number" placeholder="座位总数" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="已选座位[用,号隔开]" prop="selected">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="已选座位[用,号隔开]"
					  v-model="ruleForm.selected" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.selected" label="已选座位[用,号隔开]" prop="selected">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}'>{{ruleForm.selected}}</span>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-if="type!='info'"  label="电影介绍" prop="dianyingjieshao">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.dianyingjieshao" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.dianyingjieshao" label="电影介绍" prop="dianyingjieshao">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#333","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.dianyingjieshao"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"#337ab7","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"border":"1px solid #1b5a90","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#1b5a90","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"border":"1px solid #1b5a90","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#1b5a90","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
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
				clicktime: '',
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
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				price: [
					{ required: true, message: '价格不能为空', trigger: 'blur' },
					{ validator: validateNumber, trigger: 'blur' },
				],
				number: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				selected: [
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
	created() {
		this.ruleForm.shangyingriqi = this.getCurDate()
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
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
							this.ruleForm.dianyinghaibao = obj[o];
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
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/dianyingfenlei/dianyingfenlei`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.dianyingfenleiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
            this.diquOptions = "大陆,香港,台湾,欧美,其他".split(',')
            this.fangyingtingOptions = "1号厅,2号厅,3号厅,4号厅,5号厅,6号厅,情侣厅,巨幕厅".split(',')
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `dianyingxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.dianyingjieshao = this.ruleForm.dianyingjieshao.replace(reg,'../../../springbootih133/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {






	if(this.ruleForm.dianyinghaibao!=null) {
		this.ruleForm.dianyinghaibao = this.ruleForm.dianyinghaibao.replace(new RegExp(this.$base.url,"g"),"");
	}


	if(this.ruleForm.dianyingpianduan!=null) {
		this.ruleForm.dianyingpianduan = this.ruleForm.dianyingpianduan.replace(new RegExp(this.$base.url,"g"),"");
	}



































var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "dianyingxinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
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
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    dianyinghaibaoUploadChange(fileUrls) {
	    this.ruleForm.dianyinghaibao = fileUrls;
    },
    dianyingpianduanUploadChange(fileUrls) {
	    this.ruleForm.dianyingpianduan = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
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
	  	  border: 1px solid #5479bb;
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 1px 2px 3px #eee;
	  	  outline: none;
	  	  color: #aaa;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 1px solid #5479bb;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: 1px 2px 3px #eee;
	  	  outline: none;
	  	  color: #aaa;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 1px solid #5479bb;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 1px 2px 3px #eee;
	  	  outline: none;
	  	  color: #aaa;
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
	  	  border: 1px dashed #5479bb;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #5479bb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 120px;
	  	  text-align: center;
	  	  height: 120px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px dashed #5479bb;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #5479bb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 120px;
	  	  text-align: center;
	  	  height: 120px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px dashed #5479bb;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #5479bb;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 120px;
	  	  text-align: center;
	  	  height: 120px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 1px solid #5479bb;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: 1px 2px 3px #eee;
	  	  outline: none;
	  	  color: #aaa;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: auto;
	  	}
</style>
