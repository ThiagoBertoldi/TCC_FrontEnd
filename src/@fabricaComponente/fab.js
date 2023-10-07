import { createArrowLeftComponent } from "./componente/arrowLeftComponent";
import { createArrowRightComponent } from "./componente/arrowRightComponent";
import { createImageComponent } from "./componente/imageComponent";
import { createTextComponent } from "./componente/textComponentLayout";
import { fabInsert } from "./metodo/insereComponente";

const fab = {
   montarComponente(canvas, newComponentType) {
      switch (newComponentType) {
         case 'text':
            createTextComponent(canvas)
            break;
         case 'imagem':
            createImageComponent(canvas)
            break;
         case 'setaDireita':
            createArrowRightComponent(canvas)
            break;
         case 'setaEsquerda':
            createArrowLeftComponent(canvas)
            break;
         default:
            break;
      }
   },
   insereComponentDOM(canvas, element) {
      let type = element.component.type

      if (type == 'text')
         fabInsert.insereTextComponent(canvas, element)

      if(type == 'image')
         fabInsert.insereImageComponent(canvas, element)

      if(type == 'arrowRight')
         fabInsert.insertArrowRightComponent(canvas, element)

      if(type == 'arrowLeft')
         fabInsert.insertArrowLeftComponent(canvas, element)
   }
}

export { fab }