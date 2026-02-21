'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Calculator, Settings, Package, Zap, Clock, Weight, DollarSign, AlertTriangle, Printer } from 'lucide-react'

interface CalculationResult {
  materialPrice: number
  electricityPrice: number
  machineWear: number
  errorMargin: number
  totalCost: number
  finalPrice: number
}

export default function Home() {
  // Fixed costs (Gastos Fijos)
  const [pricePerKg, setPricePerKg] = useState<number>(20000)
  const [pricePerKwh, setPricePerKwh] = useState<number>(140)
  const [consumptionWatts, setConsumptionWatts] = useState<number>(150)
  const [machineWearHours, setMachineWearHours] = useState<number>(4320)
  const [replacementPrice, setReplacementPrice] = useState<number>(6000)
  const [errorMarginPercent, setErrorMarginPercent] = useState<number>(30)

  // Piece parameters (Pieza)
  const [printingHours, setPrintingHours] = useState<number>(1.4)
  const [filamentGrams, setFilamentGrams] = useState<number>(67)
  const [profitMultiplier, setProfitMultiplier] = useState<number>(4)

  // Results - calculated with useMemo
  const results = useMemo<CalculationResult>(() => {
    // Material Price = (grams * price_per_kg) / 1000
    const materialPrice = (filamentGrams * pricePerKg) / 1000

    // Electricity Price = ((watts * price_kwh) / 1000) * hours
    const electricityPrice = ((consumptionWatts * pricePerKwh) / 1000) * printingHours

    // Machine Wear = (replacement_price / machine_wear_hours) * printing_hours
    const machineWear = (replacementPrice / machineWearHours) * printingHours

    // Error Margin = (material + electricity + wear) * (error_margin% / 100)
    const errorMargin = (materialPrice + electricityPrice + machineWear) * (errorMarginPercent / 100)

    // Total Cost = sum of all above
    const totalCost = materialPrice + electricityPrice + machineWear + errorMargin

    // Final Price = total_cost * profit_multiplier
    const finalPrice = totalCost * profitMultiplier

    return {
      materialPrice,
      electricityPrice,
      machineWear,
      errorMargin,
      totalCost,
      finalPrice
    }
  }, [pricePerKg, pricePerKwh, consumptionWatts, machineWearHours, replacementPrice, errorMarginPercent, printingHours, filamentGrams, profitMultiplier])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Printer className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Calculadora de Impresión 3D
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Calcula el precio final de tus piezas impresas en 3D de forma precisa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Fixed Costs Card */}
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Gastos Fijos</CardTitle>
                </div>
                <CardDescription>
                  Parámetros de costo base para el cálculo
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priceKg" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Precio del KG de Filamento
                    </Label>
                    <Input
                      id="priceKg"
                      type="number"
                      value={pricePerKg}
                      onChange={(e) => setPricePerKg(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priceKwh" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      Precio del KWh
                    </Label>
                    <Input
                      id="priceKwh"
                      type="number"
                      value={pricePerKwh}
                      onChange={(e) => setPricePerKwh(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consumption" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Consumo Real (Watts/hora)
                    </Label>
                    <Input
                      id="consumption"
                      type="number"
                      value={consumptionWatts}
                      onChange={(e) => setConsumptionWatts(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wearHours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Vida Útil Máquina (horas)
                    </Label>
                    <Input
                      id="wearHours"
                      type="number"
                      value={machineWearHours}
                      onChange={(e) => setMachineWearHours(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="replacement" className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      Precio de Repuestos
                    </Label>
                    <Input
                      id="replacement"
                      type="number"
                      value={replacementPrice}
                      onChange={(e) => setReplacementPrice(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="errorMargin" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      % Margen de Error
                    </Label>
                    <Input
                      id="errorMargin"
                      type="number"
                      value={errorMarginPercent}
                      onChange={(e) => setErrorMarginPercent(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Piece Parameters Card */}
            <Card className="border-2 border-emerald-500/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-xl">Parámetros de la Pieza</CardTitle>
                </div>
                <CardDescription>
                  Datos específicos de la pieza a imprimir
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Horas de Impresión
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      step="0.1"
                      value={printingHours}
                      onChange={(e) => setPrintingHours(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grams" className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      Gramos de Filamento
                    </Label>
                    <Input
                      id="grams"
                      type="number"
                      step="0.1"
                      value={filamentGrams}
                      onChange={(e) => setFilamentGrams(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="multiplier" className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                      Margen de Ganancia (x)
                    </Label>
                    <Input
                      id="multiplier"
                      type="number"
                      step="0.1"
                      value={profitMultiplier}
                      onChange={(e) => setProfitMultiplier(Number(e.target.value))}
                      className="text-right"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Results Card */}
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Resultados del Cálculo</CardTitle>
                </div>
                <CardDescription>
                  Desglose detallado del precio
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Material Price */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Precio Material</span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formatCurrency(results.materialPrice)}
                    </Badge>
                  </div>

                  {/* Electricity Price */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Precio Luz</span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formatCurrency(results.electricityPrice)}
                    </Badge>
                  </div>

                  {/* Machine Wear */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Desgaste de Máquina</span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formatCurrency(results.machineWear)}
                    </Badge>
                  </div>

                  {/* Error Margin */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Margen de Error</span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-mono">
                      {formatCurrency(results.errorMargin)}
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  {/* Total Cost */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-semibold">COSTO TOTAL</span>
                    </div>
                    <Badge className="text-lg font-mono bg-primary/20 text-primary hover:bg-primary/30">
                      {formatCurrency(results.totalCost)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Price Card */}
            <Card className="border-2 border-emerald-500/30 shadow-xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-900">
              <CardHeader className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-2xl text-emerald-700 dark:text-emerald-400">
                    TOTAL A COBRAR
                  </CardTitle>
                </div>
                <CardDescription className="text-emerald-600/80">
                  Precio final con margen de ganancia x{profitMultiplier}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                    {formatCurrency(results.finalPrice)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    = {formatCurrency(results.totalCost)} × {profitMultiplier}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-emerald-200 dark:border-emerald-800">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Costo por Hora</div>
                    <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(results.totalCost / printingHours)}
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-emerald-200 dark:border-emerald-800">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Costo por Gramo</div>
                    <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(results.totalCost / filamentGrams)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formula Reference */}
            <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <CardContent className="pt-4 pb-4">
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>Fórmulas de cálculo:</strong></p>
                  <p>• Material = (Gramos × Precio KG) ÷ 1000</p>
                  <p>• Electricidad = (Watts × Precio KWh ÷ 1000) × Horas</p>
                  <p>• Desgaste = (Precio Repuestos ÷ Vida Útil) × Horas</p>
                  <p>• Margen Error = (Material + Luz + Desgaste) × % Error</p>
                  <p>• Total = Costo × Margen Ganancia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Calculadora de Precios para Impresión 3D</p>
        </footer>
      </div>
    </div>
  )
}
