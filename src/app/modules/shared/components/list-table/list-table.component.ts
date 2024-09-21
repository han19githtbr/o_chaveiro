// src/app/modules/shared/components/list-table/list-table.component.ts
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayColumns, TypeColumn } from './models/display-columns.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import ButtonComponent from '../button/button.component';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  standalone: true,
  imports: [MaterialModule, SearchComponent, CommonModule, ButtonComponent],
})
export default class ListTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  public tableDataSource!: MatTableDataSource<any>;
  public displayColumnsString: string[] = [];
  public textSearch!: string;
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public TypeColumn: typeof TypeColumn = TypeColumn;

  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() public getStatusLabel!: (status: string) => string;

  @Input() public displayedColumns: DisplayColumns[] = [];
  @Input() public checkCustomColors?: { [key: string]: string };
  @Input() public listTable: any[] = [];
  @Input() public routerLinkAction!: string;
  @Input() public useButton!: boolean;
  @Input() public useCardButton!: boolean;
  @Input() public useSearch: boolean = true;
  @Input() public buttonLabel!: string;
  @Input() public totalItems!: number;

  @Output() public clickRowEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public clickButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listTable']) {
      const newValue = changes['listTable'].currentValue;
      if (Array.isArray(newValue)) {
        this.tableDataSource = new MatTableDataSource<any>(newValue);
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
      } else {
        console.error('listTable is not an array', newValue);
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.sort) {
      this.tableDataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.tableDataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    }
  }

  public ngOnInit(): void {
    if (Array.isArray(this.listTable)) {
      this.tableDataSource = new MatTableDataSource<any>(this.listTable);
    } else {
      console.error('listTable is not an array', this.listTable);
    }

    this.tableDataSource.filterPredicate = (
      data: any,
      filter: string
    ): boolean => {
      const textToSearch: string = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          return `${currentTerm}: ${(data as { [key: string]: any })[key]}`;
        })
        .toLowerCase();

      const transformedFilter: string = filter?.trim()?.toLowerCase();

      return textToSearch.indexOf(transformedFilter) != -1;
    };

    this.displayColumnsString = this.displayedColumns.map(
      (displayColumn: DisplayColumns) => displayColumn.key
    );

    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) =>
        this.isMobile$.next(state.matches)
      );
  }

  public search(textSearch: string): void {
    this.tableDataSource.filter = textSearch?.trim()?.toLowerCase();
  }

  public onPageEvent(page: PageEvent): void {
    console.log(page);
    this.onPageChange.emit(page);
  }
}
