"use client";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Notification {
  constructor(private duration: number = 3000) {
    this.initializeNotyf();
  }

  private notif: Notyf | null = null;

  private initializeNotyf() {
    if (typeof window !== "undefined") {
      this.notif = new Notyf({
        duration: this.duration,
        position: {
          x: "right",
          y: "top",
        },
      });
    }
  }

  private formatMessage(message: string): string {
    return message.charAt(0).toUpperCase() + message.slice(1);
  }

  error(message = "ERROR") {
    const formattedMsg = this.formatMessage(message);
    if (this.notif) {
      this.notif.error({
        message: formattedMsg,
        dismissible: true,
      });
    }
  }

  success(message = "SUCCESS") {
    const formattedMsg = this.formatMessage(message);
    if (this.notif) {
      this.notif.success({
        message: formattedMsg,
        dismissible: true,
      });
    }
  }
}

export default Notification;
