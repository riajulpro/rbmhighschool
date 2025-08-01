import { extractGoogleDriveFileId } from "@/lib/getDriveFileId";
import DownloadPDF from "./download";

const PreviewPDF = ({ path }: { path: string }) => {
  const fileId = extractGoogleDriveFileId(path);
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <div className="w-full">
        <iframe
          src={previewUrl}
          width="100%"
          className="rounded-md md:h-[700px] h-96"
          allow="autoplay"
        />
      </div>
      <div>
        <DownloadPDF path={path} />
      </div>
    </div>
  );
};

export default PreviewPDF;
