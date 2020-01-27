<template>
  <div id="app">
    <section class="todoapp">
      <todoHeader></todoHeader>
      <todoList></todoList>
      <todoFooter></todoFooter>
		</section>
  </div>
</template>



<script>
import todoHeader from './components/todoHeader.vue'
import todoList from './components/todoList.vue'
import todoFooter from './components/todoFooter.vue'
export default {
  name: 'App',
  components: {
    todoHeader,
    todoList,
    todoFooter
  }
}
</script>

<style></style>
