import Vue from 'vue'
import Unicon from 'vue-unicons'
import { uniSignout, uniSetting, uniHomeAlt, uniThumbsDown, uniUsersAlt, uniEnvelope, uniArchiveAlt, uniPlus } from 'vue-unicons/src/icons'

Unicon.add([uniSignout, uniSetting, uniHomeAlt, uniThumbsDown, uniUsersAlt, uniEnvelope, uniArchiveAlt, uniPlus])
Vue.use(Unicon, { height: 25, width: 25 });