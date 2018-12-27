using System.Web;
using System.Web.Optimization;

namespace shamepilesoftware_v3
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/winjs-js").
                Include("~/Scripts/winjs/WinJS.js"));

            bundles.Add(new StyleBundle("~/bundles/winjs-css").Include(
                    "~/Content/winjs/ui-dark.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular-winjs").Include(
                "~/Scripts/winjs/angular-winjs.js"));

            bundles.Add(new ScriptBundle("~/bundles/vikings-js").Include(
                "~/Scripts/Vikings/game.js",
                "~/Scripts/dom.js",
                "~/Scripts/debug.js",
                "~/Scripts/loader.js"));

            bundles.Add(new StyleBundle("~/bundles/vikings-css").Include(
                "~/Content/Vikings/game.css"));

            bundles.Add(new ScriptBundle("~/bundles/yahtzee-js").Include(
                "~/Scripts/Yahtzee/game.js",
                "~/Scripts/Yahtzee/main.js",
                "~/Scripts/Yahtzee/robot.js",
                "~/Scripts/Yahtzee/ui-controllers.js",
                "~/Scripts/Yahtzee/utilities.js"
            ));

            bundles.Add(new StyleBundle("~/bundles/yahtzee-css").Include(
                "~/Content/Yahtzee/game.css"    
            ));

            bundles.Add(new ScriptBundle("~/bundles/modulus-js").Include(
                "~/Scripts/d20.js",
                "~/Scripts/crafty.js",
                "~/Scripts/Modulus/ModulusTypes.js",
                "~/Scripts/Modulus/Modulus.js",
                "~/Scripts/Modulus/ModulusResources.js",
                "~/Scripts/Modulus/ModulusServices.js",
                "~/Scripts/Modulus/ModulusControllers.js"
            ));

            bundles.Add(new StyleBundle("~/bundles/modulus-css").Include(
                "~/Content/Modulus/Modulus.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/scratch-js").IncludeDirectory(
                "~/Scripts/Scratch/", "*.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/home.css",
                "~/Content/shamepile.css",
                "~/Content/content-global.css"));
        }
    }
}
