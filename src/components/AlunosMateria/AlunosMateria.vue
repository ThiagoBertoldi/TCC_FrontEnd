<template>
  <v-dialog v-model="show" max-width="600px" max-height="800">
    <v-card>
      <v-card-title class="ma-4">
        <span class="text-h5">Alunos na Matéria</span>
      </v-card-title>
      <v-card-text>
        <template v-for="aluno in alunos" :key="aluno">
          <v-card class="ma-2 pa-4" @click="openPerfilAluno(aluno.idAluno)" style="cursor: pointer;">
            <v-row class="d-flex justify-center align-center">
              <v-col cols="2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="user">
                  <rect width="256" height="256" fill="none"></rect>
                  <circle cx="128" cy="96" r="64" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="16">
                  </circle>
                  <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"
                    d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"></path>
                </svg>
              </v-col>
              <v-col class="d-flex flex-column">
                <p>{{ aluno.nome }}</p>
                <small>{{ aluno.titulo }}</small>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-center flex-column">
                <p>Lvl {{ calculaXp(aluno.xp) }}</p>
                <small>{{ aluno.xp }} XP</small>
              </v-col>
            </v-row>
          </v-card>
        </template>
      </v-card-text>
      <v-card-actions class="ma-4">
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="text" @click="show = false">
          Voltar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      show: false,
      alunos: [],
      snackbar: false,
      error: { message: null }
    }
  },
  methods: {
    openModal() {

      let dto = {
        idMateria: this.$route.params.id
      }

      this.$api.get('get-alunos-materia', dto)
        .then(response => {
          this.alunos = response.data
          this.show = true
        })
        .catch(err => this.$emit('snackbar', err.response.data.data.message, false))
    },
    openPerfilAluno(aluno) {
      this.$router.push({ name: 'BuscaPerfilAluno', params: { id: aluno } })
    },
    calculaXp(xp = 0) {
      if (xp == 0)
        return 1

      let qntdXp = 50
      let nivelAtual = 0;
      let continua = true

      do {
        xp = xp - qntdXp
        if (xp < 0)
          continua = false

        nivelAtual++
        qntdXp += 10
      } while (continua)

      return nivelAtual
    }
  }
}
</script>