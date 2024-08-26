import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { StorageService } from 'src/app/modules/core/auth/storage.service';
import { UpdateRegisterDto } from '../../models/register.dto';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user: UpdateRegisterDto | null = null;

  constructor(private storageService: StorageService) {}


  ngOnInit(): void {
    this.user = this.storageService.getUserDetails() as UpdateRegisterDto;
    console.log(this.user);
  }

}
