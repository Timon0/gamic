import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyLicencesPageComponent } from './my-licences-page/my-licences-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { MintLicencesPageComponent } from './mint-licences-page/mint-licences-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeiToEtherPipe } from './core/pipes/wei-to-ether.pipe';


@NgModule({
    declarations: [AppComponent, NavigationBarComponent, MyLicencesPageComponent, OverviewPageComponent, MintLicencesPageComponent, WeiToEtherPipe],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
