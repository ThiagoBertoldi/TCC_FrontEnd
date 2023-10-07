export const inputValues = {
   addEventUpdateValueInputText(element) {
      element.addEventListener('input', (event) => {
         element.style.height = 'auto'
         element.style.height = (element.scrollHeight) + 'px'
   
         element.value = element.value.replace('<br>', '\n')
   
         element.innerText = element.value
      })
   }
}