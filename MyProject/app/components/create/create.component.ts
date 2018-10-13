import { Component, OnInit } from "@angular/core";
import { Couchbase } from "nativescript-couchbase";
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
    private database: any;

    public constructor(private location: Location) {
        this.firstName = "";
        this.lastName = "";
        this.database = new Couchbase("peopledatabase");
    }

    public ngOnInit(): void { }

    public save() {
        if(this.firstName && this.lastName) {
            this.database.createDocument({
                firstName: this.firstName,
                lastName: this.lastName
            });
            this.location.back();
        }
    }
 }