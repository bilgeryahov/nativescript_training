import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Couchbase } from "nativescript-couchbase";
import { Location } from "@angular/common";
import * as Platform from "platform";
import * as Application from "application";
const jsSHA = require("jssha") ;

declare var android: any;
declare var java: any;
declare var NSBundle: any;

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

    public hashName (value: string): string {
        let shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update(value);
        return shaObj.getHash("HEX");
    }

    public navigateDetailsPage(fullName: string) {
        this.router.navigate(["details", fullName]);
    }

    public navigateCreatePage() {
        this.router.navigate(["create"]);
    }

    public getApplicationVersion () : string {
        if (Platform.isAndroid) { 
            let PackageManager = android.content.pm.PackageManager;
            let pkg = Application.android.context.getPackageManager()
                .getPackageInfo(Application.android.context.getPackageName(), PackageManager.GET_META_DATA);
            return java.lang.Integer.toString(pkg.versionCode);
        } else {
             let version = NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString");
             return version;
        }
    }

    private loadData () {
        this.people = [];
        let rows = this.database.executeQuery("people");
        rows.forEach(element => {
            this.people.push(element);
        });
    }
 }