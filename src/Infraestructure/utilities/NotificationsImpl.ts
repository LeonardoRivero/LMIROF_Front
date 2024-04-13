import { IFactoryNotifications, ModalType, NotificationType, Notificator } from "../../Domine/IPatterns";
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export class SweetAlertModal implements Notificator {
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

export class FactoryNotifications implements IFactoryNotifications {
  private notifications: Record<string, Notificator>;
  public constructor() {
    this.notifications = {
      SweetAlert: new SweetAlertModal(),
    };
  }
  createNotificator(notificationType: ModalType): Notificator {
    if (notificationType.toString() in this.notifications) {
      return this.notifications[notificationType.toString()];
    }
    throw new Error("Notificacion type is not available");
  }
}
