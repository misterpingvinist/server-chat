"use strict";
exports.__esModule = true;
var http = require("http");
var Koa = require("koa");
var serve = require("koa-static");
var sanitizeHtml = require("sanitize-html");
var socketIo = require("socket.io");
var Chat = /** @class */ (function () {
    function Chat() {
        this.connection = [];
        this.optionsHtml = {
            allowedAttributes: {
                a: ["href", "name", "target"],
                // We don't currently allow img itself by default, but this
                // would make sense if we did
                img: ["src"]
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
                "pre"
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
                "meta"
            ],
            // URL schemes we permit
            allowedSchemesByTag: {},
            allowProtocolRelative: true
        };
        this.createApp("./dist");
        this.createServer();
        this.createIO();
    }
    Chat.prototype.listen = function (port) {
        var _this = this;
        this.io.on("connection", function (socket) {
            socket.on("disconnect", function () {
                for (var index = 0; index < _this.connection.length; index++) {
                    if (_this.connection[index].socket.id === socket.id) {
                        _this.connection.splice(index, 1);
                    }
                }
                _this.io.emit("sign", _this.connection.map(function (x) { return x.name; }));
            });
            socket.on("chat_message", function (msg) {
                _this.io.emit("chat_message", {
                    ava: msg.ava,
                    text: sanitizeHtml(msg.text, _this.optionsHtml),
                    title: msg.title
                });
            });
            socket.on("sign", function (msg) {
                var title = sanitizeHtml(msg.title, _this.optionsHtml);
                var ava = sanitizeHtml(msg.ava, _this.optionsHtml);
                _this.connection.push({
                    name: { ava: ava, title: title },
                    socket: socket
                });
                _this.io.emit("sign", _this.connection.map(function (x) { return x.name; }));
            });
        });
        this.server.listen(3000);
    };
    Chat.prototype.createApp = function (path) {
        this.app = new Koa();
        this.app.use(serve(path));
    };
    Chat.prototype.createServer = function () {
        this.server = http.createServer(this.app.callback());
    };
    Chat.prototype.createIO = function () {
        this.io = socketIo(this.server, {
            pingInterval: 20000,
            pingTimeout: 50000
        });
    };
    return Chat;
}());
exports.Chat = Chat;
