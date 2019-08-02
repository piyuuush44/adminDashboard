import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

    loginType = true;
    subscription: Subscription;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.subscription = this.authService.loggedIn.subscribe(
            (val: boolean) => {
                this.loginType = val;
            }
        )
        ;
    }

    onSubmit(form: NgForm) {
        this.authService.signIn(form.value);
    }
}
