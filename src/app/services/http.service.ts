import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    postRequest(url: string, body: any): Observable<HttpResponse<any>> {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'auth_key': 'sadfdsfdsf'
                }
            ),
            observe: 'response' as 'response'
        };
        return this.http.post<HttpResponse<any>>(url, body, options);
    }

    getRequest(url: string): Observable<HttpResponse<any>> {
        const options = {
            headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'auth_key': 'sadfdsfdsf'
                }
            ),
            observe: 'response' as 'response'
        };
        return this.http.get<HttpResponse<any>>(url, options);

    }
}
