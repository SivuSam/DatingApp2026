import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http=inject(HttpClient);
  protected title='Dating App';
  protected members=signal<any>({})
  
  async ngOnInit(){
 this.http.get('https://localhost:5001/api/members').subscribe({
  next: response=> this.members.set(response),
  error: error=> console.log(error),
  complete: ()=> console.log('Completed the http request')
 })

}
  async getMembers(){
    try {
      return await lastValueFrom(this.http.get('https://localhost:5001/api/members'))
    } catch (error) {
      console.log(error)
      throw error
    }
  
 }

}

