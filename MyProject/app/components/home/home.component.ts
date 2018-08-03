import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:["./home.component.css"]
})

export class HomeComponent implements OnInit {

    public people: Array<any>;

    public constructor() {
        this.people = [];
    }

    public ngOnInit(): void {
        this.people.push({
            "firstName": "Bilger",
            "lastName": "Yahov"
        });
        this.people.push({
            "firstName": "Ilker",
            "lastName": "Yahov"
        });
    }
 }