import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { AppInjector } from '../../app-injector.service';
import { GlobalMessageService } from '../../shared/services/global-message.service';
import { BpiDetail, Chart, CurrencySymbol, FormattedCurrency, History, RawCurrency, Time } from '../../shared/models/currency';
import { interval, map, Subscription } from 'rxjs';
import { generateColors } from '../../shared/utils/chartData';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { StorageInformation } from '../../shared/storage-information';

@Component({
  selector: 'app-app-main-page',
  templateUrl: './app-main-page.component.html',
  styleUrls: ['./app-main-page.component.scss']
})
export class AppMainPageComponent implements OnInit, OnDestroy {
 // Loading variable
  loading: boolean;
  // Http requests service
  catalogService: CatalogService;
  // Data gotten from api
  currencyData: FormattedCurrency;
  // Chart config
  chartOptions: any;
  chartData: Chart = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      }
    ]
  };
  history: History[] = [];
  
  // Subscription config (30000 ms = 30 seconds)
  intervalTime: number = 30000;
  subscription: Subscription;
  storageService: LocalStorageService;
  currencySymbol = CurrencySymbol;
  
  constructor(
    private readonly globalMessageService: GlobalMessageService,
    private datePipe: DatePipe
  ) {
    this.catalogService = AppInjector.injector.get(CatalogService);
    this.storageService = AppInjector.injector.get(LocalStorageService);
    // Set subscription accumulator
    this.subscription = new Subscription();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    if (this.subscription) this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    if(this.storageService.retrieve(StorageInformation.history))
      this.history = this.storageService.retrieve(StorageInformation.history);
    this.loadChart();
    this.loadListener();
  }
  
  loadListener(): void {
    this.subscription.add(
      // Set an observable to get data every 30 seconds
     interval(this.intervalTime).subscribe(() => this.loadChart())
    );
  }
  
  loadChart(): void {
    this.loading = true;
    this.subscription.add(
      this.catalogService.getOneByName('currentprice.json')
      .pipe(
        // Mapping bpi from object to array
        map((res: RawCurrency): FormattedCurrency => {
          return {
            time: res.time,
            disclaimer: res.disclaimer,
            chartName: res.chartName,
            bpi: Object.values(res.bpi)
          }
        }),
      )
      .subscribe({
          next: (res: FormattedCurrency) => {
            this.currencyData = res;
            // Setting chart options
            this.chartOptions = this.loadChartOptions();
            // Setting random colors for chart
            const chartColors = generateColors(this.currencyData.bpi?.length ?? 0);
            //Add to history (30 segs -> 2 per minute * 60 min = 120 maximum records in an hour)
            if(this.history.length < 120) this.loadHistory();
            else {
              this.history.pop();
              this.history.unshift({
                time: this.currencyData.time,
                bpi: this.currencyData.bpi
              });
              this.storageService.store(StorageInformation.history, this.history);
            }
            // Setting chart labels and datasets to follow model
            this.chartData.labels = this.currencyData.bpi.map((bpi: BpiDetail)  => bpi.code);
            this.chartData.datasets = [
              {
                data: this.currencyData.bpi.map((bpi:BpiDetail)  => bpi.rate_float),
                backgroundColor: this.currencyData.bpi.map((bpi, i)  => chartColors[i])
              }
            ];
            this.loading = false;
          },
          error: () => {
            this.showError();
            this.loading = false;
          },
        })
    );
  }
  
  loadHistory(): void {
    // for(let i = 0; this.history.length < 120; i++) {
    //   this.history.push({
    //     time: this.currencyData.time,
    //     bpi: this.currencyData.bpi
    //   });
    // }
    this.history.unshift({
      time: this.currencyData.time,
      bpi: this.currencyData.bpi
    });
    this.storageService.store(StorageInformation.history, this.history);
  }
  
  showError(): void {
    this.globalMessageService.setPayload(
      {
        type:'error',
        title: 'Error',
        body: 'An error has occurred while loading data. Please try again later.'
      }
    );
  }
  
  loadChartOptions(): any {
    // Chart options following https://www.chartjs.org/docs/latest/configuration/
    return {
      tooltips: {
        titleFontSize: 10,
        bodyFontSize: 10,
      },
      plugins: {
        subtitle:{
          display: true,
          font:{ size: 10 },
          padding: { bottom: 10 },
          text:
            `Last update: ${this.datePipe.transform(this.currencyData.time.updatedISO,'dd/MM/yyyy hh:mm a') ?? new Date()}`
        },
        title: {
          display: true,
          text: this.currencyData.chartName ?? 'Valor de BTC',
          font:{ size: 16 },
          position: 'top',
          align: 'center',
          color: '#44486D',
        },
        legend: {
          position: 'bottom',
          display: true,
          align: 'center',
          labels: {
            align: 'center',
            color: '#44486D',
            font: { size: 9 },
            usePointStyle: true,
          },
          // Enable and disable pointer on legend
          onHover: function (e) {
            e.native.target.style.cursor = 'pointer';
          },
          onLeave: function (e) {
            e.native.target.style.cursor = 'default';
          },
        },
        tooltip: {
          // Show round tooltip instead of square
          usePointStyle: true,
          bodyFont: { size: 10 },
          callbacks: {
            // Show currency symbol
            label: ({dataset, parsed, label}) => {
              let index = 0;
              for (let i = 0; i < dataset.data.length; i++)
                if (parsed == dataset.data[i]) index = i;
              return `${label}: ${CurrencySymbol[this.currencyData?.bpi?.[index]?.symbol]}${parsed}`;
            },
          },
        },
      },
    };
  }
}

