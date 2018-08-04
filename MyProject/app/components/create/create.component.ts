import { Component, OnInit } from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { Location } from "@angular/common";

@Component({
    selector: "ns-create",
    moduleId: module.id,
    templateUrl: "./create.component.html",
    styleUrls:["./create.component.css"]
})

export class CreateComponent implements OnInit {

    private firstName: string;
    private lastName: string;
    private storage: any;

    public constructor(private location: Location) {
        this.firstName = "";
        this.lastName = "";
        this.storage = [];
    }

    public ngOnInit(): void {
        this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
    }

    public save() {
        if(this.firstName && this.lastName) {
            this.storage.push({
                firstName: this.firstName,
                lastName: this.lastName
            });
            ApplicationSettings.setString("data", JSON.stringify(this.storage));
            this.location.back();
        }
    }
 }