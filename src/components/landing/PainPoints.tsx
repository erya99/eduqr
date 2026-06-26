'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Activity, ArrowRight, ShieldCheck, Headphones, TrendingUp, MapPin } from 'lucide-react'
import DottedMap from 'dotted-map'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card } from '@/components/ui/card'
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

export default function PainPoints() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], ["80px", "0px"]);

  const featuredCasestudy = {
    tags: 'Sürekli İletişim',
    title: 'İşletmeniz Her An Kontrolünüzde',
    subtitle: 'tüm bildirimler ve müşteri hareketleri anında panelinizde.',
  }

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] pb-10 px-3 md:px-5">
      <motion.div
        style={{ y: cardY }}
        className="rounded-[1.5rem] md:rounded-[2rem] bg-[#0F1C36] overflow-hidden py-24"
      >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-semibold mb-2">
              <Activity className="w-4 h-4" /> Verilerle Konuşuyoruz
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Neden <span className="text-blue-300">EduQR?</span>
            </h2>
          </div>
          <p className="text-lg text-white/50 max-w-md md:text-right">
            Sadece bir QR kod değil; işletmenizi modernleştiren, maliyetleri düşüren ve satışları artıran eksiksiz bir teknoloji altyapısı.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-0 overflow-hidden rounded-[2rem] border border-[#0F1C36]/10 bg-white shadow-none shadow-blue-900/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >

          {/* 1. MAP - Top Left */}
          <div className="relative overflow-hidden bg-white/60 border-b md:border-r border-[#0F1C36]/10 p-8 md:p-10">
            <div className="flex items-center gap-2 text-sm text-[#0F1C36]/60 font-medium mb-4">
              <MapPin className="w-4 h-4 text-blue-600" />
              Türkiye Geneli Kapsama
            </div>
            <h3 className="text-2xl font-bold text-[#0F1C36]">
              Tüm Türkiye'de Kullanımda.{" "}
              <span className="text-[#0F1C36]/50 font-normal">Kesintisiz, hızlı ve güvenilir bulut altyapısı.</span>
            </h3>

            <div className="relative mt-8">
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-white text-[#0F1C36] rounded-full text-xs font-bold shadow-md flex items-center gap-2 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Sistem %100 Çevrimiçi
              </div>
              <Map />
            </div>
          </div>

          {/* 2. FEATURED MESSAGE BLOCK - Top Right */}
          <div className="flex flex-col justify-between gap-6 p-8 md:p-10 border-b border-[#0F1C36]/10 bg-white">
            <div>
              <span className="flex items-center gap-2 text-sm text-[#0F1C36]/60 font-medium mb-4">
                <TrendingUp className="w-4 h-4 text-orange-500" /> {featuredCasestudy.tags}
              </span>
              <h3 className="text-2xl font-bold text-[#0F1C36]">
                {featuredCasestudy.title}{" "}
                <span className="text-[#0F1C36]/50 font-normal">{featuredCasestudy.subtitle}</span>
              </h3>
            </div>
            <div className="flex justify-center items-center w-full mt-4">
              <RuixenFeaturedMessageCard />
            </div>
          </div>

          {/* 3. CHART - Bottom Left */}
          <div className="border-b md:border-b-0 md:border-r border-[#0F1C36]/10 bg-white/60 p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#0F1C36]/60 font-medium mb-4">
              <Activity className="w-4 h-4 text-green-600" />
              EduQR İstatistikleri
            </div>
            <h3 className="text-2xl font-bold text-[#0F1C36]">
              Siparişlerinizde %30 Artış.{" "}
              <span className="text-[#0F1C36]/50 font-normal">Görsel menülerin gücüyle satışlarınızı ivmelendirin.</span>
            </h3>
            <div className="mt-4">
              <MonitoringChart />
            </div>
          </div>

          {/* 4. ALL FEATURE CARDS - Bottom Right */}
          <div className="grid sm:grid-cols-2 bg-white h-full">
            <FeatureCard
              icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
              title="Yasal Uyum"
              subtitle="Ceza Riskini Sıfırlayın"
              description="Alerjen bildirimi ve fiyat etiketi yönetmeliğine %100 uyumludur."
            />
            <FeatureCard
              icon={<Headphones className="w-5 h-5 text-orange-500" />}
              title="7/24 Kesintisiz"
              subtitle="Teknik Destek"
              description="Her an yanınızdayız. Sorularınız için uzman ekibimiz daima hazır."
              borderLeft
            />
          </div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  )
}

// ----------------- Feature Card Component -------------------
function FeatureCard({ icon, title, subtitle, description, borderLeft = false }: { icon: React.ReactNode, title: string, subtitle: string, description: string, borderLeft?: boolean }) {
  return (
    <motion.div
      className={cn("relative flex flex-col gap-4 p-8 md:p-10 bg-white transition group overflow-hidden h-full", borderLeft && "sm:border-l border-[#0F1C36]/10")}
      whileHover={{ backgroundColor: "#f8faff", transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-4">
        <div>
          <span className="flex items-center gap-2 text-sm text-[#0F1C36]/60 font-semibold mb-3">
            <div className="w-8 h-8 rounded-lg bg-white/60 border border-gray-100 flex items-center justify-center">
              {icon}
            </div>
            {title}
          </span>
          <h3 className="text-xl font-bold text-[#0F1C36]">
            {subtitle}
          </h3>
          <p className="text-[#0F1C36]/60 text-sm mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 right-4 p-3 flex items-center justify-center gap-2 border border-gray-100 rounded-full bg-white shadow-sm z-10"
        whileHover={{ rotate: -45, backgroundColor: "#eff6ff", transition: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        <ArrowRight className="w-4 h-4 text-blue-600" />
      </motion.div>
    </motion.div>
  )
}

// ----------------- Map -------------------
const map = new DottedMap({ height: 50, grid: 'diagonal' })
const points = map.getPoints()

const Map = () => (
  <svg viewBox="0 0 120 50" className="w-full h-auto text-[#0F1C36]/40">
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.2} fill="currentColor" />
    ))}
  </svg>
)

// ----------------- Chart -------------------
const chartData = [
  { month: 'Oca', ciro: 120 },
  { month: 'Şub', ciro: 150 },
  { month: 'Mar', ciro: 180 },
  { month: 'Nis', ciro: 250 },
  { month: 'May', ciro: 220 },
  { month: 'Haz', ciro: 380 },
]

const chartConfig = {
  ciro: {
    label: 'Ciro Artışı',
    color: '#2563eb', // Primary Blue
  },
} satisfies ChartConfig

function MonitoringChart() {
  return (
    <ChartContainer className="h-48 md:h-60 aspect-auto" config={chartConfig}>
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillCiro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-ciro)" stopOpacity={0.4} />
            <stop offset="90%" stopColor="var(--color-ciro)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis hide />
        <YAxis hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-white border-gray-100 shadow-lg text-white" />} />
        <Area strokeWidth={3} dataKey="ciro" type="monotone" fill="url(#fillCiro)" stroke="var(--color-ciro)" />
      </AreaChart>
    </ChartContainer>
  )
}

interface Message {
  title: string;
  time: string;
  content: string;
  color: string;
}

const messages: Message[] = [
    {
      title: "Gizli Şikayet",
      time: "1 dk önce",
      content: "Masa 4'ten yeni bir şikayet bildirimi geldi.",
      color: "from-red-400 to-rose-600",
    },
    {
      title: "Fiyat Güncellemesi",
      time: "5 dk önce",
      content: "Tüm içecek fiyatları başarıyla güncellendi.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Alerjen Uyarısı",
      time: "12 dk önce",
      content: "Mercimek Çorbası'nda gluten içeriği güncellendi.",
      color: "from-orange-400 to-amber-600",
    },
    {
      title: "Sistem Raporu",
      time: "30 dk önce",
      content: "Menünüz bugün 142 kez görüntülendi.",
      color: "from-emerald-400 to-green-600",
    },
  ];

const RuixenFeaturedMessageCard = () => {
  return (
    <div className="w-full h-[240px] bg-white p-2 overflow-hidden font-sans relative border border-gray-100 rounded-xl shadow-inner">
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
      
      <div className="space-y-3 relative z-0 mt-2 px-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 items-center p-3 border border-gray-100 rounded-xl bg-white/60 shadow-sm transform transition duration-300 ease-in-out cursor-pointer hover:bg-white hover:shadow-md animate-scaleUp`}
            style={{
              animationDelay: `${i * 300}ms`,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <div
              className={`w-10 h-10 min-w-[2.5rem] rounded-full bg-gradient-to-br ${msg.color} shadow-sm`}
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F1C36]/80">
                {msg.title}
                <span className="text-[10px] text-[#0F1C36]/60 font-medium">
                  {msg.time}
                </span>
              </div>
              <p className="text-xs text-[#0F1C36]/60 mt-1 line-clamp-1">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ----------------- Recharts Customization Block (Embedded directly from installed component) -----------------
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = { config: ChartConfig }
const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"] }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)
  if (!colorConfig.length) return null
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  }).join("\n")}
}
`).join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip as React.FC<RechartsPrimitive.TooltipProps<any, any>>

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  {
    active?: boolean; payload?: Array<any>; label?: React.ReactNode; labelFormatter?: (label: any, payload: Array<any>) => React.ReactNode; labelClassName?: string; formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode; color?: string; hideLabel?: boolean; hideIndicator?: boolean; indicator?: "line" | "dot" | "dashed"; nameKey?: string; labelKey?: string
  } & React.ComponentProps<"div">
>(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
  const { config } = useChart()
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null
    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value = !labelKey && typeof label === "string" ? config[label as keyof typeof config]?.label || label : itemConfig?.label
    if (labelFormatter) return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
    if (!value) return null
    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

  if (!active || !payload?.length) return null
  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div ref={ref} className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color
          return (
            <div key={item.dataKey} className={cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center")}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (<itemConfig.icon />) : (!hideIndicator && (
                    <div className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", { "h-2.5 w-2.5": indicator === "dot", "w-1": indicator === "line", "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", "my-0.5": nestLabel && indicator === "dashed" })} style={{ "--color-bg": indicatorColor, "--color-border": indicatorColor } as React.CSSProperties} />
                  ))}
                  <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltip"

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined
  const payloadObj = payload as Record<string, unknown>
  const payloadPayload = "payload" in payloadObj && typeof payloadObj.payload === "object" && payloadObj.payload !== null ? payloadObj.payload as Record<string, unknown> : undefined
  let configLabelKey: string = key
  if (key in payloadObj && typeof payloadObj[key] === "string") configLabelKey = payloadObj[key] as string
  else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key] as string
  return configLabelKey in config ? config[configLabelKey] : config[key] as unknown as (typeof config)[keyof typeof config] | undefined
}
