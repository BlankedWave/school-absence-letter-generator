import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SignatureCanvas } from "./signature-canvas"
import type { FormData, Language } from "@/types"
import { t } from "@/lib/translations"

interface LetterFormProps {
  language: Language
  formData: FormData
  onFormChange: (data: Partial<FormData>) => void
}

export function LetterForm({ language, formData, onFormChange }: LetterFormProps) {
  const AttachmentItem = ({ file, onRemove }: { file: File, onRemove: () => void }) => (
    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
      <div className="flex items-center gap-2">
        <span>📎</span>
        <span className="truncate">{file.name}</span>
        <span className="text-sm text-muted-foreground">
          {t("fileSize", language).replace("%size%", (file.size / 1024 / 1024).toFixed(2))}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0"
      >
        ✕
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Parent's Address Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">1</span>
              {t("senderAddress", language)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFormChange({
                parentName: "",
                address: "",
                postcode: "",
                city: "",
                state: ""
              })}
              className="text-xs text-muted-foreground hover:text-destructive border-muted-foreground/30 hover:border-destructive/50 hover:bg-transparent flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              {t("clearForm", language)}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg">
              {t("parentName", language)} *
            </Label>
            <Input
              className="text-lg h-12"
              value={formData.parentName}
              onChange={(e) => onFormChange({ parentName: e.target.value })}
              placeholder={t("placeholderParentName", language)}
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg">
              {t("address", language)} *
            </Label>
            <Input
              className="text-lg h-12"
              value={formData.address}
              onChange={(e) => onFormChange({ address: e.target.value })}
              placeholder={t("placeholderAddress", language)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-lg">{t("postcode", language)} *</Label>
              <Input
                className="text-lg h-12"
                value={formData.postcode}
                onChange={(e) => onFormChange({ postcode: e.target.value })}
                placeholder={t("placeholderPostcode", language)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lg">{t("city", language)} *</Label>
              <Input
                className="text-lg h-12"
                value={formData.city}
                onChange={(e) => onFormChange({ city: e.target.value })}
                placeholder={t("placeholderCity", language)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lg">{t("state", language)} *</Label>
              <Input
                className="text-lg h-12"
                value={formData.state}
                onChange={(e) => onFormChange({ state: e.target.value })}
                placeholder={t("placeholderState", language)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* School's Address Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">2</span>
              {t("schoolInfo", language)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFormChange({
                teacherName: "",
                schoolName: "",
                schoolAddress: "",
                schoolPostcode: "",
                schoolCity: "",
                schoolState: "",
                includeSchoolAddress: false
              })}
              className="text-xs text-muted-foreground hover:text-destructive border-muted-foreground/30 hover:border-destructive/50 hover:bg-transparent flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              {t("clearForm", language)}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg">
              {t("teacherName", language)}
              <span className="text-sm text-muted-foreground ml-1">{t("optional", language)}</span>
            </Label>
            <Input
              className="text-lg h-12"
              value={formData.teacherName}
              onChange={(e) => onFormChange({ teacherName: e.target.value })}
              placeholder={t("placeholderTeacherName", language)}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg">
              {t("schoolName", language)} *
            </Label>
            <Input
              className="text-lg h-12"
              value={formData.schoolName}
              onChange={(e) => onFormChange({ schoolName: e.target.value })}
              placeholder={t("placeholderSchoolName", language)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeAddress"
              checked={formData.includeSchoolAddress}
              onCheckedChange={(checked) => 
                onFormChange({ includeSchoolAddress: checked as boolean })
              }
            />
            <Label htmlFor="includeAddress" className="text-lg font-normal">
              {t("includeSchoolAddress", language)}
            </Label>
          </div>

          {formData.includeSchoolAddress && (
            <>
              <div className="space-y-4">
                <Label className="text-lg">
                  {t("schoolAddress", language)} *
                </Label>
                <Input
                  className="text-lg h-12"
                  value={formData.schoolAddress}
                  onChange={(e) => onFormChange({ schoolAddress: e.target.value })}
                  placeholder={t("placeholderSchoolAddress", language)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-lg">{t("schoolPostcode", language)} *</Label>
                  <Input
                    className="text-lg h-12"
                    value={formData.schoolPostcode}
                    onChange={(e) => onFormChange({ schoolPostcode: e.target.value })}
                    placeholder={t("placeholderPostcode", language)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg">{t("schoolCity", language)} *</Label>
                  <Input
                    className="text-lg h-12"
                    value={formData.schoolCity}
                    onChange={(e) => onFormChange({ schoolCity: e.target.value })}
                    placeholder={t("placeholderCity", language)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-lg">{t("schoolState", language)} *</Label>
                  <Input
                    className="text-lg h-12"
                    value={formData.schoolState}
                    onChange={(e) => onFormChange({ schoolState: e.target.value })}
                    placeholder={t("placeholderState", language)}
                    required
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Letter Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">3</span>
              {t("letterInfo", language)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFormChange({
                studentName: "",
                className: "",
                dateType: "single",
                singleDate: "",
                startDate: "",
                endDate: "",
                contents: [""],
                letterDate: ""
              })}
              className="text-xs text-muted-foreground hover:text-destructive border-muted-foreground/30 hover:border-destructive/50 hover:bg-transparent flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              {t("clearForm", language)}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Student Info */}
          <div className="space-y-4">
            <Label className="text-lg">
              {t("studentName", language)} *
            </Label>
            <Input
              className="text-lg h-12"
              value={formData.studentName}
              onChange={(e) => onFormChange({ studentName: e.target.value })}
              placeholder={t("placeholderStudentName", language)}
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg">{t("class", language)} *</Label>
            <Input
              className="text-lg h-12"
              value={formData.className}
              onChange={(e) => onFormChange({ className: e.target.value })}
              placeholder={t("placeholderClass", language)}
              required
            />
          </div>

          {/* Date Selection */}
          <div className="space-y-4">
            <Label className="text-lg">{t("date", language)} *</Label>
            <div className="space-y-4">
              <Select
                value={formData.dateType}
                onValueChange={(value: "single" | "range") => 
                  onFormChange({ dateType: value })
                }
              >
                <SelectTrigger className="text-lg h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">
                    {t("singleDay", language)}
                  </SelectItem>
                  <SelectItem value="range">
                    {t("dateRange", language)}
                  </SelectItem>
                </SelectContent>
              </Select>

              {formData.dateType === "single" ? (
                <DatePicker
                  date={formData.singleDate ? new Date(formData.singleDate) : undefined}
                  onSelect={(date) => onFormChange({ singleDate: date?.toISOString().split('T')[0] })}
                  placeholder={t("date", language)}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base">{t("from", language)}</Label>
                    <DatePicker
                      date={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date) => onFormChange({ startDate: date?.toISOString().split('T')[0] })}
                      placeholder={t("from", language)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">{t("to", language)}</Label>
                    <DatePicker
                      date={formData.endDate ? new Date(formData.endDate) : undefined}
                      onSelect={(date) => onFormChange({ endDate: date?.toISOString().split('T')[0] })}
                      placeholder={t("to", language)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Label className="text-lg">
              {t("content", language)} *
            </Label>
            
            {formData.contents.map((content, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  className="text-lg min-h-[100px]"
                  value={content}
                  onChange={(e) => {
                    const newContents = [...formData.contents]
                    newContents[index] = e.target.value
                    onFormChange({
                      contents: newContents,
                      reason: newContents.join('\n')
                    })
                  }}
                  placeholder={
                    index === 0
                      ? t("contentPlaceholder", language)
                      : t("additionalContentPlaceholder", language).replace("%index%", (index + 1).toString())
                  }
                  required
                />
                
                {formData.contents.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-10 shrink-0"
                    onClick={() => {
                      const newContents = formData.contents.filter((_, i) => i !== index)
                      onFormChange({
                        contents: newContents,
                        reason: newContents.join('\n')
                      })
                    }}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
            
            {formData.contents.length < 6 && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  onFormChange({
                    contents: [...formData.contents, ""]
                  })
                }}
              >
                <span className="mr-2">+</span>
                {t("addContent", language)}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-lg">
              {t("letterDate", language)} *
            </Label>
            <DatePicker
              date={formData.letterDate ? new Date(formData.letterDate) : undefined}
              onSelect={(date) => onFormChange({ letterDate: date?.toISOString().split('T')[0] })}
              placeholder={t("letterDate", language)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Attachments Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">4</span>
            {t("attachments", language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <AttachmentItem
                    key={index}
                    file={file}
                    onRemove={() => {
                      const newAttachments = formData.attachments.filter((_, i) => i !== index)
                      onFormChange({ attachments: newAttachments })
                    }}
                  />
                ))}
              </div>
            )}
            
            <Label htmlFor="file-upload" className="block">
              <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted transition-colors cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    onFormChange({
                      attachments: [...formData.attachments, ...files]
                    })
                  }}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="text-center space-y-2">
                  <div className="text-4xl">📄</div>
                  <div className="text-muted-foreground">
                    {t("uploadInstructions", language)}
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Signature Canvas */}
      <SignatureCanvas 
        onSave={(signature) => onFormChange({ signature: signature || "" })}
        language={language}
      />
    </div>
  )
} 