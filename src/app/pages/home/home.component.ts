import {Component, ViewChild } from '@angular/core';
import {AnimeResultsComponent} from '../../components/anime-results/anime-results.component'

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})

export class HomeComponent {
    @ViewChild(AnimeResultsComponent) animeResultsComponent: AnimeResultsComponent
    showResults = false
    onSearchByText(data) {
        this.showResults = true;
        this.animeResultsComponent.search = {
            text: data
        }
    }

}
