import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  form!: FormGroup;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.serverError = err.error?.message || 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }
}