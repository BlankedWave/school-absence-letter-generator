import { useRef, useState, useEffect } from 'react'
import SignaturePad from 'signature_pad'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { t } from "@/lib/translations"

interface SignatureCanvasProps {
  onSave: (signature: string) => void
  language: "malay" | "english"
}

export function SignatureCanvas({ onSave, language }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePad | null>(null)
  const signatureBoxRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d')?.scale(ratio, ratio)
      if (signaturePadRef.current) {
        signaturePadRef.current.clear()
      }
    }
  }

  const cropSignature = (canvas: HTMLCanvasElement, box: HTMLDivElement): string => {
    const context = canvas.getContext('2d')
    if (!context) return ''

    const rect = box.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()
    
    const scale = canvas.width / canvasRect.width
    const x = (rect.left - canvasRect.left) * scale
    const y = (rect.top - canvasRect.top) * scale
    const width = rect.width * scale
    const height = rect.height * scale

    const tempCanvas = document.createElement('canvas')
    const OUTPUT_WIDTH = 300
    const OUTPUT_HEIGHT = (height / width) * OUTPUT_WIDTH
    tempCanvas.width = OUTPUT_WIDTH
    tempCanvas.height = OUTPUT_HEIGHT
    const tempContext = tempCanvas.getContext('2d')
    if (!tempContext) return ''

    tempContext.drawImage(canvas, x, y, width, height, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT)

    return tempCanvas.toDataURL('image/png')
  }

  useEffect(() => {
    if (canvasRef.current && !isSaved) {
      resizeCanvas()
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        minWidth: 0.5,
        maxWidth: 2.5,
        penColor: "black",
        backgroundColor: "rgb(255, 255, 255)",
        velocityFilterWeight: 0.7
      })

      signaturePadRef.current.addEventListener("beginStroke", () => {
        setIsEmpty(false)
      })

      signaturePadRef.current.addEventListener("endStroke", () => {
        if (signaturePadRef.current) {
          setIsEmpty(signaturePadRef.current.isEmpty())
        }
      })

      window.addEventListener('resize', resizeCanvas)
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        signaturePadRef.current?.off()
      }
    }
  }, [isSaved])

  const clear = () => {
    if (isSaved) {
      setIsSaved(false)
      return
    }
    signaturePadRef.current?.clear()
    setIsEmpty(true)
    onSave("")
  }

  const save = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty() && signatureBoxRef.current && canvasRef.current) {
      const croppedDataUrl = cropSignature(canvasRef.current, signatureBoxRef.current)
      onSave(croppedDataUrl)
      setIsSaved(true)
      if (signaturePadRef.current) {
        signaturePadRef.current.off()
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">5</span>
          {t("signature", language)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg bg-white relative h-[200px] w-full">
          {!isSaved && (
            <div 
              ref={signatureBoxRef}
              className="absolute inset-[20%] border-2 border-dashed border-gray-300 pointer-events-none flex items-center justify-center"
              style={{ zIndex: 1 }}
            >
              <span className="text-gray-400 text-sm">
                {t("signHere", language)}
              </span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              touchAction: 'none',
              position: 'relative',
              zIndex: 0,
              pointerEvents: isSaved ? 'none' : 'auto'
            }}
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={clear}
            className="flex-1"
          >
            {isSaved ? "Edit" : t("clearSignature", language)}
          </Button>
          {!isSaved && (
            <Button
              type="button"
              onClick={save}
              disabled={isEmpty}
              className="flex-1"
            >
              {t("saveSignature", language)}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 