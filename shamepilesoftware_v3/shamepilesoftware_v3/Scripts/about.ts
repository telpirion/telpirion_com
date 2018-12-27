///<reference path="typings/jquery/jquery.d.ts"/>
module about {
    declare var WinJS;

    window.onload = () => {
        $(".expando").click(toggleSection);
    }

    function toggleSection(evt: Event): void {
        var heading: HTMLElement = (<HTMLElement>evt.target).nodeName.toLowerCase() == "span" ?
            (<HTMLElement>evt.target).parentElement : (<HTMLElement>evt.target);
        
        var sectionContent: HTMLElement = <HTMLElement>heading.nextElementSibling;
        var nextSection: HTMLElement = <HTMLElement>sectionContent.parentElement.nextElementSibling;

        if (sectionContent.classList.contains("hidden")) { // Expand
            $(heading).children(".icon").text("-");

            var p = WinJS.UI.Animation.createExpandAnimation(sectionContent, nextSection);
            sectionContent.classList.remove("hidden");
            sectionContent.classList.add("shown");
            p.execute();

        } else { // Collapse
            $(heading).children(".icon").text("+");

            var p = WinJS.UI.Animation.createCollapseAnimation(sectionContent, nextSection);
            sectionContent.classList.remove("shown");
            sectionContent.classList.add("hidden");
            p.execute();
        }
    }
}