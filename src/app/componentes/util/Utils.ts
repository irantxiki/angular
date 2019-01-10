import { HttpEvent, HttpEventType } from '@angular/common/http';

export default class Utils {
    static manageHttpEvents (event: HttpEvent<any>) {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return event.body;
        }
      }
}
