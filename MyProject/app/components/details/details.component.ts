import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./details.component.html",
    styleUrls:["./details.component.css"]
})

export class DetailsComponent implements OnInit {

    private fullName: string;

    public constructor(private route: ActivatedRoute) {
        this.fullName = "";
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.fullName = params["name"];
        });  
    }
 }