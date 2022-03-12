const inputs = () => {

  const inputsName = document.querySelectorAll('.input-name')

  inputsName.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^а-яёa-z]+/gi, '')
      if (e.target.value.length === 1) {
        e.target.value = e.target.value.toUpperCase()
      }
    })
  });




}

export default inputs