import Vue from 'vue'
export default Vue.extend({
    props: {
        draw: Function,
        nick: String,
        ok: Boolean
      }
})