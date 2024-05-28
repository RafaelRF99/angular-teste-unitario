import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      idade: [null, Validators.required],
    });
  }

  enviar() {
    console.log(this.form.value);
  }
}
