<template>
  <v-dialog v-model="show" max-width="650px">
    <v-card>
      <v-card-title class="ma-4 d-flex flex-column">
        <span class="text-h5">Respostas de {{ nome ?? '?' }} </span>
        <p style="font-size: 18px">Conhecido como: <i style="font-size: 18px">{{ titulo ?? 'Novato' }}</i></p>
      </v-card-title>

      <v-card-text>
        
        <v-row class="d-flex justify-center mb-2">
          <v-col class="d-flex justify-center">
            Questões: {{ this.acertos.total }}
          </v-col>
          <v-col class="d-flex justify-center">
            Acertos: {{ this.acertos.acertos }}
          </v-col>
          <v-col class="d-flex justify-center">
            Erros: {{ this.acertos.erros }}
          </v-col>
        </v-row>

        <template v-for="item in respostas" :key="item">
          <v-card :color="item.acerto ? 'green' : 'red' " class="ma-2 pa-2">
            {{ item.descricao }}
          </v-card>
        </template>
      </v-card-text>

      <v-row class="mt-4">
        <v-col class="d-flex justify-center">
          Total de XP ganho: {{ this.acertos.acertos * 10 }} XP
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center">
          Total de moedas ganhas: $ {{ this.acertos.moedas }}
        </v-col>
      </v-row>

      <v-card-actions class="ma-4">
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="text" @click="show = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      nome: null,
      respostas: [],
      acertos: {},
      titulo: null
    }
  },
  methods: {
    openModal(sender) {
      this.buscaRespostas(sender)

      this.show = true
    },
    buscaRespostas(idAluno) {
      let dto = { idAluno, idMateria: this.$route.params.id }

      this.$api.get('respostas-aluno-materia', dto)
      .then(response => {
        this.nome = response.data.nome
        this.titulo = response.data.titulo

        this.acertos = {
          acertos: response.data.acertos,
          erros: response.data.erros,
          total: response.data.total,
          moedas: response.data.moedas
        }

        this.respostas = response.data.respostas
      })
      .catch(err => console.log(err))
    }
  }
}
</script>