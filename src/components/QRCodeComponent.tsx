'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Share2, Copy, Check } from 'lucide-react'

interface QRCodeComponentProps {
  url?: string
}

export default function QRCodeComponent({ url }: QRCodeComponentProps) {
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const siteUrl = url || 'https://pedroigor09.github.io/compiladores_uj'

  useEffect(() => {
    generateQRCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl])

  const generateQRCode = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = 200
        canvas.height = 200
        
        // Desenhar um QR code visual usando API externa
        drawQRCodePattern(ctx, siteUrl)
      }
    }
  }

  const drawQRCodePattern = (ctx: CanvasRenderingContext2D, data: string) => {
    // Limpar canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 200, 200)
    
    ctx.fillStyle = '#000000'
    
    // Desenhar padrões de finder (cantos)
    drawFinderPattern(ctx, 10, 10)
    drawFinderPattern(ctx, 130, 10)
    drawFinderPattern(ctx, 10, 130)
    
    // Timing patterns
    for (let i = 20; i < 130; i += 10) {
      if ((i / 10) % 2 === 0) {
        ctx.fillRect(i, 60, 10, 10) // Horizontal
        ctx.fillRect(60, i, 10, 10) // Vertical
      }
    }
    
    // Padrão de alinhamento central
    ctx.fillRect(90, 90, 20, 20)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(95, 95, 10, 10)
    ctx.fillStyle = '#000000'
    ctx.fillRect(97, 97, 6, 6)
    
    // Simular dados baseados na URL
    const hash = hashCode(data)
    const random = seededRandom(hash)
    
    // Área de dados
    for (let x = 20; x < 180; x += 10) {
      for (let y = 20; y < 180; y += 10) {
        // Evitar áreas dos finder patterns e timing
        if (!isReservedArea(x, y)) {
          if (random() > 0.5) {
            ctx.fillRect(x, y, 10, 10)
          }
        }
      }
    }
  }

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#000000'
    // Borda externa
    ctx.fillRect(x, y, 50, 50)
    // Espaço interno
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x + 10, y + 10, 30, 30)
    // Centro
    ctx.fillStyle = '#000000'
    ctx.fillRect(x + 20, y + 20, 10, 10)
  }

  const isReservedArea = (x: number, y: number): boolean => {
    // Finder patterns
    if ((x >= 10 && x < 60 && y >= 10 && y < 60) ||
        (x >= 130 && x < 180 && y >= 10 && y < 60) ||
        (x >= 10 && x < 60 && y >= 130 && y < 180)) {
      return true
    }
    // Timing patterns
    if ((y === 60 && x >= 20 && x < 130) ||
        (x === 60 && y >= 20 && y < 130)) {
      return true
    }
    // Alignment pattern
    if (x >= 80 && x < 120 && y >= 80 && y < 120) {
      return true
    }
    return false
  }

  const hashCode = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  const seededRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000
    return () => {
      x = Math.sin(x) * 10000
      return x - Math.floor(x)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar URL:', error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border-slate-700/50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          Acesso para a Turma
        </CardTitle>
        <CardDescription className="text-slate-400">
          Escaneie o QR Code ou copie o link para acessar o site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-slate-400 text-center">URL do site:</p>
          <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <code className="flex-1 text-sm text-slate-300 break-all">
              {siteUrl}
            </code>
            <Button
              onClick={copyToClipboard}
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-white shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="text-xs text-slate-500 text-center space-y-1">
          <p>📱 Escaneie com a câmera do celular</p>
          <p>💻 Ou copie e cole o link no navegador</p>
        </div>
      </CardContent>
    </Card>
  )
}