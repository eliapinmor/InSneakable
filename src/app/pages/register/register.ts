import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  form!: FormGroup;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group(
      {
        full_name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
      },
      { validators: confirmPasswordValidator },
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.serverError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { full_name, email, password } = this.form.value;

    this.auth.register({ full_name, email, password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.serverError = err.error?.message || 'Error al crear la cuenta. Inténtalo de nuevo.';
      },
    });
  }
}

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const form = control as FormGroup;
  const password = form.get('password')?.value;
  const confirm = form.get('confirm_password')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}