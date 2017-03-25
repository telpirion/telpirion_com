/*
* directives.js for telpirion.com.
* Copyright 2017, Eric M. Schmidt. All rights reserved.
*/

// Directive for list view control.
function telListViewDirective() {
    return {
        templateUrl: "templates/list-view.html",
        scope: {
            list: "=telList",
            'click': '&onClick'
        }
    };
}

// Directive for list view item control.
function telListViewItemDirective() {
    return {
            templateUrl: "templates/list-view-item.html",
            scope: {
                item: "=telItem",
                'click': "&click"
            }
        };
}

telpirionApp
    .directive("telListView", telListViewDirective)
    .directive("telListViewItem", telListViewItemDirective);