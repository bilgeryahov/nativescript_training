import { Database } from "../../providers/database/database";
import { Component, OnInit } from "@angular/core";
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

    public constructor(private location: Location, private database: Database) {
        this.firstName = "";
        this.lastName = "";
    }

    public ngOnInit(): void { }

    public save() {
        if(this.firstName && this.lastName) {
            this.database.getStorage().createDocument({
                firstName: this.firstName,
                lastName: this.lastName
            });
            this.location.back();
        }
    }
 }