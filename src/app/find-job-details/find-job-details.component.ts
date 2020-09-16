import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-find-job-details',
  templateUrl: './find-job-details.component.html',
  styleUrls: ['./find-job-details.component.css']
})
export class FindJobDetailsComponent implements OnInit {
  public resourceData: Array<any>;
  public servicesData: Array<any>;
  public id: string;

  public selectedCompany: any;

  constructor(
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute
  ) {
    this.resourceData = [
      {
        company_uuid: "CPPRM00000000000000",
        iconSrc: "https://patrikfreisner.github.io/primum_mainpage/white_logo.png",
        phone: "47 99919-6385",
        companyName: "MacMellis Informatica",
        quantityCount: "X X X X X",
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
        quantityCount: "X X X X",
        phone: "47 99919-6385",
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
        companyName: "Primum Tecnologia!",
        quantityCount: "X X X X",
        phone: "47 99919-6385",
        address: {
          street: "Rua da Mãe dina, N/A",
          city: "Jaragua do Sul",
          state: "SC"
        }
      }
    ]
    this.servicesData = [
      {
        deadline: "3d",
        delivery_tax: "7.50",
        details: "Detalhes da Requisição de Serviço",
        price: "150.50",
        priority: "Low",
        quality_count: 0,
        service_count: 0,
        service_type: "Celular",
        sm_uuid: "SMPRM0000000000000000",
        title: "Titulo da Requisição de Serviço",
        updated_at: "true"
      },
      {
        deadline: "1d",
        delivery_tax: "0",
        details: "Formatação completa de computador, backup + instalação de softwares basicos.",
        price: "95.90",
        priority: "Low",
        quality_count: 0,
        service_count: 0,
        service_type: "Celular",
        sm_uuid: "SMPRM0000000000000000",
        title: "Formatação de computador",
        updated_at: "true"
      }
    ]
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompanyInfo();
  }

  goBack(): void {
    // this.routerExtensions.back();
    this.routerExtensions.back();
  }

  getCompanyInfo() {
    this.resourceData.forEach(company => {
      if (company.company_uuid == this.id) {
        this.selectedCompany = company;
      }
    });
  }

}
