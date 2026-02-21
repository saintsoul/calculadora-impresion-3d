import { NextRequest, NextResponse } from "next/server";

interface CalculationInput {
  pricePerKg: number;
  pricePerKwh: number;
  consumptionWatts: number;
  machineWearHours: number;
  replacementPrice: number;
  errorMarginPercent: number;
  printingHours: number;
  filamentGrams: number;
  profitMultiplier: number;
}

interface CalculationResult {
  materialPrice: number;
  electricityPrice: number;
  machineWear: number;
  errorMargin: number;
  totalCost: number;
  finalPrice: number;
  costPerHour: number;
  costPerGram: number;
}

function calculatePrice(input: CalculationInput): CalculationResult {
  const {
    pricePerKg,
    pricePerKwh,
    consumptionWatts,
    machineWearHours,
    replacementPrice,
    errorMarginPercent,
    printingHours,
    filamentGrams,
    profitMultiplier,
  } = input;

  // Material Price = (grams * price_per_kg) / 1000
  const materialPrice = (filamentGrams * pricePerKg) / 1000;

  // Electricity Price = ((watts * price_kwh) / 1000) * hours
  const electricityPrice = ((consumptionWatts * pricePerKwh) / 1000) * printingHours;

  // Machine Wear = (replacement_price / machine_wear_hours) * printing_hours
  const machineWear = (replacementPrice / machineWearHours) * printingHours;

  // Error Margin = (material + electricity + wear) * (error_margin% / 100)
  const errorMargin = (materialPrice + electricityPrice + machineWear) * (errorMarginPercent / 100);

  // Total Cost = sum of all above
  const totalCost = materialPrice + electricityPrice + machineWear + errorMargin;

  // Final Price = total_cost * profit_multiplier
  const finalPrice = totalCost * profitMultiplier;

  // Additional metrics
  const costPerHour = totalCost / printingHours;
  const costPerGram = totalCost / filamentGrams;

  return {
    materialPrice,
    electricityPrice,
    machineWear,
    errorMargin,
    totalCost,
    finalPrice,
    costPerHour,
    costPerGram,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculationInput = await request.json();

    // Validate required fields
    const requiredFields: (keyof CalculationInput)[] = [
      "pricePerKg",
      "pricePerKwh",
      "consumptionWatts",
      "machineWearHours",
      "replacementPrice",
      "errorMarginPercent",
      "printingHours",
      "filamentGrams",
      "profitMultiplier",
    ];

    for (const field of requiredFields) {
      if (typeof body[field] !== "number" || isNaN(body[field])) {
        return NextResponse.json(
          { error: `El campo '${field}' es requerido y debe ser un número válido` },
          { status: 400 }
        );
      }
    }

    // Validate positive values
    if (body.machineWearHours <= 0) {
      return NextResponse.json(
        { error: "Las horas de vida útil de la máquina deben ser mayores a 0" },
        { status: 400 }
      );
    }

    if (body.printingHours <= 0) {
      return NextResponse.json(
        { error: "Las horas de impresión deben ser mayores a 0" },
        { status: 400 }
      );
    }

    if (body.filamentGrams <= 0) {
      return NextResponse.json(
        { error: "Los gramos de filamento deben ser mayores a 0" },
        { status: 400 }
      );
    }

    const result = calculatePrice(body);

    return NextResponse.json({
      success: true,
      input: body,
      result,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la solicitud. Verifique los datos enviados." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de Calculadora de Impresión 3D",
    usage: {
      method: "POST",
      endpoint: "/api/calculate",
      body: {
        pricePerKg: "number - Precio del KG de filamento",
        pricePerKwh: "number - Precio del KWh de electricidad",
        consumptionWatts: "number - Consumo de la impresora en Watts/hora",
        machineWearHours: "number - Vida útil de la máquina en horas",
        replacementPrice: "number - Precio de repuestos de la máquina",
        errorMarginPercent: "number - Porcentaje de margen de error",
        printingHours: "number - Horas de impresión de la pieza",
        filamentGrams: "number - Gramos de filamento utilizados",
        profitMultiplier: "number - Multiplicador de margen de ganancia",
      },
    },
  });
}
