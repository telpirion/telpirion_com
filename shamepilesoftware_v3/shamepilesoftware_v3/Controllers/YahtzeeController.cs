using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace shamepilesoftware_v3.Controllers
{
    public class YahtzeeController : Controller
    {
        const string name = "Yahtzee";
        const string version = "1.1";
        const string published = "August 27th, 2014.";

        // GET: Yahtzee
        public ActionResult Index()
        {
            ViewBag.Name = name;
            ViewBag.Version = version;
            ViewBag.Published = published;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Name = name;
            ViewBag.Version = version;
            ViewBag.Published = published;
            return View();
        }
    }
}