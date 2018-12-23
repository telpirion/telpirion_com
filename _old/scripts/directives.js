/**
 * directives.js for telpirion.com.
 * Copyright 2017, Eric M. Schmidt. All rights reserved.
 *
 * Angular Directives docs: https://docs.angularjs.org/guide/directive
 */

// The directive for an expando control
function telExpandoDirective() {

    function link(scope, element, attrs) {
        var arrowDownUrl = "images/ic_arrow_drop_down_black_24dp_2x.png",
            arrowUpUrl = "images/ic_arrow_drop_up_black_24dp_2x.png";

        element.on("click", function (evt){
            var icon = element[0].querySelector(".icon"),
                content = element[0].querySelector(".content");

            if (content.classList.contains("hidden")) { // Expand
                icon.src = arrowUpUrl;

                content.classList.remove("hidden");
                content.classList.add("shown");

            } else { // Collapse
                icon.src = arrowDownUrl;

                content.classList.remove("shown");
                content.classList.add("hidden");
            }
        });
    }

    return {
        link: link,
        scope: {
            expando: "=item"
        },
        templateUrl: "templates/expando.html",
        transclude: true
    };
}

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
    .directive("telExpando", telExpandoDirective)
    .directive("telListView", telListViewDirective)
    .directive("telListViewItem", telListViewItemDirective);