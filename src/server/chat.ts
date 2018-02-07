import * as http from "http";
import * as Koa from "koa";
import * as serve from "koa-static";
import * as sanitizeHtml from "sanitize-html";
import * as socketIo from "socket.io";
interface SocketName {
  ava: string;
  title: string;
}

interface Message {
  ava: string;
  title: string;
  text: string;
}

interface Socket {
  socket: SocketIO.Socket;
  name: SocketName;
}

export class Chat {
  public connection: Socket[] = [];
  public server: http.Server;
  private app: Koa;

  private io: SocketIO.Server;
  private optionsHtml: sanitizeHtml.IOptions = {
    allowedAttributes: {
      a: ["href", "name", "target"],
      // We don't currently allow img itself by default, but this
      // would make sense if we did
      img: ["src"],
    },
    allowedSchemes: ["http", "https", "ftp", "mailto"],
    allowedTags: [
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "nl",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "strike",
      "code",
      "hr",
      "br",
      "div",
      "table",
      "thead",
      "caption",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
    ],

    // Lots of these won't come up by default because we don't allow them
    selfClosing: [
      "img",
      "br",
      "hr",
      "area",
      "base",
      "basefont",
      "input",
      "link",
      "meta",
    ],
    // URL schemes we permit

    allowedSchemesByTag: {},

    allowProtocolRelative: true,
  };

  constructor() {
    this.app = this.createApp("./client");
    this.server = this.createServer();
    this.io = this.createIO();
  }
  public listen(port: number): void {
    this.io.on("connection", (socket: SocketIO.Socket): void => {
      socket.on("disconnect", () => {
        for (let index = 0; index < this.connection.length; index++) {
          if (this.connection[index].socket.id === socket.id) {
            this.connection.splice(index, 1);
          }
        }
        this.io.emit("sign", this.connection.map((x) => x.name));
      });

      socket.on("chat_message", (msg: Message): void => {
        this.io.emit("chat_message", {
          ava: msg.ava,
          text: sanitizeHtml(msg.text, this.optionsHtml),
          title: msg.title,
        });
      });

      socket.on("sign", (msg: Message): void => {
        const title = sanitizeHtml(msg.title, this.optionsHtml);
        const ava = sanitizeHtml(msg.ava, this.optionsHtml);
        this.connection.push({
          name: { ava, title },
          socket,
        });
        this.io.emit("sign", this.connection.map((x) => x.name));
      });
    });
    this.server.listen(port);
  }
  private createApp(path: string): Koa {
    const app = new Koa();
    app.use(serve(path));
    return app;
  }

  private createServer(): http.Server {
    return http.createServer(this.app.callback());
  }
  private createIO(): SocketIO.Server {
    return socketIo(this.server, {
      pingInterval: 20000,
      pingTimeout: 50000,
    });
  }
}
