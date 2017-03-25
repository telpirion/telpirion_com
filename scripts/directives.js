/**
 * directives.js for telpirion.com.
 * Copyright 2017, Eric M. Schmidt. All rights reserved.
 *
 * Directives docs: https://docs.angularjs.org/guide/directive
 */

// The directive for list view control.
function telListViewDirective() {
    return {
        templateUrl: "templates/list-view.html",
        scope: {
            list: "=telList",
            'click': '&onClick'
        }
    };
}

// The directive for list view item control.
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