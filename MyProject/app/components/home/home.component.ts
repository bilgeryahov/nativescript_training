import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Couchbase } from "nativescript-couchbase";
import { Location } from "@angular/common";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:["./home.component.css"]
})

export class HomeComponent implements OnInit {

    private people: Array<any>;
    private database: any;

    public constructor(private router: Router, private location: Location) {
        this.people = [];
        this.database = new Couchbase("peopledatabase");
        this.database.createView("people", "1", (document, emitter) => {
            emitter.emit(document._id, document);
        });
    }

    public ngOnInit(): void {
        this.location.subscribe(() => {
           this.loadData();
        });
        this.loadData();
    }

    private loadData () {
        this.people = [];
        let rows = this.database.executeQuery("people");
        rows.forEach(element => {
            this.people.push(element);
        });
    }

    public navigateDetailsPage(fullName: string) {
        this.router.navigate(["details", fullName]);
    }

    public navigateCreatePage() {
        this.router.navigate(["create"]);
    }
 }