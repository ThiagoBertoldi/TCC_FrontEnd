<template>
   <div>
      <NavBar :routes="rotasNavBar" />
      <div class="ma-4">
         <v-card ref="canvas" class="bg-white canvas" min-height="88vh"></v-card>
      </div>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'

export default {
   data() {
      return {
         model: {},
         rotasNavBar: {
            homeAluno: true
         }
      }
   },
   methods: {
      getElementMethods(type, canvas, element) {
         switch (type) {
            case 'text':
               this.$element.TextComponent.createComponent(canvas, element, true)
               break;
            case 'image':
               this.$element.ImageComponent.createComponent(canvas, element, true)
               break;
            case 'arrowRight':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Right', true)
               break;
            case 'arrowLeft':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Left', true)
               break;
            case 'arrowUp':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Up', true)
               break;
            case 'arrowDown':
               this.$element.ArrowComponent.createComponent(canvas, element, 'Down', true)
               break;
            default:
               break;
         }
      }
   },
   mounted() {
      let idBoard = this.$route.params.id

      this.$api.get('get-components', { idBoard })
         .then(response => {
            let canvas = this.$refs.canvas.$el

            console.log(response, 'Componentes board')
            response.data.response.map(element => {
               this.getElementMethods(element.component.type, canvas, element)
            })
         })
         .catch(err => { })
   },
   components: {
      NavBar
   }
}
</script>