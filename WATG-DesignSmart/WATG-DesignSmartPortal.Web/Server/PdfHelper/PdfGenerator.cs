using MigraDoc.DocumentObjectModel;
using MigraDoc.Rendering;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using WATG_DesignSmartPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Web
{
    public static class PdfGenerator
    {
        public static PdfDocument CreatePdf(Project project)
        {
            var document = new Document();
            var sec = document.Sections.AddSection();
            
            sec.AddParagraph("PROJECT       " + project.ProjectName).Format.RightIndent = 10;
            sec.AddParagraph("PROJECT #     " + project.ProjectId).Format.RightIndent = 10;
            sec.AddParagraph("AREA          ").Format.RightIndent = 10;
            sec.AddParagraph("ISSUE DATE    " + project.DateAdded).Format.RightIndent = 10;


            sec.AddImage("/css/images/logo.PNG");
            return RenderDocument(document);
        }

        private static PdfDocument RenderDocument(Document document)
        {
            var rend = new PdfDocumentRenderer { Document = document };
            rend.RenderDocument();
            return rend.PdfDocument;
        }

        private static void DrawImage(XGraphics gfx, int number)
        {
           // BeginBox(gfx, number, "DrawImage (original)");

            XImage image = XImage.FromFile("css/images/logo.PNG");

            // Left position in point
            double x = (250 - image.PixelWidth * 72 / image.HorizontalResolution) / 2;
            gfx.DrawImage(image, x, 0);

           // EndBox(gfx);
        }
    }
}