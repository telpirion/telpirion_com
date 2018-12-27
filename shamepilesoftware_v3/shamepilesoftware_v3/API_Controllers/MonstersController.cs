using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using shamepilesoftware_v3.Models;
using System.Net.Http.Headers;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace shamepilesoftware_v3
{
    public class MonstersController : ApiController
    {
        private static ModulusMonstersEntities monstersContext;

        // GET api/<controller>
        public HttpResponseMessage Get()
        {

            HttpResponseMessage response = null;
            string responseText = "";

            try
            {

                using (monstersContext = new ModulusMonstersEntities())
                {
                    var monsterQuery = from g in monstersContext.Monsters
                                      where g.Name == "Goblin"
                                      select g;

                    var monster = monsterQuery.DefaultIfEmpty(null).FirstOrDefault();

                    if (monster != null)
                    {
                        responseText = JsonConvert.SerializeObject(monster);
                    }
                    else
                    { 
                        object emptyEntity = new { message = "no entity found"};
                        responseText = JsonConvert.SerializeObject(emptyEntity);
                    }
                }
            }
            catch (Exception ex)
            {
                object error = new { error = ex.Message };
                responseText = JsonConvert.SerializeObject(error);
            }

            response = new HttpResponseMessage()
            {
                Content = new StringContent(responseText)
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            
            return response;
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(string name)
        {
            HttpResponseMessage response = null;
            string responseText = "";

            try 
            {
                using (monstersContext = new ModulusMonstersEntities())
                {
                    var monsters = from m in monstersContext.Monsters
                                   where m.Name == name
                                   select m;

                    var monster = monsters.DefaultIfEmpty(null).FirstOrDefault();

                    if (monster != null)
                    {
                        responseText = JsonConvert.SerializeObject(monster);
                    }
                    else
                    {
                        responseText = JsonConvert.SerializeObject(new { message = "No entity found" });
                    }
                }
            }
            catch (Exception ex)
            {
                responseText = JsonConvert.SerializeObject(new {error = ex.Message});
            }

            response = new HttpResponseMessage()
            {
                Content = new StringContent(responseText)
            };

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return response;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}