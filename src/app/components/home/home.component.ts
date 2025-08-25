import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  placeholderItems = [
    {
      icon: '🎨',
      title: 'Creative Placeholder',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.'
    },
    {
      icon: '🌟',
      title: 'Stellar Content',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
      icon: '🚀',
      title: 'Rocket Powered',
      description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: '🎯',
      title: 'Target Achieved',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.'
    },
    {
      icon: '🌈',
      title: 'Rainbow Magic',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.'
    }
  ];
}
