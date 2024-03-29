﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WATG_DesignSmartPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Web
{
    public class PdfMediaTypeFormatter : System.Net.Http.Formatting.MediaTypeFormatter
    {
        private static readonly Type SupportedType = typeof(Project);

        public PdfMediaTypeFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/pdf"));
            MediaTypeMappings.Add(new UriPathExtensionMapping("pdf", "application/pdf"));
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, System.Net.Http.HttpContent content, TransportContext transportContext)
        {
            var taskSource = new TaskCompletionSource<object>();
            try
            {
                var person = (Project)value;

                var doc = PdfGenerator.CreatePdf(person);
                var ms = new MemoryStream();

                doc.Save(ms, false);

                var bytes = ms.ToArray();
                writeStream.Write(bytes, 0, bytes.Length);
                taskSource.SetResult(null);
            }
            catch (Exception e)
            {
                taskSource.SetException(e);
            }
            return taskSource.Task;
        }

        public override bool CanReadType(Type type)
        {
            return SupportedType == type;
        }

        public override bool CanWriteType(Type type)
        {
            return SupportedType == type;
        }
    }

}