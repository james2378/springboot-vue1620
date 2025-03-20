const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootih133/",
            name: "springbootih133",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootih133/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于springboot的影城会员管理系统"
        } 
    }
}
export default base
