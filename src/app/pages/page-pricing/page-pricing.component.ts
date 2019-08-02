import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {EChartOption} from 'echarts';
import {SidebarService} from '../../services/sidebar.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-page-pricing',
    templateUrl: './page-pricing.component.html',
    styleUrls: ['./page-pricing.component.css']
})
export class PagePricingComponent implements OnInit {
    id: number;
    userArray: UserModel;
    admin = false;
    vendor = false;
    manager = false;
    customer = false;
    agent = false;
    public visitorsOptions: EChartOption = {};
    public visitsOptions: EChartOption = {};
    public sidebarVisible: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private sidebarService: SidebarService,
        private cdr: ChangeDetectorRef,
        private authService: AuthService
    ) {
        this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], '#49c5b6');
        this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], '#f4516c');
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
            }
        );
        this.userArray = this.authService.fetchUsers()[this.id];
        for (let role of this.userArray.roles) {
            if (role === 1) {
                this.admin = true;
            } else if (role === 2) {
                this.vendor = true;
            } else if (role === 3) {
                this.agent = true;
            } else if (role === 4) {
                this.customer = true;
            } else if (role === 5) {
                this.manager = true;
            }
        }
    }

    toggleFullWidth() {
        this.sidebarService.toggle();
        this.sidebarVisible = this.sidebarService.getStatus();
        this.cdr.detectChanges();
    }

    loadLineChartOptions(data, color) {
        let chartOption: EChartOption;
        let xAxisData: Array<any> = new Array<any>();

        data.forEach(element => {
            xAxisData.push('');
        });

        return chartOption = {
            xAxis: {
                type: 'category',
                show: false,
                data: xAxisData,
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: false
            },
            series: [{
                data: data,
                type: 'line',
                showSymbol: false,
                symbolSize: 1,
                lineStyle: {
                    color: color,
                    width: 1
                }
            }]
        };
    }

}
