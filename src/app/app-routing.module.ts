import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { 
  //   path: '',
  //   loadChildren: () => import('./modules/characters/characters-module.module').then(m => m.CharactersModuleModule)
  // }
  { 
    path: '',
    loadChildren: () => import('./modules/template/template.module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
