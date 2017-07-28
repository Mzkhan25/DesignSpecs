using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WATG_DesignSmartPortal.Contracts.IRepository;
using WATG_DesignSmartPortal.Data.Repository;
using WATG_DesignSmartPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    [RoutePrefix("api/v1")]
    public class ExportDataController : ApiController
    {
        private readonly IProjectRepository _project = new ProjectRepository();

        [Route("test")]
        [HttpGet]
        public HttpResponseMessage GetTest(int projectId)
        {
            var project = _project.GetAll().Where(p => p.Id == projectId).SingleOrDefault();
            
            return Request.CreateResponse(HttpStatusCode.OK, project);
        }
    }
}
