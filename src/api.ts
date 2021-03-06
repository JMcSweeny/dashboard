import { Observable, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";

export const get = <T>(url: string): Observable<T> => {
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (!response.ok) {
        return throwError(response.status);
      }

      return response.json();
    }),
    catchError(err => {
      return throwError(err);
    })
  );
};
