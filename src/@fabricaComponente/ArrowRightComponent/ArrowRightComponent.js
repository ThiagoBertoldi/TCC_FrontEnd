import { addRemoveButton } from "../_metodo/adicionaRemoveButton"
import { adicionaEfeitoArrastar } from "../_metodo/arrastaComponente"

export const fabArrowRightComponent = {
   createComponent(canvas, element) {
      let div = document.createElement('div')
      let image = document.createElement('img')

      div.classList.add('board-component')
      div.classList.add('board-component-arrowRight')

      image.setAttribute('src', './../../../arrowRight.png')

      let style = div.style
      style.position = 'absolute'
      style.top = `${element?.component?.posicaoX ?? 10}px`
      style.left = `${element?.component?.posicaoY ?? 10}px`

      let styleImg = image.style
      styleImg.width = '160px'
      styleImg.height = '80px'

      div.appendChild(image)

      this.addElementCanvas(canvas, div)
   },
   addElementCanvas(canvas, element) {

      addRemoveButton(element)
      adicionaEfeitoArrastar(element)

      canvas.appendChild(element)
   }
}