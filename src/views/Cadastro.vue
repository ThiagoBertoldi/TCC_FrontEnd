<template>
   <div class="screen d-flex justify-center align-center">
      <v-col xs="12" sm="8" md="6" lg="4" xl="3" style="max-width: 400px;">
         <v-card>
            <v-card-title class="ma-4">
               Cadastro
            </v-card-title>
            <v-card-text class="mt-4">
               <v-text-field color="green" label="Email" variant="outlined" v-model="model.email">
                  <template v-slot:prepend-inner>
                     <v-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                     </v-icon>
                  </template>
               </v-text-field>
               <v-text-field color="green" label="Nome de Usuário" variant="outlined" v-model="model.username">
                  <template v-slot:prepend-inner>
                     <v-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8L8.11 7.06L5 5.5L12 2L19 5.5V10.5H18V6L15.89 7.06L16 8M12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" /></svg>
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
               <v-text-field color="green" label="Confirme a Senha" variant="outlined" type="password" v-model="model.confirmPass">
                  <template v-slot:prepend-inner>
                     <v-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
                     </v-icon>
                  </template>
               </v-text-field>
               <div class="d-flex">
                  <v-btn @click="signup" color="green" class="flex-grow-1">Cadastrar</v-btn>
               </div>
               <div class="mt-4 d-flex justify-center">
                  <span @click="goToLogin" style="cursor: pointer;">Já tenho uma conta</span>
               </div>
            </v-card-text>
         </v-card>
      </v-col>
      <v-snackbar
         v-model="snackbar_error"
         :timeout="3000"
         color="red"
      >
         {{ error?.message }}
      </v-snackbar>
      <v-snackbar
         v-model="snackbar_success"
         :timeout="3000"
         color="green"   
      >
         {{ success }}
      </v-snackbar>
   </div>
</template>

<script>
export default {
   data() {
      return {
         model: {
            type: 1
         },
         snackbar_success: false,
         success: null,
         snackbar_error: false,
         error: null
      }
   },
   watch: {
      'success': function(data) {
         this.snackbar_success = true
      },
      'error': function(data) {
         this.snackbar_error = true
      }
   },
   methods: {
      signup() {

         if(this.model?.confirmPass != this.model?.pass)
            return this.error = { message: 'Senhas são diferentes' }

         this.$store.dispatch('cadastro', this.model)
         .then(response => {
            if(!response.data?.hasError) {
               this.success = "Cadastrado com sucesso"
               
               setTimeout(() => {
                  this.$router.push('/')
               }, 3500);
            }
         })
         .catch(err => { this.error = err.data })
      },
      goToLogin() {
         this.$router.push('/')
      }
   }
}
</script>