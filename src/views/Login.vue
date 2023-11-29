<template>
   <div class="screen d-flex justify-center align-center">
      <v-col xs="12" sm="8" md="6" lg="4" xl="3" style="max-width: 400px;">
         <v-card>
            <v-card-title class="ma-4">
               Login
            </v-card-title>
            <v-card-text class="mt-4">
               <v-text-field 
                  color="green" 
                  label="Email" 
                  variant="outlined" 
                  v-model="model.email"
               >
                  <template v-slot:prepend-inner>
                     <v-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                     </v-icon>
                  </template>
               </v-text-field>
            
               <v-text-field color="green" label="Senha" variant="outlined" type="password" v-model="model.pass">
                  <template v-slot:prepend-inner>
                     <v-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
                     </v-icon>
                  </template>
               </v-text-field>
               <div class="d-flex">
                  <v-btn @click="login" color="green" class="flex-grow-1">Entrar</v-btn>
               </div>
               <div class="mt-4 d-flex justify-center">
                  <span @click="goToRegister" style="cursor: pointer;">Ainda não tenho uma conta</span>
               </div>
            </v-card-text>
         </v-card>
      </v-col>

      <v-snackbar
         v-model="snackbar"
         :timeout="3000"
         color="red"
      >
         {{ error?.message }}
      </v-snackbar>
   </div>
</template>

<script>

export default {
   data() {
      return {
         model: {
            email: 'thiago.professor@gmail.com',
            pass: '12345678'
            // email: 'thiago.aluno@gmail.com',
            // pass: '@login1234'
         },
         snackbar: false,
         error: null
      }
   },
   watch: {
      'error': function(data) {
         this.snackbar = true
      }
   },
   methods: {
      login() {
         this.$store.dispatch('login', this.model)
         .then(response => {
            if(!response.data?.hasError) {
               response.data.type === 1
                  ? this.$router.push('/home-professor')
                  : this.$router.push('/home-aluno')
            }
         })
         .catch(err => { this.error = err.data })
      },
      goToRegister() {
         this.$router.push('/register')
      }
   },
   mounted() {
      this.$store.dispatch('setUserNull')
   }
}
</script>