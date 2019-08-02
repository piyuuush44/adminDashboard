import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import {FullCalendarModule} from 'ng-fullcalendar';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgxGalleryModule} from 'ngx-gallery';

import * as $ from 'jquery';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {HttpService} from './services/http.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        routing,
        NgbModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RichTextEditorAllModule,
        FullCalendarModule,
        NgMultiSelectDropDownModule.forRoot(),
        LeafletModule.forRoot(),
        NgxGalleryModule
    ],
    providers: [AuthService, HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
