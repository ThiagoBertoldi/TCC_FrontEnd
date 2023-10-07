import { fabInsert } from "../metodo/insereComponente";

export function createTextComponent(canvas, element) {
   let areaElement = document.createElement('div');
   let titleElement = document.createElement('textarea');
   let inputElement = document.createElement('textarea');
   
   areaElement.setAttribute('id', 'id' + new Date().getTime())
   areaElement.classList.add('board-component-text')
   areaElement.classList.add('board-component')

   let area = areaElement.style;
   area.width = '300px'
   area.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)'
   area.margin = '10px'
   area.color = '#fff'
   area.backgroundColor = '#252525';
   area.display = 'flex';
   area.alignItems = 'start';
   area.flexDirection = 'column'
   area.position = 'absolute';
   area.padding = '10px';
   area.border = '1px solid #3e3e3e'
   area.borderRadius = '10px';

   titleElement.classList.add('title')
   titleElement.setAttribute('placeholder', 'Título')
   let title = titleElement.style
   title.color = '#fff'
   title.fontWeight = 'bold'
   title.resize = 'none'
   title.margin = '4px'
   title.padding = '6px'
   title.height = '40px'
   title.maxHeight = '120px'
   title.width = '88%'

   inputElement.classList.add('textarea')
   inputElement.setAttribute('placeholder', 'Texto')
   let input = inputElement.style;
   input.color = '#fff'
   input.margin = '4px'
   input.padding = '6px'
   input.maxHeight = '250px'
   input.width = '100%'

   titleElement.value = element?.tile ?? null
   inputElement.value = element?.text ?? null

   areaElement.appendChild(titleElement)
   areaElement.appendChild(inputElement)

   fabInsert.insereTextComponent(canvas, areaElement)
}