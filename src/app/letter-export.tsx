import { Button } from "@/components/ui/button"
import { t } from "@/lib/translations"
import type { FormData } from "@/types"
import { exportToPdf } from "@/lib/export-handlers"
import { isLetterValid } from "@/lib/utils"

interface LetterExportProps {
  language: "malay" | "english"
  formData: FormData
}

export function LetterExport({ language, formData }: LetterExportProps) {
  const isValid = isLetterValid(formData);

  const handlePdfExport = async () => {
    if (!isValid) return;
    await exportToPdf();
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-center">
        {isValid 
          ? t("reviewPrompt", language)
          : t("fillRequiredFields", language)}
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={handlePdfExport}
          className="min-w-[200px] min-h-[60px]"
          disabled={!isValid}
        >
          {t("downloadPdf", language)}
        </Button>
      </div>
    </div>
  )
} 