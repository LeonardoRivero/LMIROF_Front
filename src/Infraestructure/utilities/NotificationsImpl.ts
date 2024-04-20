import { IFactoryNotifications, ModalType, NotificationType, Notificator } from "../../Domine/IPatterns";
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export class SwAlModalWithButtons implements Notificator {
  private message = "";
  private title = "";
  private icon: SweetAlertIcon = "info";
  private timeout = 0;

  public async show(title?: string | undefined, message?: string | undefined): Promise<boolean> {
    if (message != undefined) this.message = message;
    if (title != undefined) this.title = title;
    const objectSweetAlert: SweetAlertOptions = {
      title: this.title,
      allowOutsideClick: false,
      icon: this.icon,
      text: this.message,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      timer: this.timeout,
    };
    const swalReact = withReactContent(Swal);
    const result: SweetAlertResult = await swalReact.fire(objectSweetAlert);
    if (result.isConfirmed == true) {
      return true;
    }
    if (result.isDenied == true) {
      return false;
    }
    return false;
  }
  setType(type: NotificationType): void {
    this.icon = type;
  }
  setTime(timerMs: number): void {
    this.timeout = timerMs;
  }
}

export class SwAlToast implements Notificator {
  private message = "";
  private title = "";
  private icon: SweetAlertIcon = "info";
  private timeout = 4000;
  show(title?: string, message?: string): object {
    if (message != undefined) this.message = message;
    if (title != undefined) this.title = title;
    const objectSweetAlert: SweetAlertOptions = {
      position: "top-start",
      icon: this.icon,
      title: this.title,
      showConfirmButton: false,
      timer: this.timeout,
      toast: true,
      showCloseButton: true,
      footer: this.message,
      background: "#282c34",
      color: "#ffffff",
      timerProgressBar: true,
    };
    const swalReact = withReactContent(Swal);
    swalReact.fire(objectSweetAlert);
    return {};
  }

  setType(type: NotificationType): void {
    this.icon = type;
  }

  setTime(timerMs: number): void {
    this.timeout = timerMs;
  }
}
export class FactoryNotifications implements IFactoryNotifications {
  private notifications: Record<string, Notificator>;
  public constructor() {
    this.notifications = {
      SweetAlert: new SwAlModalWithButtons(),
      SweetAlertToast: new SwAlToast(),
    };
  }
  createNotificator(notificationType: ModalType): Notificator {
    if (notificationType.toString() in this.notifications) {
      return this.notifications[notificationType.toString()];
    }
    throw new Error("Notificacion type is not available");
  }
}
