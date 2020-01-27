<template>
  <header class="header">
		<h1>todos</h1>
		<input class="new-todo" placeholder="What needs to be done?" @keyup.enter="addList" v-model="newContent" autofocus>
	</header>
</template>

<script>
export default {
	data(){
		return{
			newContent:""
		}
	},
	methods:{
		addList(){
			this.$store.commit("addList",{newContent:this.newContent});
			this.newContent = "";
		}
	}
}
</script>

<style>

</style>