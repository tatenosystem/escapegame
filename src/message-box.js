"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBox = void 0;
var MessageBox = /** @class */ (function () {
    function MessageBox(that) {
        this.currentThis = that;
        this.background_ = this.currentThis.add.rectangle(400, 480, 750, 160, 0x6666ff);
        this.background_.setFillStyle(0x6666ff, 128);
        this.background_.visible = false;
        this.txtMessage_ = this.currentThis.add
            .text(50, 410, "messageArea")
            .setFontSize("32px")
            .setColor("#ffffff")
            .setPadding(0, 6, 0, 0);
        this.txtMessage_.visible = false;
    }
    MessageBox.prototype.show = function (message_text) {
        this.background_.visible = true;
        this.txtMessage_.text = message_text;
        this.txtMessage_.visible = true;
    };
    MessageBox.prototype.hide = function () {
        this.background_.visible = false;
        this.txtMessage_.visible = false;
        this.txtMessage_.setColor("#ffffff");
    };
    MessageBox.prototype.setMessageColor = function (code_) {
        this.txtMessage_.setColor(code_);
    };
    return MessageBox;
}());
exports.MessageBox = MessageBox;
