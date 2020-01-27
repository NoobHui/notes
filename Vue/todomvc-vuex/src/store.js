import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  strict:true,
  state:{
    list:[
      {id:1,content:"吃饭",done:false},
      {id:2,content:"睡觉",done:false},
      {id:3,content:"学习",done:true}
    ]
  },
  mutations:{
    changeState(state,payload){
      let a = state.list.find(item=>item.id==payload.id);
      a.done = !a.done;
    },
    addList(state,payload){
      state.list.push({
        id:state.list.length?state.list.length+1:1,
        content:payload.newContent,
        done:false
      });
    },
    delList(state,payload){
      state.list = state.list.filter(item => item.id!=payload.id);
    },
    changeContent(state,payload){
      if(payload.newContent=="")return;
      state.list.find(item=>item.id==payload.id).content = payload.newContent;
    },
    clearCompleted(state){
      state.list = state.list.filter(item=>item.done==false);
    }
  },
  getters:{
    leftitem(state){
      return state.list.filter(item=>item.done==false).length;
    }
  }
})

export default store