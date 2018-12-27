using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace shamepilesoftware_v3.Controllers
{
    public class ModulusController : Controller
    {
        const string name = "Modulus";
        const string version = "1.0";
        const string published = "Not yet published.";

        // GET: Modulus
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