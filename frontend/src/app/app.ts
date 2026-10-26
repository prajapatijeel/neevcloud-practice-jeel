
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [RouterOutlet] ,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  apiStatus = 'Checking backend...';
  apiMessage = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    console.log('Angular component initialized');

    this.http.get<{
      status: string;
      message: string;
    }>(`${environment.apiUrl}/health`).subscribe({
      next: (response) => {
        console.log('Backend response received:', response);
        this.apiStatus = response.status;
        this.apiMessage = response.message;

        console.log('Updated status:', this.apiStatus);
        console.log('Updated message:', this.apiMessage);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Backend request failed:', error);
        this.apiStatus = 'error';
        this.apiMessage =
          'Could not connect to the backend. Check that NestJS is running and CORS is enabled.';
        console.error('Backend request failed:', error);
      }
    });
  }
}
