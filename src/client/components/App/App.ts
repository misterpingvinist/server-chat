import * as io from "socket.io-client";
import Vue from "vue";
import Component from "vue-class-component";
import config from "../../../config";
import avatars from "../../data/avatars";
import MessageVue from "../Message/Message.vue";
import SignForm from "../SignForm/SignForm.vue";
import Toolbar from "../Toolbar/Toolbar.vue";

interface User {
  ava: string;
  title: string;
}

interface Message {
  ava: string;
  title: string;
}

interface Avatars {
  format: string;
  width: number;
  height: number;
  filename: string;
  id: number;
  author: string;
  author_url: string;
  post_url: string;
}

@Component({
  components: {
    MessageVue,
    SignForm,
    Toolbar
  }
})
export default class App extends Vue {
  private name: string = "App";
  private drawer: boolean = document.body.clientWidth > 1250 ? true : false;
  private nick: string = "";

  private ava: string = "";
  private message: string = "";
  private socket = io(`${config.address}:${config.port}`);
  private ok: boolean = false;
  private users: User[];
  private images: Avatars[] = avatars.ava;
  private $socket: any;
  private messages: Message[] = [];
  constructor() {
    super();
    this.users = [];
    this.socket.on("chat_message", val => {
      this.messages.push(val);
    });
    this.socket.on("sign", val => {
      this.setUsers(val);
    });
  }
  private draw() {
    this.drawer = !this.drawer;
  }

  private setUsers(users): void {
    this.users = users;
  }

  get styleObject() {
    return {
      alignItems: "center",
      background: "#d4e4e4",
      bottom: 0,
      color: "#fff",
      height: "100px",
      paddingLeft:
        this.drawer === null || this.drawer === false ? "10px" : "160px",

      position: "fixed",
      width: "100%"
    };
  }

  private greet(inava: string, innick: string) {
    const ava = inava;
    let nick = innick;
    if (nick.trim() !== "") {
      this.ok = !this.ok;
      nick = nick.trim();
      if (ava.trim() === "" || ava.trim() === "https://") {
        const item = this.images[
          Math.floor(Math.random() * this.images.length)
        ];
        this.ava = `${config.ava_url}${item.filename}`;
      }
      this.nick = nick;
      this.socket.emit("sign", {
        ava: this.ava,
        title: nick
      });
    }
  }
  private send() {
    if (this.message !== "") {
      this.socket.emit("chat_message", {
        ava: this.ava,
        text: this.message,
        title: this.nick
      });
      this.message = "";
    }
  }
}
