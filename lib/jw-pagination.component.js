"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var paginate = require("jw-paginate");
var JwPaginationComponent = /** @class */ (function () {
    function JwPaginationComponent() {
        this.changePage = new core_1.EventEmitter(true);
        this.initialPage = 1;
        this.pageSize = 10;
        this.pager = {};
    }
    JwPaginationComponent.prototype.ngOnInit = function () {
        // set page if items array isn't empty
        if (this.items && this.items.length) {
            this.setPage(this.initialPage);
        }
    };
    JwPaginationComponent.prototype.ngOnChanges = function (changes) {
        // reset page if items array has changed
        if (changes.items.currentValue !== changes.items.previousValue) {
            this.setPage(this.initialPage);
        }
    };
    JwPaginationComponent.prototype.setPage = function (page) {
        // get new pager object for specified page
        this.pager = paginate(this.items.length, page, this.pageSize);
        // get new page of items from items array
        var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
        // call change page function in parent component
        this.changePage.emit(pageOfItems);
    };
    JwPaginationComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'jw-pagination',
                    template: "<ul *ngIf=\"pager.pages && pager.pages.length\" class=\"pagination\">\n  <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n      <a (click)=\"setPage(1)\">First</a>\n  </li>\n  <li [ngClass]=\"{disabled:pager.currentPage === 1}\">\n      <a (click)=\"setPage(pager.currentPage - 1)\">Previous</a>\n  </li>\n  <li *ngFor=\"let page of pager.pages\" [ngClass]=\"{active:pager.currentPage === page}\">\n      <a (click)=\"setPage(page)\">{{page}}</a>\n  </li>\n  <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n      <a (click)=\"setPage(pager.currentPage + 1)\">Next</a>\n  </li>\n  <li [ngClass]=\"{disabled:pager.currentPage === pager.totalPages}\">\n      <a (click)=\"setPage(pager.totalPages)\">Last</a>\n  </li>\n</ul>"
                },] },
    ];
    JwPaginationComponent.propDecorators = {
        items: [{ type: core_1.Input }],
        changePage: [{ type: core_1.Output }],
        initialPage: [{ type: core_1.Input }],
        pageSize: [{ type: core_1.Input }]
    };
    return JwPaginationComponent;
}());
exports.JwPaginationComponent = JwPaginationComponent;
