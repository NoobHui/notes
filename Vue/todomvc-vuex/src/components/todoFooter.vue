<template>
  <footer class="footer">
		<!-- This should be `0 items left` by default -->
		<span class="todo-count"><strong>{{leftitem}}</strong> item left</span>
		<!-- Hidden if no completed items are left ↓ -->
		<button class="clear-completed" @click="clearCompleted">Clear completed</button>
	</footer>
</template>

<script>
export default {
	methods:{
		clearCompleted(){
			this.$store.commit("clearCompleted");
		}
	},
  computed:{
		leftitem(){
			return this.$store.getters.leftitem;
		}
	}
}
</script>

<style>

</style>