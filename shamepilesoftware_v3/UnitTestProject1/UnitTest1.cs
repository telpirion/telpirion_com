using System;
using Selenium;
using OpenQA.Selenium.Chrome;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class TestingInProd
    {
        const string siteUrl = "http://shamepilesoftware.azurewebsites.net";

        [TestMethod]
        public void NavigateToShamepileSoftware()
        {
            ChromeDriver chrome = new ChromeDriver()
            {
                Url = siteUrl
            };
            chrome.Close();
            chrome.Dispose();

        }
    }
}
