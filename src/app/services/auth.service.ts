import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {HttpService} from './http.service';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    users: UserModel[] = [];
    token = '';
    loggedIn = new Subject<boolean>();
    userSubscription: Subscription;
    @Output() userModel = new EventEmitter<UserModel>();

    constructor(private httpService: HttpService, private router: Router) {
    }

    fetchUsers() {
        this.userSubscription = this.httpService.getRequest('http://dev.wandertribe.in/user_list').subscribe(
            (res: HttpResponse<any>) => {
                if (res.status === 200) {
                    for (const item of res.body.result) {
                        let roleObj: Object[] = [];
                        for (const role of item.user_role) {
                            roleObj.push(role.role_id);
                        }
                        this.users.push(new UserModel(item.name, item.email, item.mobile, '', roleObj));
                    }
                }
            }
        );
        return this.users;
    }

    signIn(body) {
        this.httpService.postRequest('https://api.wandertribe.in/api/login', body).subscribe(
            (res: HttpResponse<any>) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem('auth_key', res.body.result.auth_key);
                    localStorage.setItem('email', res.body.result.email);
                    localStorage.setItem('name', res.body.result.name);
                    localStorage.setItem('mobile', res.body.result.mobile);
                    this.token = res.body.result.auth_key;
                    this.loggedIn.next(true);
                    // this.userModel.emit(new UserModel(res.body.result.name, res.body.result.email, res.body.result.mobile));
                    this.router.navigate(['/admin/dashboard/index']);
                } else {
                    this.loggedIn.next(false);
                    this.token = '';
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
