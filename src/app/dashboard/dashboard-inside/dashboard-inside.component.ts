import {Component, OnInit, Attribute, Input} from '@angular/core';
import {SearchService} from "../../../app/core/services/search.service";
import {DashboardItem} from './dashboardItem';

@Component({
  selector: 'app-dashboard-inside',
  templateUrl: './dashboard-inside.component.html',
  styleUrls: ['./dashboard-inside.component.scss']
})
export class DashboardInsideComponent implements OnInit {
  //Gesamtergebnisse speichern für UI
  dashboardItems:Array<DashboardItem> = new Array<DashboardItem>() ;
  //Input von übergeordneten Component(Dashboard)
  @Input() dashboardArea: string;

  constructor(private service: SearchService) {

  }

  ngOnInit() {
    this.FillData4UI();

  }

  FillData4UI() : void {
    var isAreaWheater:boolean = this.dashboardArea == "weather";
    //Gesamt Ergebnisse zwischenspeichern
    var result:Array<DashboardItem> = new Array<DashboardItem>();

    //Über den jeweiligen Dashboard Bereich Susbscriben
    this.service.search(this.dashboardArea).subscribe( res => {
      var items  = res['items']
        .sort(
          function(a, b) {
            a = new Date(a.creation_date.dateModified);
            b = new Date(b.creation_date.dateModified);
            return a.creation_date > b.creation_date ? -1 : a.creation_date < b.creation_date ? 1 : 0;
          }
          //Array größe festlegen anhand des bereiches
        ).slice(0, isAreaWheater ? 5 : 10);

      var listOfweather:string[] = new Array<string>();//Wetterdaten zwieschenspeichern
      var listOfStackoverflow:Array<DashboardItem> = new Array<DashboardItem>();//Stackoverflow daten zwischenspeichern

      items.forEach(function (value) {
        if(isAreaWheater) {
          listOfStackoverflow.push(new DashboardItem(value.title, value.link));
        }else {
          result.push(new DashboardItem(value.title, value.link));
        }
      });

      if(isAreaWheater){
        //Daten aus Wetterdatenbank auslesen
        this.service.search("weatherdata").subscribe((data) => {
            for (var key in data) {
              listOfweather.push("Wetter am " + data[key].Datum + " "+ data[key]['Temp. A.'] + " / "+ data[key]['Temp. 3'] + " C°");
            }

            for(var i=0; i <= 4;i++) {
              // Wetterdaten von Stackoverflow und von Wetterdatenbank abwechselnd ins result zwischenspeichern
              result.push(new DashboardItem(listOfStackoverflow[i].title, listOfStackoverflow[i].link));
              result.push(new DashboardItem(listOfweather[i], ""));
            }
          }
        );

      }
      //Zwischengespeicherten result ins dashboarditems übergeben um im HTML zu verwenden.
      this.dashboardItems = result;

    }, (error)  => console.error(error));

  }


}
