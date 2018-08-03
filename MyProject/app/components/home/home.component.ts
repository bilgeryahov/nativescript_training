import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:["./home.component.css"]
})

export class HomeComponent implements OnInit {

    private people: Array<any>;

    public constructor(private router: Router) {
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

    public navigateDetailsPage(fullName: string) {
        this.router.navigate(["details", fullName]);
    }
 }