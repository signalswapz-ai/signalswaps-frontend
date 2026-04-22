import { AItrading } from '@/pages/service/aitrading';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-ai-trade-history',
  templateUrl: './ai-trade-history.html',
  styleUrl: './ai-trade-history.scss',
  imports: [CommonModule, TableModule]
})
export class AiTradeHistory {
  AItradeHistory: any[] = [];
  email: string = '';

  constructor(private aitrading: AItrading) { }
  ngOnInit() {
    this.getAItradeHistory();
  }

  fetchUserUserData() {
    const localData = localStorage.getItem('user');
    const userData = JSON.parse(localData || '{}');
    const user = userData?.data?.user || null;
    const userBalance = user?.balance || 0;
    this.email = user?.email || '';
    return userBalance;
  }

  getAItradeHistory() {
    this.fetchUserUserData();
    this.aitrading.getHistory(this.email).subscribe((res) => {
      this.AItradeHistory = res.data;
    });
  }
  ngOnDestroy() {

  }
}
