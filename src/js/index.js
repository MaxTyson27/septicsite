import $ from "jquery";
import '../../node_modules/inputmask/dist/jquery.inputmask'
import "../sass/main.sass"
import "../pug/index.pug"
import inputs from './modules/inputs'
import setbg from './modules/setBg'

inputs()
setbg()



$('.input-phone').inputmask({ "mask": "+7(999) 999-99-99" })