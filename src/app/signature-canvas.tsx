import { useRef, useState, useEffect } from 'react'
import SignaturePad from 'signature_pad'
import { Button } from '../components/ui/button'
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
    <div className="space-y-4">
      <div className="relative border rounded-lg">
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          style={{ height: '200px' }}
        />
        <div
          ref={signatureBoxRef}
          className="absolute inset-[20%] border-2 border-dashed border-gray-300 pointer-events-none"
        >
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              {t("signHere", language)}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={isEmpty}
        >
          {t("clearSignature", language)}
        </Button>
        <Button
          type="button"
          onClick={save}
          disabled={isEmpty || isSaved}
        >
          {t("saveSignature", language)}
        </Button>
      </div>
    </div>
  )
} 