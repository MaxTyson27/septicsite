import $ from "jquery";
import '../../node_modules/inputmask/dist/jquery.inputmask'
import "../sass/main.sass"
import "../pug/index.pug"
import inputs from './modules/inputs'

inputs()



$('.input-phone').inputmask({ "mask": "+7(999) 999-99-99" })