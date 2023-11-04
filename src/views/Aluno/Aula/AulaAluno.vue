<template>
   <div class="d-flex flex-column" style="height:100vh; width: 100%">
      <NavBar :routes="rotasNavBar" />
      <img id="bgImg" />
      <div class="canvas" style="position: absolute; width: 100%; height: 100vh;"></div>
      <QuestaoAluno ref="questaoAluno" @refresh="refresh" />
   </div>
</template>

<script>
import { adicionaEfeitoArrastar } from '@/@fabricaComponente/Metodo/draggableComponente'
import NavBar from '../../../components/NavBar/NavBar.vue'
import QuestaoAluno from '../../../components/QuestaoAluno/QuestaoAluno.vue'
import userStore from '@/store/userStore'

export default {
   data() {
      return {
         rotasNavBar: {
            homeAluno: true
         },
         classBg: null
      }
   },
   methods: {
      buscaAulas() {
         this.$api.get('get-aulas', { idMateria: this.$route.params.id })
         .then(aulas => {
            this.$api.get('questoes-respondidas', { idMateria: this.$route.params.id })
            .then(respondidas => {
               let aulasData = aulas.data
               let respondidasData = respondidas.data

               if (aulasData instanceof Array) {
                  aulasData.map((aula, index) => {
                     let estaRespondida = respondidasData.find(x => x.idAula == aula._id && aula.tipoAula === 2)
                     this.criaElementClass(index, aula, estaRespondida)
                  })
               }
            })
         })
         .catch(err => { })
      },
      refresh() {
         this.buscaAulas()
      },
      async setBackground() {
         let img = document.getElementById('bgImg')

         let dto = { idMateria: this.$route.params.id }

         await this.$api.post('get-background', dto)
            .then(async response => {
               img.src = response.data.backgroundBase64
               img.style.height = '90.6%'
            })
            .catch(err => console.log(err))
      },
      criaElementClass(num, aula, respondida) {
         let canvas = document.querySelector('.canvas')

         let element = document.createElement('div')
         element.classList.add('class-component')
         element.setAttribute('id_aula', aula._id)

         let style = element.style
         style.width = '50px'
         style.height = '50px'
         style.backgroundColor = 
            aula.tipoAula == 1 
               ? 'blue' 
               : !respondida 
                  ? 'orange'
                  : respondida?.respostaCorreta
                     ? 'green'
                     : 'red'
         style.color = '#fff'
         style.borderRadius = '25px'
         style.display = 'flex'
         style.justifyContent = 'center'
         style.alignItems = 'center'
         style.position = 'absolute'
         style.left = `${aula?.posicaoX ?? 0}px`
         style.top = `${aula?.posicaoY ?? 0}px`

         let numElement = document.createElement('p')
         numElement.innerText = num + 1

         element.appendChild(numElement)

         if (aula.tipoAula === 1) {
            element.addEventListener('dblclick', () => this.$router.push({ name: 'BoardAluno', params: { id: aula.idBoard } }))
         } else {
            element.addEventListener('dblclick', () => this.$refs.questaoAluno.openModal(aula, respondida != null))
         }

         if (userStore.getters.getUser.type != 2)
            adicionaEfeitoArrastar(element)

         canvas.appendChild(element)
      },
   },
   mounted() {
      this.setBackground()
      this.buscaAulas()
   },
   components: {
      NavBar,
      QuestaoAluno
   }
}
</script>