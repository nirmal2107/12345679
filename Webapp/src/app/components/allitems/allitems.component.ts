
import { Component ,OnInit} from '@angular/core';
import { AllItemsService } from '../../services/allitems.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-allitems',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './allitems.component.html',
  styleUrl: './allitems.component.scss'
})
export class AllitemsComponent implements OnInit{
    allItems: any[] = [];  
  loading: boolean = false; 
  errorMessage: string = '';  
  filters = { 
    searchTerm: '',
    exactMatch: false,
    date: '',
  };
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  constructor(private allItemsService: AllItemsService, private router: Router) {}
  ngOnInit(): void {
    this.fetchAllItems();  
  }
  fetchAllItems(): void {
    this.loading = true; 
    this.allItemsService.getAllItems(this.filters,this.currentPage, this.pageSize).subscribe(
      (response:any) => {
        this.allItems = response.data;
        this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        this.loading = false; 
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load items. Please try again later.'; 
        console.error('Error:', error);  
      }
    );
  }
  onSearchChange(): void {
    this.fetchAllItems();  
  }
  onExactMatchToggle(): void {
    this.fetchAllItems(); 
  }
  onDateChange(): void {
    this.fetchAllItems();
  }
  onItemClick(itemId: string): void {
    this.router.navigate([`/items/${itemId}`]);  
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.fetchAllItems();
  }



  onTradeClick(item: any): void {
    this.router.navigate(['/propose'], { state: { selectedItem: item } });
    localStorage.setItem('selectedItem', JSON.stringify(item));
  }

  
}