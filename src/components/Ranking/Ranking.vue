<template>
  <v-dialog v-model="show" max-width="1000px">
    <v-card>
      <v-card-title class="ma-4 d-flex flex-column">
        <span class="text-h5">Ranking da Matéria</span>
        <small><i>O ranking é definido com base na acertividade das questões</i></small>
      </v-card-title>

      <v-card-text class="d-flex flex-column">
        <v-col cols="12">
          <v-row class="ga-2">
            <template v-for="(item, index) in podio" :key="item">
              <v-col cols="4" class="d-flex align-stretch">
                <v-card class="d-flex justify-center align-center w-100" @click="abreRespostaAluno(item)"
                  style="cursor: pointer;">

                    <v-col cols="3">
                      <v-img :src="getMedalha(index)" />
                    </v-col>
                    <v-col cols="9" class="d-flex flex-column">
                      <div>
                        <p>{{ item.nome }}</p>
                        <i style="font-size: 14px">{{ item?.titulo ?? 'Novato' }}</i>
                      </div>
                      <div class="d-flex justify-end">
                        <p>{{ item.contador }} pts. </p>
                      </div>
                    </v-col>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-col>

        <v-col cols="12">
            <template v-for="(item, index) in ranking" :key="item">
              <v-card class="mt-2 d-flex justify-between" @click="abreRespostaAluno(item)" style="cursor: pointer;">
                  <v-col cols="1" class="d-flex justify-center align-center">
                    <p> {{ index + 4 }}° </p>
                  </v-col>
                  <v-col cols="9" class="d-flex justify-center flex-column">
                    <p>{{ item.nome }}</p>
                    <i style="font-size: 14px">{{ item?.titulo ?? 'Novato' }}</i>
                  </v-col>
                  <v-col cols="2" class="d-flex justify-center align-center">
                    <p>{{ item.contador }} pts.</p>
                  </v-col>
              </v-card>
            </template>
        </v-col>
      </v-card-text>

      <v-card-actions class="ma-4">
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="text" @click="show = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <CardRespostasAluno ref="cardRespostas" />
</template>

<script>
import CardRespostasAluno from '../CardRespostasAluno/CardRespostasAluno.vue'

export default {
  data() {
    return {
      show: false,
      ranking: [],
      podio: []
    }
  },
  methods: {
    openModal(sender) {
      this.buscaRanking()

      this.show = true
    },
    getMedalha(index) {
      switch (index) {
        case 0:
          return new URL('../../../public/medalha-de-ouro.png', import.meta.url).href
        case 1:
          return new URL('../../../public/medalha-de-prata.png', import.meta.url).href
        case 2:
          return new URL('../../../public/medalha-de-bronze.png', import.meta.url).href
        default:
          return ''
      }
    },
    abreRespostaAluno(aluno) {
      this.$refs.cardRespostas.openModal(aluno._id)
    },
    buscaRanking() {
      let dto = { idMateria: this.$route.params.id }

      this.$api.get('get-ranking', dto)
        .then(response => {
          this.ranking = response.data.filter((item, index) => {
            if (index > 2) return item
          })

          this.podio = response.data.filter((item, index) => {
            if (index < 3) return item
          })
        })
        .catch(err => console.log(err))
    }
  },
  components: {
    CardRespostasAluno
  }
}
</script>