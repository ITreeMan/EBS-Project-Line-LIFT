import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfOpenClassComponent } from './prof-open-class/prof-open-class.component'
import { StudentInfoComponent } from './student-info/student-info.component'



const routes: Routes = [

  {
    path: 'prof', component: ProfOpenClassComponent,
  },
  {
    path: '', component: StudentInfoComponent,
  },
  // {
  //   path: 'AppComponent', component: AppComponent,
  // },
  // { path: '', redirectTo: '/AppComponent' },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
