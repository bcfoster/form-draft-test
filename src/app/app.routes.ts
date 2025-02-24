import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ContactFormComponent } from './forms/contact/contact-form.component';
import { EmployerFormComponent } from './forms/employer/employer-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'employer', component: EmployerFormComponent },
];
