import {Component, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() userModel: UserModel;
    @Input() sidebarVisible = true;
    @Input() navTab = 'menu';
    @Input() currentActiveMenu;
    @Input() currentActiveSubMenu;
    @Output() changeNavTabEvent = new EventEmitter();
    @Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass = 'theme-cyan';
    public darkClass = '';
    private ngUnsubscribe = new Subject();

    constructor(private themeService: ThemeService) {
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
            this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    changeNavTab(tab: string) {
        this.navTab = tab;
    }

    activeInactiveMenu(menuItem: string) {
        this.activeInactiveMenuEvent.emit({'item': menuItem});
    }

    changeTheme(theme: string) {
        this.themeService.themeChange(theme);
    }

    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
    }
}
