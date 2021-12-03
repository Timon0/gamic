import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintLicencesPageComponent } from './mint-licences-page/mint-licences-page.component';
import { MyLicencesPageComponent } from './my-licences-page/my-licences-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
    { path: '', component: OverviewPageComponent },
    { path: 'my-licences', component: MyLicencesPageComponent },
    { path: 'mint-licences', component: MintLicencesPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
