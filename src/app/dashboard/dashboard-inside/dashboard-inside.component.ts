import {Component, OnInit, Attribute, Input} from '@angular/core';
import {SearchService} from "../../../app/core/services/search.service";

@Component({
  selector: 'app-dashboard-inside',
  templateUrl: './dashboard-inside.component.html',
  styleUrls: ['./dashboard-inside.component.scss']
})
export class DashboardInsideComponent implements OnInit {
  items = [];
  @Input() bereichvalue: string;

  constructor(private _service: SearchService) {

  }

  ngOnInit() {
    var isKeyWheather:boolean = this.bereichvalue == "weather";
    var countofData:number =  isKeyWheather ? 5 : 10;
    var result:string[] = new Array();
    var weatherarray:string[] = new Array();
    var listOfStackoverflow:string[] = new Array();

    this._service.search(this.bereichvalue).subscribe( res => {
      var items  = res['items']
        .sort(
          function(a, b) {
            a = new Date(a.creation_date.dateModified);
            b = new Date(b.creation_date.dateModified);
            return a.creation_date > b.creation_date ? -1 : a.creation_date < b.creation_date ? 1 : 0;
          }
        ).slice(0, countofData);

      items.forEach(function (value) {
        if(isKeyWheather) {
          listOfStackoverflow.push(value.title);
        }else {
          result.push(value.title);
        }
      });
      if(isKeyWheather){
        this._service.search("weatherdata").subscribe((data) => {
            for (var key in data) {
              var wetter:string = "Wetter am " + data[key].Datum + " "+ data[key]['Temp. A.'] + " / "+ data[key]['Temp. 3'] + " C°";
              weatherarray.push(wetter);
            }
            for(var i=0; i <= 4;i++) {
              result.push(listOfStackoverflow[i]);
              result.push(weatherarray[i]);
            }
          }
        );

      }

    }, (error)  => console.error(error));

    this.items = result;
  }


}
