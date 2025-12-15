"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// --- Types ---
interface ExpenseItem {
  key: string
  value: number
}

interface ExpenseDonutChartProps {
  data: ExpenseItem[]
  title?: string
  description?: string
  currencySymbol?: string
}

export function ExpenseDonutChart({
  data,
  title = "Expense Breakdown",
  description = "Interactive visualization of expenses",
  currencySymbol = "Rp",
}: ExpenseDonutChartProps) {

  // 1. Memoize Total Calculation
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  // 2. Transform & Sort Data (Largest first)
  // Generate dynamic soft colors based on Golden Angle for better distribution
  const chartData = React.useMemo(() => {
    return [...data]
      .sort((a, b) => b.value - a.value)
      .map((item, index) => {
        // Golden Angle approximation for distinct yet cohesive colors
        const hue = (index * 137.5) % 360;
        // HSL: Saturation 60%, Lightness 55% (Adaptive for Dark/Light mode)
        const fillColor = `hsl(${hue}, 60%, 55%)`;

        return {
          category: item.key,
          value: item.value,
          fill: fillColor,
          percentage: ((item.value / totalValue) * 100).toFixed(1),
        }
      })
  }, [data, totalValue])

  // 3. Generate Dynamic Config for Recharts/Shadcn
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: { label: "Expense" },
    }
    chartData.forEach((item) => {
      config[item.category] = {
        label: item.category,
        color: item.fill,
      }
    })
    return config
  }, [chartData])

  // 4. State for Interactive Center Label
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  // Helper to format currency
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 3,
    }).format(val)

  return (
    <Card className="flex flex-col h-full shadow-lg border-border/50">
      <CardHeader className="items-center pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={80}
              strokeWidth={4}
              activeIndex={activeIndex ?? undefined}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              // Custom active shape to make the hovered slice "pop" slightly
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 8} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    // --- HOVER STATE ---
                    if (activeIndex !== null && chartData[activeIndex]) {
                      const activeItem = chartData[activeIndex];
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {/* Line 1: Category Name */}
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 18}
                            className="fill-muted-foreground text-xs font-medium"
                          >
                            {activeItem.category}
                          </tspan>
                          {/* Line 2: Amount */}
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-foreground text-xl font-bold"
                          >
                            {formatCurrency(activeItem.value)}
                          </tspan>
                          {/* Line 3: Percentage */}
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            {activeItem.percentage}%
                          </tspan>
                        </text>
                      )
                    }

                    // --- DEFAULT STATE (Total) ---
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatCurrency(totalValue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm font-medium"
                        >
                          Total Expenses
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Scrollable List for detailed breakdown. */}
      <CardFooter className="flex-col gap-2 pt-4">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Category</span>
          <span>Amount (%)</span>
        </div>
        <Separator className="mb-2" />

        <ScrollArea className="h-[160px] w-full pr-4">
          <div className="flex flex-col gap-3">
            {chartData.map((item) => (
              <div
                key={item.category}
                className={`flex items-center justify-between text-sm transition-opacity duration-200 ${activeIndex !== null && activeIndex !== chartData.indexOf(item)
                    ? "opacity-30"
                    : "opacity-100"
                  }`}
                onMouseEnter={() => setActiveIndex(chartData.indexOf(item))}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full shadow-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium truncate max-w-[120px]" title={item.category}>
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-muted-foreground">
                  <span>{new Intl.NumberFormat('id-ID').format(item.value)}</span>
                  <span className="text-xs bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center gap-2 text-xs leading-none text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Top expense: <span className="font-medium text-foreground">{chartData[0]?.category}</span> ({chartData[0]?.percentage}%)</span>
        </div>
      </CardFooter>
    </Card>
  )
}