import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioComponent],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario deve ser invalido', () => {
    const result = component.form.valid;

    expect(result).toBeFalse();
  });

  it('Formulario deve ser valido', () => {
    component.form.controls['nome'].setValue('Rafael');
    component.form.controls['idade'].setValue('12');

    const result = component.form.valid;

    expect(result).toBeTrue();
  });

  it('Botão desativado caso formulario invalido', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    component.form.controls['nome'].setValue('');
    component.form.controls['idade'].setValue('');
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();
  });

  it('Botão ativado caso formulario valido', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    component.form.controls['nome'].setValue('Rafael');
    component.form.controls['idade'].setValue('25');
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('Campo erro deve exibir caso informações erradas', () => {
    component.form.controls['nome'].markAsTouched();
    component.form.controls['idade'].markAsTouched();
    fixture.detectChanges();

    const nomeError = fixture.debugElement.query(
      By.css('mat-form-field:nth-child(1) mat-error')
    );
    const idadeError = fixture.debugElement.query(
      By.css('mat-form-field:nth-child(2) mat-error')
    );

    expect(nomeError.nativeElement.textContent.trim()).toBe(
      '*Campo obrigatório'
    );
    expect(idadeError.nativeElement.textContent.trim()).toBe(
      '*Campo obrigatório'
    );
  });
});
