import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('tagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;

    // Enviamos la palabra que queremos buscar en el metodo del servicio inyectado
    const toSearch = this.gifService.searchAndAddTag(newTag);
    console.log(toSearch);
    // Limpiamos el input
    this.tagInput.nativeElement.value = '';
  }
}
