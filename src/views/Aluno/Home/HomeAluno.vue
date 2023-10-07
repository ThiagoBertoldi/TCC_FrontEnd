<template>
   <div>
      <h1>Aluno</h1>
      <div>{{ user?.username ?? 'User não logado' }}</div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         user: null
      }
   },
   mounted() {
      this.user = this.$store.getters.getUser
   }
}
</script>