export function changeImageEvent(element, srcImg) {
   element.addEventListener('change', function (event) {
      const selectedFile = event.target.files[0];
      
      if (selectedFile)
         srcImg.src = URL.createObjectURL(selectedFile);

      event.target.value = '';
   });
}