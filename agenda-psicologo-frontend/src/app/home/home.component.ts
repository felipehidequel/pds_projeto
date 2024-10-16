import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardsInfosComponent } from '../cards-infos/cards-infos.component';
import { AtendimentosComponent } from '../atendimentos/atendimentos.component';
import { HistoricoAtendimentosComponent } from '../historico-atendimentos/historico-atendimentos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CardsInfosComponent, AtendimentosComponent, HistoricoAtendimentosComponent],
  templateUrl: './home.component.html',  // Verifique se o arquivo está no mesmo diretório
  styleUrls: ['./home.component.scss']     // Verifique se o arquivo está no mesmo diretório
})

export class HomeComponent implements OnInit {
  atendimentos: any[] = [];
  psicologo: any = {}; // Propriedade para armazenar os dados do psicólogo

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAtendimentos().subscribe(
      (data) => {
        this.atendimentos = data; // Preenche a propriedade com os dados da API
      },
      (error) => {
        console.error('Erro ao obter atendimentos:', error);
      }
    );
    

    this.getPsicologo().subscribe(
      (data) => {
        this.psicologo = data[0]; // Acessa o primeiro elemento do array
      },
      (error) => {
        console.error('Erro ao obter psicólogo:', error);
      }
    );
  }

  getAtendimentos(): Observable<any> {
    const apiUrl = 'http://127.0.0.1:5000/consulta';
    return this.http.get<any>(apiUrl);
  }

  getPsicologo(): Observable<any> {
    const apiUrl = 'http://127.0.0.1:5000/psicologo';
    return this.http.get<any>(apiUrl);
  }
}