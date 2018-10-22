import { Database } from "../../providers/database/database";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
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

    public constructor(private router: Router, private location: Location, private database: Database, private http: Http) {
        this.people = [];
    }

    public ngOnInit(): void {
        this.location.subscribe(() => {
           this.loadData();
           this.makeRemoteRequest();
        });
        this.loadData();
        this.makeRemoteRequest();
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
        let rows = this.database.getStorage().executeQuery("people");
        rows.forEach(element => {
            this.people.push(element);
        });
    }

    private makeRemoteRequest () {
        let headers = new Headers( { "Content-Type": "application/json" } );
        let requestOptions = new RequestOptions( { headers: headers } );
        this.http.post("https://httpbin.org/post", JSON.stringify({
            firstName: "Remote",
            lastName: "Request"
        }), requestOptions)
            .map(result => result.json())
            .do(result => console.log(JSON.stringify(result)))
            .subscribe(result => {
                this.people.push(result.json);
            }, error => {
                console.log(error);
            });
    }
 }