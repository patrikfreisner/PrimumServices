import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  public resourceData: Array<any>;
  constructor(
    private routerExtensions: RouterExtensions
  ) {
    this.resourceData = [
      {
        company_uuid: "CPPRM00000000000000",
        iconSrc: "https://patrikfreisner.github.io/primum_mainpage/white_logo.png",
        companyName: "MacMellis Informatica",
        quantityCount : "X X X X X",
        address: {
          street: "Rua 77 na domingos, 1120",
          city: "Jaragua do Sul",
          state: "SC"
        }
      },
      {
        company_uuid: "CPPRM00000000000001",
        iconSrc: "https://img1.gratispng.com/20180713/hxu/kisspng-green-cleaning-cleaner-logo-environmentally-friend-clean-logo-5b4827b9d7e137.9858876115314554178843.jpg",
        companyName: "Geovana Serviços de Limpeza",
        quantityCount : "X X X X",
        address: {
          street: "Rua da Mãe dina, N/A",
          city: "Jaragua do Sul",
          state: "SC"
        }
      },
      {},
      { 
        company_uuid: "CPPRM00000000000003",
        iconSrc: "https://raw.githubusercontent.com/patrikfreisner/PrimumPageLive/master/assets/LOGO_PRIMUM_BLACK.png", 
        companyName: "Primum Tecnologia!" 
      }
    ]
  }

  ngOnInit() {
  }

  public close(result: string) {
  }

  goBack(): void {
    this.routerExtensions.back();
    // this.routerExtensions.navigate(["/home"]);
  }

  navigateTo(string) {
    this.routerExtensions.navigate(["/services/"+string]);
  }

}
