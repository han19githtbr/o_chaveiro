import { ServicosService } from './../../servicos.service';
import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/modules/shared/models/service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    FormActionsComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  @Input() cliente: any;
  @Output() close = new EventEmitter<void>();
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;
  public service: Service | undefined

  constructor( private servicoService: ServicosService ) {}

  ngOnInit() {
    this.loadServiceById();
  }

  loadServiceById() {
    const serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.servicoService.getServiceById(serviceId).subscribe(response => {
      this.service = response;
      console.log('Detalhes do serviço', this.service);
    })
  }

  closeModal() {
    this.close.emit();
  }
}
