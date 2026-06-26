"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"

// --- Helper Functions and Fallbacks ---

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// EduQR default image
const placeholderImage = () => "/eduqrlogo.png"

// --- Types ---
type StaticImageData = string;

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  bgClass?: string
}

interface ImageSet {
  step1img1: StaticImageData
  step1img2: StaticImageData
  step2img1: StaticImageData
  step2img2: StaticImageData
  step3img: StaticImageData
  step4img: StaticImageData
  alt: string
}

interface FeatureCarouselProps extends CardProps {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image?: ImageSet
}

interface StepImageProps {
  src: StaticImageData
  alt: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

interface Step {
  id: string
  name: string
  title: string
  description: string
  bullets: string[]
}

// --- Constants ---
const TOTAL_STEPS = 4

const steps: readonly Step[] = [
  {
    id: "1",
    name: "01 — Kayıt Olun",
    title: "Kayıt Olun",
    description: "E-posta adresinizle saniyeler içinde hesabınızı oluşturun. Kredi kartı gerekmez, teknik bilgi gerekmez.",
    bullets: ["30 saniyede hesap oluştur", "Kredi kartı gerekmez", "Teknik bilgi şart değil"],
  },
  {
    id: "2",
    name: "02 — Menünüzü Kurun",
    title: "Menünüzü Kurun",
    description: "Ürünlerinizi, fiyatlarınızı, görsellerinizi ve alerjen bilgilerini panele girin.",
    bullets: ["Ürün, fiyat ve görsel ekle", "14 alerjen otomatik gösterim", "Telefondan, her yerden yönet"],
  },
  {
    id: "3",
    name: "03 — QR Kodunuzu Alın",
    title: "QR Kodunuzu Alın",
    description: "Tek tıkla QR kodunuz oluşur. Masalara koyun, duvara asın veya dijital ekranda gösterin.",
    bullets: ["Tek tıkla QR kodu oluştur", "Masaya koy, duvara as, ekranda göster", "Menü güncellense QR değişmez"],
  },
  {
    id: "4",
    name: "04 — Yönetmeye Devam Edin",
    title: "Yönetmeye Devam Edin",
    description: "Fiyat değişikliği, yeni ürün, sezonluk güncelleme — hepsini telefonunuzdan yapın.",
    bullets: ["Fiyat değişikliği anında yansır", "Yeni ürün ekle, çıkar, düzenle", "Yasal uyum otomatik sağlanır"],
  },
]

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset
  delay?: number
  onAnimationComplete?: () => void
}

// --- Hooks ---
function useNumberCycler(totalSteps: number = TOTAL_STEPS, interval: number = 6000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback((stepIndex: number) => {
      setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])
  return isMobile
}

// --- Components ---
function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("h-4 w-4", className)} {...props} >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
        onError={(e) => (e.currentTarget.src = placeholderImage())}
        {...props}
      />
    )
  }
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, ...props }: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset]
  return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />
}

const MOBILE_IMAGES = ["/giriş.jpeg", "/screen_ürün.png", "/qr_code.jpeg", "/screen_ürün.png"]

function FeatureCard({ children, step }: { children: React.ReactNode; step: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <motion.div
      className="animated-cards group relative w-full rounded-[2.5rem] p-1"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` } as WrapperStyle}
    >
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-blue-900/5 transition-colors duration-300">
        <div className="m-6 md:m-12 min-h-[300px] md:min-h-[400px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-4 md:w-[38%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-sm font-bold uppercase tracking-widest text-blue-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                  {steps[step].name}
              </motion.div>
              <motion.h2
                className="text-2xl md:text-4xl font-bold tracking-tight text-[#0F1C36]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                {steps[step].title}
              </motion.h2>
              <motion.ul
                className="flex flex-col gap-3 mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                {steps[step].bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    className="flex items-center gap-3 text-base text-gray-600"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-50">
                      <IconCheck className="h-3 w-3 text-blue-600" />
                    </span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>

          {/* Mobil görsel — metin altında */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-${step}`}
              className="md:hidden mt-6 flex justify-center pb-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={MOBILE_IMAGES[step]}
                alt={steps[step].title}
                className="w-[80%] rounded-2xl shadow-xl border border-gray-100 object-cover"
                onError={(e) => (e.currentTarget.src = placeholderImage())}
              />
            </motion.div>
          </AnimatePresence>

          {children}
        </div>
      </div>
    </motion.div>
  )
}

function StepsNav({ steps: stepItems, current, onChange }: { steps: readonly Step[]; current: number; onChange: (index: number) => void; }) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4 w-full">
            <ol className="flex w-full flex-wrap items-center justify-center gap-3 md:gap-6" role="list">
                {stepItems.map((step, stepIdx) => {
                    const isCompleted = current > stepIdx;
                    const isCurrent = current === stepIdx;
                    return (
                        <motion.li key={step.name} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative" >
                            <button
                                type="button"
                                className={cn(
                                    "group flex items-center gap-3 rounded-full px-5 py-2 md:py-3 text-sm md:text-base font-bold transition-all duration-300 shadow-sm",
                                    isCurrent 
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105" 
                                        : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-[#0F1C36]"
                                )}
                                onClick={() => onChange(stepIdx)}
                            >
                                <span className={cn(
                                    "flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                    isCompleted 
                                        ? "bg-white text-blue-600" 
                                        : isCurrent 
                                            ? "bg-white/20 text-white" 
                                            : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                                )}>
                                    {isCompleted ? (
                                        <IconCheck className="h-4 w-4 md:h-5 md:w-5" />
                                    ) : (
                                        <span>{stepIdx + 1}</span>
                                    )}
                                </span>
                                <span className="hidden sm:inline-block">{step.title}</span>
                            </button>
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}

const defaultClasses = {
  img: "rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100",
  step1img1: "w-[45%] left-[50%] top-[10%]",
  step1img2: "w-[40%] left-[65%] top-[40%]",
  step2img1: "w-[45%] left-[55%] top-[15%]",
  step2img2: "w-[35%] left-[65%] top-[45%]",
  step3img: "w-[50%] left-[50%] top-[20%]",
  step4img: "w-[50%] left-[50%] top-[20%]",
} as const

export function FeatureCarousel({
  image,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  ...props
}: FeatureCarouselProps) {
  const { currentNumber: step, setStep } = useNumberCycler()
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="relative w-full h-full hidden md:block">
            <AnimatedStepImage alt="step1" className={cn(defaultClasses.img, "w-[52%] left-[46%] top-[8%]")} src="/giriş.jpeg" preset="slideInLeft" />
          </div>
        )
      case 1:
        return (
          <div className="relative w-full h-full hidden md:block">
            <AnimatedStepImage alt="step2" className={cn(defaultClasses.img, "w-[52%] left-[46%] top-[8%]")} src="/screen_ürün.png" preset="fadeInScale" />
          </div>
        )
      case 2:
        return (
          <div className="relative w-full h-full hidden md:block">
            <AnimatedStepImage alt="step3" className={cn(defaultClasses.img, "w-[52%] left-[46%] top-[8%]")} src="/qr_code.jpeg" preset="fadeInScale" />
          </div>
        )
      case 3:
        return (
          <div className="relative w-full h-full hidden md:block">
            <AnimatedStepImage alt="step4" className={cn(defaultClasses.img, "w-[52%] left-[46%] top-[8%]")} src="/screen_ürün.png" preset="slideInRight" />
          </div>
        )
      default: return null
    }
  }
  return (
    <div className="flex flex-col gap-10 w-full mx-auto relative z-20">
        <FeatureCard {...props} step={step}>
            <AnimatePresence mode="wait">
                <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute inset-0 pointer-events-none">
                    {renderStepContent()}
                </motion.div>
            </AnimatePresence>
        </FeatureCard>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
            <StepsNav current={step} onChange={setStep} steps={steps} />
        </motion.div>
    </div>
  )
}