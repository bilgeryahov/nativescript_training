import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as ApplicationSettings from "application-settings";
import { Location } from "@angular/common";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:["./home.component.css"]
})

export class HomeComponent implements OnInit {

    private people: Array<any>;
    private storage: any;

    public constructor(private router: Router, private location: Location) {
        this.people = [];
        this.storage = [];
    }

    public ngOnInit(): void {
        this.location.subscribe(() => {
            this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
            this.people = this.storage;
        });
        this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
        this.people = this.storage;
    }

    public navigateDetailsPage(fullName: string) {
        this.router.navigate(["details", fullName]);
    }

    public navigateCreatePage() {
        this.router.navigate(["create"]);
    }
 }