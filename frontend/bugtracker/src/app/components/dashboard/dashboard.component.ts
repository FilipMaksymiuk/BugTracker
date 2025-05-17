// dashboard.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timeFilter: string = 'Today';

  // Mock data for the dashboard
  bugSummary = {
    total: 248,
    open: 58,
    inProgress: 51,
    resolved: 39,
    closed: 100,
    critical: 16,
    high: 27,
    medium: 48,
    low: 57
  };

  userAssignments = [
    { name: 'john_doe', tickets: 45 },
    { name: 'jane_doe', tickets: 38 },
    { name: 'alice_smith', tickets: 31 },
    { name: 'bob_johnson', tickets: 27 },
    { name: 'carol_white', tickets: 22 }
  ];

  categoryData = [
    { name: 'UI/UX', tickets: 56 },
    { name: 'API', tickets: 42 },
    { name: 'Database', tickets: 38 },
    { name: 'Authentication', tickets: 29 },
    { name: 'Performance', tickets: 23 }
  ];

  recentActivity = [
    { id: 1, action: 'Created bug report', title: 'Login Issue', user: 'john_doe', time: '10 min ago' },
    { id: 2, action: 'Resolved bug', title: 'Page Crash', user: 'jane_doe', time: '35 min ago' },
    { id: 3, action: 'Commented on', title: 'API Timeout', user: 'alice_smith', time: '1 hour ago' },
    { id: 4, action: 'Reassigned bug', title: 'Memory Leak', user: 'bob_johnson', time: '2 hours ago' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Nothing needed here - CSS handles animations now
  }

  setTimeFilter(filter: string): void {
    this.timeFilter = filter;

    // Trigger CSS animation reset by forcing a reflow
    // This will be done by adding and removing a class to the body
    document.body.classList.add('reset-animations');
    setTimeout(() => {
      document.body.classList.remove('reset-animations');
    }, 10);
  }

  // Calculate percentage for progress bars and charts
  getPercentage(value: number): number {
    return (value / this.bugSummary.total) * 100;
  }

  // Calculate the stroke-dasharray value for SVG circle
  getCircleStrokeDashValue(value: number): number {
    const circumference = 2 * Math.PI * 40; // 2πr where r=40
    return (value / this.bugSummary.total) * circumference;
  }

  // Generate random start values for animations
  getRandomStartValue(targetValue: number): number {
    // Generate a random number between 20% and 60% of the target value
    const minValue = Math.floor(targetValue * 0.2);
    const maxValue = Math.floor(targetValue * 0.6);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
}
