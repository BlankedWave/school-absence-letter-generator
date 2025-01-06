"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LetterForm } from "./letter-form"
import { LetterPreview } from "./letter-preview"
import { DEFAULT_TEMPLATE_SECTIONS, DEFAULT_CONTENT, getInitialFormData } from "@/lib/constants"
import type { FormData, Language, TemplateSection } from "@/types"
import { t } from "@/lib/translations"
import { Footer } from "@/components/footer"

const STORAGE_KEY = 'letter_form_data'

export default function Page() {
  const [language, setLanguage] = useState<Language>("malay")
  const [formData, setFormData] = useState<FormData>(() => {
    // Try to get saved data from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return parsed
        } catch (e) {
          console.error('Failed to parse saved form data:', e)
        }
      }
    }
    return getInitialFormData(language)
  })
  const [templateSections] = useState<TemplateSection[]>(DEFAULT_TEMPLATE_SECTIONS)

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      contents: prev.contents.map((content, index) => {
        if (index === 0 && (
          content === DEFAULT_CONTENT.malay ||
          content === DEFAULT_CONTENT.english
        )) {
          return DEFAULT_CONTENT[language]
        }
        return content
      })
    }))
  }, [language])

  // Save to localStorage whenever form data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleClearForm = () => {
    setFormData(getInitialFormData(language))
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            {t("systemTitle", language)}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("systemDescription", language)}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("privacyNotice", language)}
          </p>
        </div>

        {/* Language Selection */}
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              {t("languageSelection", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={language === "malay" ? "default" : "outline"}
                onClick={() => setLanguage("malay")}
                className="h-16 text-lg"
              >
                {t("malayLanguage", language)}
              </Button>
              <Button
                variant={language === "english" ? "default" : "outline"}
                onClick={() => setLanguage("english")}
                className="h-16 text-lg"
              >
                {t("englishLanguage", language)}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <div className="space-y-4">
            <LetterForm
              language={language}
              formData={formData}
              onFormChange={handleFormChange}
            />
          </div>

          {/* Desktop Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <LetterPreview
                language={language}
                formData={formData}
                templateSections={templateSections}
              />
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="lg:hidden space-y-6">
            <LetterPreview
              language={language}
              formData={formData}
              templateSections={templateSections}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer language={language}/>
    </main>
  )
}
