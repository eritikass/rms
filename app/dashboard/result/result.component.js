"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ResultComponent = (function () {
    function ResultComponent(http) {
        this.http = http;
        this.counties = [];
        this.data = [
            { id: 0, name: "Harju", match: 30 },
            { id: 1, name: "Hiiu", match: 30 },
            { id: 2, name: "Ida-Viru", match: 30 },
            { id: 3, name: "Jõgeva", match: 30 },
            { id: 4, name: "Järva", match: 30 },
            { id: 5, name: "Lääne", match: 30 },
            { id: 6, name: "Lääne-Viru", match: 30 },
            { id: 7, name: "Põlva", match: 30 },
            { id: 8, name: "Pärnu", match: 30 },
            { id: 9, name: "Rapla", match: 30 },
            { id: 10, name: "Saare", match: 30 },
            { id: 11, name: "Tartu", match: 30 },
            { id: 12, name: "Valga", match: 30 },
            { id: 13, name: "Viljandi", match: 30 },
            { id: 14, name: "Võru", match: 30 },
        ];
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.returnMap();
        // this.counties = [
        //     {id:0, name:"Harju"},
        //     {id:1, name:"Hiiu"},
        //     {id:2, name:"Ida-Viru"},
        //     {id:3, name:"Jõgeva"},
        //     {id:4, name:"Järva"},
        //     {id:5, name:"Lääne"},
        //     {id:6, name:"Lääne-Viru"},
        //     {id:7, name:"Põlva"},
        //     {id:8, name:"Pärnu"},
        //     {id:9, name:"Rapla"},
        //     {id:10, name:"Saare"},
        //     {id:11, name:"Tartu"},
        //     {id:12, name:"Valga"},
        //     {id:13, name:"Viljandi"},
        //     {id:14, name:"Võru"},
        // ]
        // setTimeout(function() {
        //     for(let county of this.counties ){
        //         this.setMatch(county, 50)
        //     }
        // }.bind(this), 1000);
    };
    ResultComponent.prototype.setMatch = function (county, num) {
        var id = $('#' + county.name);
        id.css("width", num + "%");
    };
    ResultComponent.prototype.returnMap = function () {
        //$(document).ready(function() {
        $.get('https://test.n8rth.online/api/aggr/offers/county', function (data) {
            console.log(AmCharts);
            console.log(TweenMax);
            var map;
            var mapping = {
                // map => tootukassa
                "Viljandimaa": "Viljandi maakond",
                "Põlvamaa": "Põlva maakond",
                "Ida-Virumaa": "Ida-Viru maakond",
                "Tartumaa": "Tartu maakond",
                "Järvamaa": "Järva maakond",
                "Võrumaa": "Võru maakond",
                "Pärnumaa": "Pärnu maakond",
                "Lääne-Virumaa": "Lääne-Viru maakond",
                "Hiiumaa": "Hiiu maakond",
                "Läänemaa": "Lääne maakond",
                "Valgamaa": "Valga maakond",
                "Jõgevamaa": "Jõgeva maakond",
                "Raplamaa": "Rapla maakond",
                "Saaremaa": "Saare maakond",
                "Harjumaa": "Harju maakond"
            };
            var total = 0;
            var max = 0;
            var str = '';
            var listValues = {};
            $.each(data, function (i, e) {
                if (e._id.county == 'unknown') {
                    return;
                }
                max = Math.max(max, e.count);
                total += e.count;
                str += e._id.county + "\n";
            });
            // calculate which map to be used
            var currentMap = "estoniaHigh";
            var titles = {
                "text": "Estonia"
            };
            AmCharts.makeChart("chartdiv", {
                "type": "map",
                "theme": "light",
                "colorSteps": 10,
                "dataProvider": {
                    "mapURL": "/assets/img/" + currentMap + ".svg",
                    "getAreasFromMap": true,
                    "zoomLevel": 0.9,
                    "areas": []
                },
                "areasSettings": {
                    "autoZoom": true,
                    "balloonText": "[[title]]: <strong>[[value]]</strong>"
                },
                "zoomControl": {
                    "minZoomLevel": 0.9
                },
                "titles": titles,
                "listeners": [{
                        "event": "init",
                        "method": updateHeatmap
                    }]
            });
            function updateHeatmap(event) {
                var map = event.chart;
                if (map.dataGenerated)
                    return;
                if (map.dataProvider.areas.length === 0) {
                    setTimeout(updateHeatmap, 100);
                    return;
                }
                var str = '';
                for (var i = 0; i < map.dataProvider.areas.length; i++) {
                    var c = map.dataProvider.areas[i].enTitle;
                    map.dataProvider.areas[i].value = 0;
                    $.each(data, function (i2, e) {
                        if (e._id.county != mapping[c] || !e.count) {
                            return;
                        }
                        map.dataProvider.areas[i].value = e.count;
                    });
                    str += map.dataProvider.areas[i].enTitle + "\n";
                }
                map.dataGenerated = true;
                map.validateNow();
                //map.dataProvider.areas[1].value = 500;
                map.dataGenerated = true;
                map.validateNow();
            }
        });
    };
    return ResultComponent;
}());
ResultComponent = __decorate([
    core_1.Component({
        selector: 'result-cmp',
        moduleId: module.id,
        templateUrl: 'result.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ResultComponent);
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map