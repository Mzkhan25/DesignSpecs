#region
using System;
using System.IO;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Web.Mvc;
#endregion

namespace WATG_DesignSmartPortal.Web.Server.Controllers
{
    public class UtilController : Controller
    {
        // GET: Util
        public bool MakeNecessarryFolders()
        {
            var result = true;
            try
            {
                string[] folderpaths = {"/watgdesignawards/Attachments/"};
                // string[] folderpaths = { "/Attachments/" };
                foreach (var folderpath in folderpaths)
                {
                    var folderPhysicalPath = Server.MapPath(folderpath);
                    var exists = Directory.Exists(folderPhysicalPath);
                    if (!exists)
                    {
                        var di = Directory.CreateDirectory(folderPhysicalPath);
                        var dInfo = new DirectoryInfo(folderPhysicalPath);
                        var dSecurity = dInfo.GetAccessControl();
                        dSecurity.AddAccessRule(
                            new FileSystemAccessRule(new SecurityIdentifier(WellKnownSidType.WorldSid, null),
                                FileSystemRights.FullControl,
                                InheritanceFlags.ObjectInherit | InheritanceFlags.ContainerInherit,
                                PropagationFlags.NoPropagateInherit, AccessControlType.Allow));
                        dInfo.SetAccessControl(dSecurity);
                    }
                }
            }
            catch (Exception exception)
            {
                result = false;
            }
            return result;
        }
    }
}