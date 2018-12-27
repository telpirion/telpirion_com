using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(shamepilesoftware_v3.Startup))]
namespace shamepilesoftware_v3
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
