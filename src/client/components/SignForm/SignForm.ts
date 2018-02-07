import Vue from "vue";
export default Vue.extend({
  data: () => ({
    ava: "https://",
    nick: "",
    rules: {
      size: (value) => {
        return value.length <= 15 || "Invalid size.";
      },
      url: (value) => {
        const pattern = /^(http|https):\/\/(([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]+)|((25[0-5]|2[0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9]?)(\.(25[0-5]|2[0-4][0-9]|[1][0-9][0-9]|[1-9][0-9]|[0-9]?)){3}(:?[0-9]*)))?(\/.*)?$/;
        return pattern.test(value) || "Invalid url.";
      },
    },
  }),
  methods: {
    reg(event) {
      this.greet(this.ava, this.nick);
    },
  },
  props: {
    greet: Function,
  },
});
