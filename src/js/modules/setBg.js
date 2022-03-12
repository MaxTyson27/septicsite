const setBackground = () => {

  const elems = document.querySelectorAll('.install__item')
  const nodeElems = [...elems]

  // nodeElems[0].style.backgroundImage = 'url(' + `images/install-icon-1.svg` + ')'


  for(let i = 0; i <= nodeElems.length; i++){

    nodeElems[i].style.backgroundImage = 'url(' + `images/install-${i + 1}.png` + ')'
  }

}

export default setBackground