import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  menuItems: any[];

  constructor(
    private siderbarServices: SidebarService
  ) {
    this.menuItems = this.siderbarServices.menu;
  }

  ngAfterViewInit(): void {
    this.initTreeView();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initTreeView();
    });
  }

  private initTreeView(): void {
    if ($ && $.fn && $.fn.Treeview) {
      $('[data-widget="treeview"]').Treeview('init');
    }
  }

  logout(): void {
    location.href = 'login';
  }

}
