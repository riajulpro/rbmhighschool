import { Button } from "@/components/ui/button";
import { extractGoogleDriveFileId } from "@/lib/getDriveFileId";
import Link from "next/link";

const DownloadPDF = ({ path }: { path: string }) => {
  const fileId = extractGoogleDriveFileId(path);
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <Link href={downloadUrl} download>
      <Button className="border border-[var(--primary-color)]">
        Download PDF
      </Button>
    </Link>
  );
};

export default DownloadPDF;
