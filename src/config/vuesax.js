import Vue from 'vue';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' 
import '../assets/css/overrides/vuesax.css'

Vue.use(Vuesax, {
    colors: {
        primary: "#6610f2",
        dark: "#222b45"
    }
});