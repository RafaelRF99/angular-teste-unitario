import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  form: FormGroup;

  constructor(private formService: FormularioService) {
    this.form = this.formService.form;
  }

  enviar() {
    if (this.form.valid) {
      this.formService.enviar();
    }
  }
}
