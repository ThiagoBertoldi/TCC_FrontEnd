import { addRemoveButton } from "../../Metodo/removeButton"
import { adicionaEfeitoArrastar } from "../../Metodo/draggableComponente"

export const fabArrowComponent = {
   createComponent(canvas, element, side, isStudent) {
      let div = document.createElement('div')
      let image = document.createElement('img')

      div.classList.add('board-component')
      div.classList.add(`board-component-arrow${side}`)

      image.setAttribute('src', '../../../../arrow.png')

      let rotate =
         side == 'Left' ? '0'
            : side == 'Up' ? '90'
               : side == 'Right' ? '180' : '270'

      image.style.transform = `rotate(${rotate}deg)`

      let style = div.style
      style.position = 'absolute'
      style.top = `${element?.component?.posicaoX ?? 10}px`
      style.left = `${element?.component?.posicaoY ?? 10}px`

      let styleImg = image.style
      styleImg.width = '100px'
      styleImg.height = '80px'

      div.appendChild(image)

      this.addElementCanvas(canvas, div, isStudent)
   },
   addElementCanvas(canvas, element, student) {

      if(!student) {
         addRemoveButton(element)
         adicionaEfeitoArrastar(element)
      }

      canvas.appendChild(element)
   }
}