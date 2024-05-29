import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { LivrosService } from './livros.service';

describe('LivrosService', () => {
  let service: LivrosService;
  let httpTestingController: HttpTestingController;
  let url: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LivrosService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3001';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar um get por id', () => {
    const id = 3;
    const resposta = {
      titulo: 'NA',
      autor: 'NA',
      lancamento: '2024',
      modelo: 'NA',
      edicao: 'NA',
    };

    service.getLivroId('3').subscribe((res) => {
      expect(res).toBe(resposta); // Verifica se a resposta é o mesmo da API
    });
    const req = httpTestingController.expectOne(`${url}/livro/${id}`); // Simula requisição

    expect(req.request.method).toBe('GET'); // Verifica metodo GET
    expect(req.request.url).toBe(`${url}/livro/${id}`); // Verifica se a url deu Match

    req.flush(resposta); // Simula uma resposta do servidor | Aciona o getLivroId
  });

  it('Deve realizar get', () => {
    const resposta = [
      {
        titulo: 'NA',
        autor: 'NA',
        lancamento: '2024',
        modelo: 'NA',
        edicao: 'NA',
      },
    ];

    service.getLivro().subscribe((res) => {
      expect(res).toBe(resposta); // Verifica se a resposta é o mesmo da API
    });

    const req = httpTestingController.expectOne(url); // Simula requisição

    req.flush(resposta); // Simula uma resposta do servidor | Aciona o getLivro

    expect(req.request.method).toBe('GET'); // Verifica metodo GET
    expect(req.request.url).toBe(url); // Verifica se a url deu Match
  });

  it('Deve dar erro na requisição', () => {
    service.getAll().subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne(url); // Simula requisição

    expect(req.request.method).toBe('GET'); // Verifica metodo GET
    expect(req.request.url).toBe(url); // Verifica se a url deu Match

    req.flush(500, {
      status: 500,
      statusText: 'Error 500',
    }); // Simula uma resposta do servidor
  });
});
