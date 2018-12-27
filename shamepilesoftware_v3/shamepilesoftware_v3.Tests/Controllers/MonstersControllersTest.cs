using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using shamepilesoftware_v3;
using shamepilesoftware_v3.Controllers;
using shamepilesoftware_v3.Models;

namespace shamepilesoftware_v3.Tests.Controllers
{
    [TestClass]
    public class MonstersControllerTest
    {
        [TestMethod]
        public void Get_ShouldReturnStringResult()
        {
            var monstersController = new MonstersController();
            var goblin = monstersController.Get();
            Assert.IsNotNull(goblin);

            var goblinText = goblin.Content.ReadAsStringAsync().Result;
            Assert.IsTrue(goblinText.Contains("Goblin"));
        }

        [TestMethod]
        public void Get_ShouldReturnStringWhenPassedAString()
        {
            var monstersController = new MonstersController();
            var monsterName = "Minotaur";
            var monster = monstersController.Get(monsterName);
            Assert.IsNotNull(monster);

            var monsterText = monster.Content.ReadAsStringAsync().Result;
            Assert.IsTrue(monsterText.Contains(monsterName));
        }
    }
}
