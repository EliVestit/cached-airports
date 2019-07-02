import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "cached-airports";
  countriesList: string[];
  private jsonURL = "https://restcountries.eu/rest/v2/all";
  status: string = "loading";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAirports();
  }

  getAirports() {
    this.http
      .get(this.jsonURL)
      .toPromise()
      .then((res: any[]) => {
        this.countriesList = res.map(country => country.name);
        console.log(this.countriesList);
        this.status = "success";
      })
      .catch(error => {
        this.countriesList = [];
        this.status = "error";
      });
  }
}
