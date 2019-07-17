import { mapState ,mapMutations} from "vuex"
//用户管理
export const state =()=>{
  //采用接口欧返回的数据结构
  return {
  userInfo:{
    token:'',
    user:{},
  },
}
}


export const mutations={
  //保存用户信息到state
  setUserInfo(state,data){
    state.userInfo=data;
  },
  //清除用户数据
  cleanUserInfo(state){
    state.userInfo = {
      token: "",
      user: {}
  }
  }
}

export const actions={
  //登录
  login({commit},data){
     return this.$axios({
      url:'/accounts/login',
      method:'POST',
      data:data
    }).then(res=>{
      //把数据保存到vue，user是模块名字（命名空间）
      commit('setUserInfo',res.data);
      
    })
  },
  //注册
  resgister(){}
}