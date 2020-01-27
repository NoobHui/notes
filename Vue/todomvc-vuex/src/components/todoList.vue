<template>
  <section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<!-- These are here just to show the structure of the list items -->
			<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
			<li :class="{completed:item.done,editing:item.id==editID}" :key="item.id" v-for="item in $store.state.list">
				<div class="view" @dblclick="changeEditID(item.id)">
					<input class="toggle" type="checkbox" @input="changeState(item.id)" :checked="item.done">
					<label>{{item.content}}</label>
					<button class="destroy" @click="delList(item.id)"></button>
				</div>
				<input class="edit" v-model="newContent" @keyup.enter="changeContent(item.id)" placeholder="Create a TodoMVC template">
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	data(){
		return{
			editID:null,
			newContent:""
		}
	},
  methods:{
		changeState(id){
			this.$store.commit('changeState',{id:id});
		},
		delList(id){
			this.$store.commit("delList",{id:id});
		},
		changeEditID(id){
			this.editID = id;
		},
		changeContent(id){
			this.$store.commit("changeContent",{id:id,newContent:this.newContent});
			this.editID = null;
		}
	}
}
</script>

<style>

</style>