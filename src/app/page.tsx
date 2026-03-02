'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Calculator, Settings, Package, DollarSign, Clock, Zap, Weight, TrendingUp, Truck, Mail, Plus } from 'lucide-react'

interface GastosFijos {
  precioKG: number
  precioKwh: number
  consumoHora: number
  desgasteMaquina: number
  precioRepuestos: number
  margenError: number
}

interface DatosPieza {
  horasImpresion: number
  gramosFilamento: number
  margenGanancia: number
  envioDomicilio: number
  envioCorreo: number
  extras: number
}

interface Resultados {
  precioMaterial: number
  precioLuz: number
  desgasteMaquina: number
  margenErrorCalculado: number
  costoTotal: number
  totalCobrar: number
}

export default function Home() {
  const [gastosFijos, setGastosFijos] = useState<GastosFijos>({
    precioKG: 28000,
    precioKwh: 145,
    consumoHora: 200,
    desgasteMaquina: 8000,
    precioRepuestos: 12000,
    margenError: 15
  })

  const [datosPieza, setDatosPieza] = useState<DatosPieza>({
    horasImpresion: 1.4,
    gramosFilamento: 67,
    margenGanancia: 4,
    envioDomicilio: 0,
    envioCorreo: 0,
    extras: 0
  })

  const resultados = useMemo<Resultados>(() => {
    // Precio Material = (Gramos * PrecioKG) / 1000
    const precioMaterial = (datosPieza.gramosFilamento * gastosFijos.precioKG) / 1000

    // Precio Luz = ((ConsumoHora * PrecioKwh) / 1000) * HorasImpresion
    const precioLuz = ((gastosFijos.consumoHora * gastosFijos.precioKwh) / 1000) * datosPieza.horasImpresion

    // Desgaste Maquina = (PrecioRepuestos / HorasDesgaste) * HorasImpresion
    const desgasteMaquina = (gastosFijos.precioRepuestos / gastosFijos.desgasteMaquina) * datosPieza.horasImpresion

    // Margen de Error = (PrecioMaterial + PrecioLuz + Desgaste) * (MargenError% / 100)
    const margenErrorCalculado = (precioMaterial + precioLuz + desgasteMaquina) * (gastosFijos.margenError / 100)

    // Costo Total = Suma de todos los conceptos + envíos + extras
    const costoTotal = precioMaterial + precioLuz + desgasteMaquina + margenErrorCalculado + datosPieza.envioDomicilio + datosPieza.envioCorreo + datosPieza.extras

    // Total a Cobrar = Costo * Margen de Ganancia
    const totalCobrar = costoTotal * datosPieza.margenGanancia

    return {
      precioMaterial,
      precioLuz,
      desgasteMaquina,
      margenErrorCalculado,
      costoTotal,
      totalCobrar
    }
  }, [gastosFijos, datosPieza])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const updateGastosFijos = (field: keyof GastosFijos, value: string) => {
    const numValue = parseFloat(value) || 0
    setGastosFijos(prev => ({ ...prev, [field]: numValue }))
  }

  const updateDatosPieza = (field: keyof DatosPieza, value: string) => {
    const numValue = parseFloat(value) || 0
    setDatosPieza(prev => ({ ...prev, [field]: numValue }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calculator className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Calculadora de Costos 3D
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Calcula el precio de venta de tus piezas impresas en 3D
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Gastos Fijos */}
          <Card className="lg:col-span-1 shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <CardTitle className="text-lg">Gastos Fijos</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Configuración general de costos
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="precioKG" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Weight className="h-4 w-4 text-emerald-600" />
                  Precio por KG de filamento
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="precioKG"
                    type="number"
                    value={gastosFijos.precioKG}
                    onChange={(e) => updateGastosFijos('precioKG', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precioKwh" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Precio por Kwh
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="precioKwh"
                    type="number"
                    value={gastosFijos.precioKwh}
                    onChange={(e) => updateGastosFijos('precioKwh', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="consumoHora" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Consumo por hora (W)
                </Label>
                <Input
                  id="consumoHora"
                  type="number"
                  value={gastosFijos.consumoHora}
                  onChange={(e) => updateGastosFijos('consumoHora', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desgasteMaquina" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Desgaste máquina (horas)
                </Label>
                <Input
                  id="desgasteMaquina"
                  type="number"
                  value={gastosFijos.desgasteMaquina}
                  onChange={(e) => updateGastosFijos('desgasteMaquina', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precioRepuestos" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Settings className="h-4 w-4 text-red-500" />
                  Precio repuestos
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="precioRepuestos"
                    type="number"
                    value={gastosFijos.precioRepuestos}
                    onChange={(e) => updateGastosFijos('precioRepuestos', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="margenError" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  % Margen de error
                </Label>
                <div className="relative">
                  <Input
                    id="margenError"
                    type="number"
                    value={gastosFijos.margenError}
                    onChange={(e) => updateGastosFijos('margenError', e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Columna central - Datos de la Pieza */}
          <Card className="lg:col-span-1 shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <CardTitle className="text-lg">Datos de la Pieza</CardTitle>
              </div>
              <CardDescription className="text-emerald-100">
                Información específica de cada impresión
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="horasImpresion" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  Horas de impresión
                </Label>
                <Input
                  id="horasImpresion"
                  type="number"
                  step="0.1"
                  value={datosPieza.horasImpresion}
                  onChange={(e) => updateDatosPieza('horasImpresion', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gramosFilamento" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Weight className="h-4 w-4 text-blue-500" />
                  Gramos de filamento
                </Label>
                <div className="relative">
                  <Input
                    id="gramosFilamento"
                    type="number"
                    value={datosPieza.gramosFilamento}
                    onChange={(e) => updateDatosPieza('gramosFilamento', e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">g</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="margenGanancia" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  Margen de ganancia (x)
                </Label>
                <Input
                  id="margenGanancia"
                  type="number"
                  step="0.1"
                  value={datosPieza.margenGanancia}
                  onChange={(e) => updateDatosPieza('margenGanancia', e.target.value)}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Multiplicador sobre el costo base (ej: 4 = 400%)
                </p>
              </div>

              <Separator className="my-4" />

              {/* Envíos y Extras */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Envíos y Extras</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="envioDomicilio" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Truck className="h-4 w-4 text-blue-600" />
                    Envío a domicilio
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="envioDomicilio"
                      type="number"
                      value={datosPieza.envioDomicilio}
                      onChange={(e) => updateDatosPieza('envioDomicilio', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="envioCorreo" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Mail className="h-4 w-4 text-amber-600" />
                    Envío por correo
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="envioCorreo"
                      type="number"
                      value={datosPieza.envioCorreo}
                      onChange={(e) => updateDatosPieza('envioCorreo', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extras" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Plus className="h-4 w-4 text-purple-600" />
                    Extras
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="extras"
                      type="number"
                      value={datosPieza.extras}
                      onChange={(e) => updateDatosPieza('extras', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Resumen rápido */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Resumen rápido</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-600 dark:text-slate-400">Tiempo:</div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {datosPieza.horasImpresion} hs
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Material:</div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {datosPieza.gramosFilamento} g
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Ganancia:</div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    x{datosPieza.margenGanancia}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Columna derecha - Resultados */}
          <Card className="lg:col-span-1 shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <CardTitle className="text-lg">Resultados</CardTitle>
              </div>
              <CardDescription className="text-amber-100">
                Desglose detallado de costos
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Precio Material */}
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-600 dark:text-slate-400">Precio Material</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(resultados.precioMaterial)}
                  </span>
                </div>

                {/* Precio Luz */}
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-slate-600 dark:text-slate-400">Precio Luz</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(resultados.precioLuz)}
                  </span>
                </div>

                {/* Desgaste Máquina */}
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-red-500" />
                    <span className="text-slate-600 dark:text-slate-400">Desgaste Máquina</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(resultados.desgasteMaquina)}
                  </span>
                </div>

                {/* Margen de Error */}
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-slate-600 dark:text-slate-400">Margen de Error</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(resultados.margenErrorCalculado)}
                  </span>
                </div>

                <Separator className="my-2" />

                {/* Envío a Domicilio */}
                {datosPieza.envioDomicilio > 0 && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-slate-600 dark:text-slate-400">Envío a Domicilio</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(datosPieza.envioDomicilio)}
                    </span>
                  </div>
                )}

                {/* Envío por Correo */}
                {datosPieza.envioCorreo > 0 && (
                  <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-amber-600" />
                      <span className="text-slate-600 dark:text-slate-400">Envío por Correo</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(datosPieza.envioCorreo)}
                    </span>
                  </div>
                )}

                {/* Extras */}
                {datosPieza.extras > 0 && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-purple-600" />
                      <span className="text-slate-600 dark:text-slate-400">Extras</span>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {formatCurrency(datosPieza.extras)}
                    </span>
                  </div>
                )}

                <Separator className="my-2" />

                {/* Costo Total */}
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">COSTO</span>
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatCurrency(resultados.costoTotal)}
                  </span>
                </div>

                <Separator className="my-2" />

                {/* Total a Cobrar */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-center shadow-lg">
                  <div className="text-emerald-100 text-sm mb-1">TOTAL A COBRAR</div>
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(resultados.totalCobrar)}
                  </div>
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white hover:bg-white/30">
                    x{datosPieza.margenGanancia} margen aplicado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>Calculadora de Costos para Impresión 3D</p>
        </footer>
      </div>
    </div>
  )
}
