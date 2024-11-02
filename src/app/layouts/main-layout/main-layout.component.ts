import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importar módulos de NG-ZORRO
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzPopoverModule, // Asegúrate de incluir NzPopoverModule aquí
    NzButtonModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  isCollapsed = false;
  userName = 'Usuario';

  constructor(private router: Router) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = user.nombre || 'Usuario';
  }

  goToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
