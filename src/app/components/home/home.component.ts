import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      icon: '💱',
      title: 'Daily Updated Exchange Rates (WIP)',
      description: 'Get the most current exchange rates updated daily from the European Central Bank.'
    },
    {
      icon: '🌍',
      title: '30 Major World Currencies (WIP)',
      description: 'Convert between all major world currencies including USD, EUR, GBP, JPY, and other ECB-tracked currencies.'
    },
    {
      icon: '🔄',
      title: 'Instant Conversion (WIP)',
      description: 'Lightning-fast currency calculations with swap functionality and popular conversion shortcuts.'
    },
    {
      icon: '📊',
      title: 'Exchange Rate History (WIP)',
      description: 'View detailed exchange rate tables and track currency trends with our comprehensive data display.'
    },
    {
      icon: '📈',
      title: 'Interactive Currency Graphs (WIP)',
      description: 'Visualize currency trends with beautiful interactive charts. Select any currency pair and date range to see historical exchange rate patterns.'
    }
  ];
}
