import { addRemoveButton } from "./adicionaRemoveButton"
import { adicionaEfeitoArrastar } from "./arrastaComponente"
import { montaTextComponent } from "../fabrica/montaTextComponent"
import { montaImageComponent } from "../fabrica/montaImageComponent"
import { montaArrowRightComponent } from "../fabrica/montaArrowRightComponent"
import { montaArrowLeftComponent } from "../fabrica/montaArrowLeftComponent"

export const fabInsert = {
   insereTextComponent(canvas, element) {
      let component = montaTextComponent(element)

      addRemoveButton(component)
      adicionaEfeitoArrastar(component)

      canvas.appendChild(component)
   },
   insereImageComponent(canvas, element) {
     let component = montaImageComponent(element)

      adicionaEfeitoArrastar(component)
      addRemoveButton(component)

      canvas.appendChild(component)
   },
   insertArrowRightComponent(canvas, element) {
      let component = montaArrowRightComponent(element)

      adicionaEfeitoArrastar(component)
      addRemoveButton(component)

      canvas.appendChild(component)
   },
   insertArrowLeftComponent(canvas, element){
      let component = montaArrowLeftComponent(element)

      adicionaEfeitoArrastar(component)
      addRemoveButton(component)

      canvas.appendChild(component)
   },
   insertArrowUpComponent(){

   },
   insertArrowDownComponent(){

   }
}

