export class MessageBox
{
  currentThis: Phaser.Scene;
  background_: Phaser.GameObjects.Rectangle;
  txtMessage_: any; // TODO


  constructor(that)
  {
    this.currentThis = that;
    this.background_ = this.currentThis.add.rectangle(
      400,
      480,
      750,
      160,
      0x6666ff
    );
    this.background_.setFillStyle(0x6666ff, 128);
    this.background_.visible = false;
    this.txtMessage_ = this.currentThis.add
      .text(50, 410, "messageArea")
      .setFontSize("32px")
      .setColor("#ffffff")
      .setPadding(0, 6, 0, 0);
    this.txtMessage_.visible = false;
  }

  show(message_text)
  {
    this.background_.visible = true;
    this.txtMessage_.text = message_text;
    this.txtMessage_.visible = true;
  }

  hide()
  {
    this.background_.visible = false;
    this.txtMessage_.visible = false;
    this.txtMessage_.setColor("#ffffff");
  }

  setMessageColor(code_)
  {
    this.txtMessage_.setColor(code_);
  }
}
