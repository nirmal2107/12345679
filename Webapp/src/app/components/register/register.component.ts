import { Component,inject,ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,MatButtonModule,CommonModule,FormsModule,],
  templateUrl:'./register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class RegisterComponent {
     formbuilder=inject(FormBuilder);
     authService=inject(AuthService);
     errorMessage: string = '';
     routerr=inject(Router);
     registerForm=this.formbuilder.group({
          name:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.minLength(5)]]
  })
    constructor(private http: HttpClient, private router: Router) {}register() { 
           let user=this.registerForm.value;
           this.authService.register(user.name!,user.email!,user.password!).subscribe({
           next: (response) => {
           this.router.navigate(['/login']); 
    },
    error: (error) => {
    if (error.status === 400) {
    alert(error.error.message || 'An error occurred. Please try again.');
    this.router.navigate(['/login']);
  } else {
    alert( 'Server error. Please try again later.');
  }
}
});


}
}

  

