///<reference path="typings/jquery/jquery.d.ts"/>
var about;
(function (about) {
    window.onload = function () {
        $(".expando").click(toggleSection);
    };
    function toggleSection(evt) {
        var heading = evt.target.nodeName.toLowerCase() == "span" ?
            evt.target.parentElement : evt.target;
        var sectionContent = heading.nextElementSibling;
        var nextSection = sectionContent.parentElement.nextElementSibling;
        if (sectionContent.classList.contains("hidden")) {
            $(heading).children(".icon").text("-");
            var p = WinJS.UI.Animation.createExpandAnimation(sectionContent, nextSection);
            sectionContent.classList.remove("hidden");
            sectionContent.classList.add("shown");
            p.execute();
        }
        else {
            $(heading).children(".icon").text("+");
            var p = WinJS.UI.Animation.createCollapseAnimation(sectionContent, nextSection);
            sectionContent.classList.remove("shown");
            sectionContent.classList.add("hidden");
            p.execute();
        }
    }
})(about || (about = {}));
//# sourceMappingURL=about.js.map