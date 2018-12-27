using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace shamepilesoftware_v3.Controllers
{
    public class VikingsController : Controller
    {
        const string name = "Vikings!!!";
        const string version = "5.3";
        const string published = "December 8th, 2012";

        // GET: Vikings
        public ActionResult Index()
        {
            ViewBag.Name = name;
            ViewBag.Version = version;
            ViewBag.Published = published;
            return View();
        }

        // GET: About
        public ActionResult About()
        {
            ViewBag.Name = name;
            ViewBag.Version = version;
            ViewBag.Published = published;
            return View();
        }
    }
}