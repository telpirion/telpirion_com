using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace shamepilesoftware_v3.Models
{
    public class fooMonster
    {
        public string name;
        public int hitDice;
        public int damageMax;
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
