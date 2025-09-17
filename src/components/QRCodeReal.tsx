'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Share2, Copy, Check } from 'lucide-react'
import QRCode from 'qrcode'

interface QRCodeComponentProps {
  url?: string
}

export default function QRCodeComponent({ url }: QRCodeComponentProps) {
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  
  const siteUrl = url || 'https://pedroigor09.github.io/compiladores_uj'

  useEffect(() => {
    generateQRCode()
  }, [siteUrl])

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(siteUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      })
      setQrDataUrl(qrDataUrl)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
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
            {qrDataUrl ? (
              <img 
                src={qrDataUrl} 
                alt="QR Code" 
                className="block"
                width={200}
                height={200}
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Gerando QR Code...</span>
              </div>
            )}
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