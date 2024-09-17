'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, File, Folder, FolderOpen, Users, Target, Trophy, Sword, Castle, UserCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'
import Image from "next/image"
import BlurFade from "@/components/magicui/blur-fade"
import WordFadeIn from "@/components/magicui/word-fade-in"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Link as ScrollLink } from 'react-scroll'

const TypewriterEffect = ({ text, className, isOpen = true }: { text: string; className?: string; isOpen?: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setDisplayText('');
      setIndex(0);
      return;
    }

    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 70);

      return () => clearTimeout(timer);
    } else {
      // Reiniciar el efecto después de completar
      setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 2000);
    }
  }, [isOpen, text, index]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

const GlassButton = ({ children, className = "", ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    className={`relative bg-opacity-20 backdrop-filter backdrop-blur-lg bg-[#4ade80] text-[#e0f2e9] border border-[#4ade80] hover:bg-opacity-30 transition-all duration-300 rounded-none ${className}`}
    style={{
      boxShadow: '0 4px 6px rgba(74, 222, 128, 0.1), 0 1px 3px rgba(74, 222, 128, 0.08)',
    }}
    {...props}
  >
    {children}
    <BorderBeam
      className="absolute inset-0"
      size={150}
      duration={2000}
      delay={500}
      colorFrom="rgba(74, 222, 128, 0.8)"
      colorTo="rgba(74, 222, 128, 0)"
    />
  </Button>
)

const NavItem = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
  >
    <Button variant="ghost" className="text-[#e0f2e9] hover:text-[#4ade80] hover:bg-transparent">
      <a href={href}>{children}</a>
    </Button>
  </motion.div>
)

type TreeViewElement = {
  id: string
  name: string
  children?: TreeViewElement[]
}

type TreeProps = {
  data: TreeViewElement[]
}

const TreeNode: React.FC<{ node: TreeViewElement; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(level <= 1)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 p-2 hover:bg-gray-700/50 cursor-pointer",
          isOpen && "bg-gray-700/30"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          <>
            <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
            {isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
          </>
        ) : (
          <File className="h-4 w-4 ml-6" />
        )}
        <span>{node.name}</span>
      </div>
      {(isOpen || level <= 1) && hasChildren && (
        <div className="ml-4">
          {node.children?.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div className="w-full">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} level={0} />
      ))}
    </div>
  )
}

function WhyPlaySection() {
  const reasons = [
    {
      title: "Epic PvP Battles",
      description: "Engage in massive clan wars, siege epic castles, and prove your worth in intense player-vs-player combat. Lineage 2 offers a robust PvP system that rewards skill, strategy, and teamwork.",
      icon: <Sword className="w-12 h-12" />,
      details: [
        "Participate in large-scale siege warfare",
        "Join or create powerful clans",
        "Compete in thrilling arena battles",
        "Engage in open-world PvP encounters"
      ]
    },
    {
      title: "Rich Fantasy World",
      description: "Immerse yourself in a vast, beautifully crafted fantasy realm filled with lore, quests, and adventure. Explore diverse landscapes, from lush forests to treacherous dungeons.",
      icon: <Castle className="w-12 h-12" />,
      details: [
        "Discover hidden treasures and rare artifacts",
        "Uncover the rich lore of the Lineage universe",
        "Complete epic questlines and story arcs",
        "Visit stunning, varied environments"
      ]
    },
    {
      title: "Class Diversity",
      description: "Choose from a wide array of unique classes, each with its own playstyle, skills, and role in group dynamics. Master your chosen class and become an indispensable part of your team.",
      icon: <UserCircle2 className="w-12 h-12" />,
      details: [
        "Experiment with multiple class options",
        "Develop unique skill combinations",
        "Progress through class advancements",
        "Fulfill crucial roles in party gameplay"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center server-section">
      <div className="container mx-auto py-32 px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center">Why Should We Play Lineage 2?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col items-center text-center p-6 rounded-xl backdrop-blur-md bg-[#1a3f35]/50 h-full overflow-hidden"
            >
              <BorderBeam
                className="pointer-events-none"
                size={300}
                duration={15}
                anchor={90}
                borderWidth={1.5}
                colorFrom="#4ade80"
                colorTo="#22c55e"
                delay={index * 0.5}
              />
              <div className="text-[#4ade80] mb-4">{reason.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
              <p className="mb-6">{reason.description}</p>
              <div className="w-full h-px bg-[#4ade80] my-6"></div>
              <ul className="text-left w-full">
                {reason.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <div className="mr-2 text-[#4ade80]">
                      {idx === 0 ? <Users className="w-4 h-4" /> :
                       idx === 1 ? <Target className="w-4 h-4" /> :
                       idx === 2 ? <Trophy className="w-4 h-4" /> :
                       <Sword className="w-4 h-4" />}
                    </div>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LineageLandingPageComponent() {
  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined)

  const handleItemToggle = (value: string) => {
    setAccordionValue(value)
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(error => console.error('Error al reproducir el video:', error));
    } else {
      video.pause();
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [inView]);

  const treeData: TreeViewElement[] = [
    {
      id: "root",
      name: "lineage-2-jade",
      children: [
        {
          id: "download",
          name: "download",
          children: [
            {
              id: "interlude-client",
              name: "interlude-client",
              children: [
                { id: "google-drive", name: "google-drive.md" },
                { id: "mediafire", name: "mediafire.md" },
                { id: "mega", name: "mega.md" },
              ],
            },
            {
              id: "patch",
              name: "patch",
              children: [
                { id: "patch-google-drive", name: "google-drive.md" },
                { id: "patch-mediafire", name: "mediafire.md" },
                { id: "patch-mega", name: "mega.md" },
              ],
            },
            { id: "download-readme", name: "README.md" },
          ],
        },
        {
          id: "install",
          name: "install",
          children: [
            { id: "delete-system-folder", name: "delete-system-folder.md" },
            { id: "extract-patch", name: "extract-patch.md" },
            { id: "replace-files", name: "replace-files.md" },
            { id: "run-game", name: "run-game.md" },
            { id: "create-account", name: "create-account.md" },
          ],
        },
        {
          id: "patches",
          name: "patches",
          children: [
            { id: "patch-15-08", name: "patch-15-08.zip" },
            { id: "patches-readme", name: "README.md" },
          ],
        },
        { id: "main-readme", name: "README.md" },
        { id: "gitignore", name: ".gitignore" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2922] to-[#1a3f35] text-[#e0f2e9] font-['Excon'] overflow-hidden">
      <style jsx global>{`
        @import url('https://api.fontshare.com/v2/css?f[]=excon@400,700&display=swap');

        .sticky-section {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .server-section {
          position: relative;
        }

        .server-section:after {
          content: "";
          position: absolute;
          z-index: 2;
          left: 0px;
          top: -7px;
          width: 100%;
          height: 13px;
          text-align: center;
          background: url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/border_bg-YCqdcpYJjgFHTk1uLd2dsMsWmfcvSB.png") center center repeat-x;
        }

        .server-section:before {
          content: "";
          position: absolute;
          z-index: 2;
          left: 0px;
          bottom: -7px;
          width: 100%;
          height: 13px;
          text-align: center;
          background: url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/border_bg-YCqdcpYJjgFHTk1uLd2dsMsWmfcvSB.png") center center repeat-x;
        }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-[#0f2922]/80 to-[#1a3f35]/80 backdrop-blur-md shadow-md">
          <div className="container mx-auto px-4">
            <div className="py-4 flex justify-between items-center">
              <motion.div
                className="relative"
                initial={{ filter: "drop-shadow(0 0 0.5rem #4ade80)" }}
                animate={{ filter: "drop-shadow(0 0 0.75rem #4ade80)" }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  filter: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  scale: { duration: 0.2 }
                }}
              >
                <img 
                  src="https://i.imgur.com/0Qt9MjV.png" 
                  alt="Lineage Logo" 
                  className="h-[52.8px]"
                />
              </motion.div>
              <nav className="flex items-center space-x-6">
                <NavItem href="#home">HOME</NavItem>
                <NavItem href="#download">DOWNLOAD</NavItem>
                <NavItem href="#about">ABOUT</NavItem>
                <NavItem href="#support">SUPPORT</NavItem>
                <motion.div>
                  <GlassButton
                    onClick={() => window.open('https://l2jade.com.ar/panel/registro', '_blank', 'noopener,noreferrer')}
                  >
                    ACCOUNT PANEL / REGISTER
                  </GlassButton>
                </motion.div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>
        <BlurFade>
          <section id="home" className="sticky-section server-section" ref={ref}>
            <div className="relative h-screen overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/Hero.mp4"
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f2922]/50 to-[#1a3f35]/50 flex flex-col justify-center items-center text-center">
                <div className="space-y-8">
                  <div className="h-32 flex items-center justify-center">
                    <WordFadeIn
                      words="INTERLUDE X30"
                      className="text-6xl font-bold text-[#e0f2e9]"
                      delay={0.1}
                    />
                  </div>
                  <div className="h-16 flex items-center justify-center">
                    <TypewriterEffect
                      text="Enter the Epic Fantasy World of Lineage II"
                      className="text-2xl text-[#e0f2e9]"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 4 }}
                  >
                    <ScrollLink to="about-section" smooth={true} duration={500}>
                      <GlassButton className="text-xl px-8 py-4 cursor-pointer">
                        START YOUR ADVENTURE
                      </GlassButton>
                    </ScrollLink>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade>
          <section className="sticky-section server-section">
            <WhyPlaySection />
          </section>
        </BlurFade>

        <BlurFade>
          <section id="about-section" className="sticky-section server-section">
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#1a3f35] to-[#2a5f55]">
              <div className="container mx-auto py-32 pb-64 px-4 relative z-10 h-full flex flex-col justify-center">
                <div className="w-full max-w-3xl mx-auto">
                  <h2 className="text-4xl font-bold mb-8 text-center">L2Jade Server Information</h2>
                  <Accordion 
                    type="single" 
                    collapsible 
                    className="w-full space-y-4"
                    value={accordionValue}
                    onValueChange={handleItemToggle}
                  >
                    <AccordionItem value="item-1" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Qué tipo de servidor es L2Jade?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text="Es un servidor PvP basado en Lineage II Interlude C6 con rates x30 y una comunidad activa enfocada en PvP y asedios."
                          isOpen={accordionValue === 'item-1'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Cuáles son las principales características del servidor?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text={`• Buffs gratuitos con duración larga.
                                  • GM Shop hasta grado S.
                                   Automatización: habilidades automáticas y recolección de loot.
                                  • Multi-Boxing: se permiten hasta 3 clientes por PC.
                                  • Subclases acumulativas y cambio de clase gratuito.`}
                          isOpen={accordionValue === 'item-2'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Cómo funcionan los rates del servidor?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text={`• EXP/SP: x30
                                   Adena: x40
                                  • Drop de items: x1`}
                          isOpen={accordionValue === 'item-3'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Qué eventos y competencias ofrece el servidor?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text={`• Olimpiadas cada 15 días.
                                  • Asedios semanales.
                                  • Raids épicos con participación de clanes.
                                  • Eventos especiales de temporada.`}
                          isOpen={accordionValue === 'item-4'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Cómo es la experiencia de leveo y progresión?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text="El servidor permite una progresión rápida gracias a sus altos rates y buffs gratuitos. La recolección de items está automatizada, lo que mejora la experiencia en PvE."
                          isOpen={accordionValue === 'item-5'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Qué hay sobre la tienda del servidor?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text="La GM Shop permite comprar equipos hasta grado S, facilitando el acceso a gear competitivo."
                          isOpen={accordionValue === 'item-6'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">¿Qué opciones ofrece el sistema de PvP?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text={`• PvP masivo con eventos periódicos.
                                  • Balance entre clases para asegurar combates justos.
                                  • Equipamiento fácil de obtener para asegurar una rápida entrada a PvP competitivo.`}
                          isOpen={accordionValue === 'item-7'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8" className="border border-[#4ade80] overflow-hidden backdrop-blur-md bg-[#1a3f35]/50">
                      <AccordionTrigger className="px-6 py-4 hover:bg-[#2a5f55]/50 transition-colors">Qué tipo de comunidad tiene el servidor?</AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-[#0f2922]/50">
                        <TypewriterEffect 
                          text="L2Jade tiene una comunidad activa y competitiva, con enfoque en clanes y alianzas, especialmente en los eventos de asedios y PvP."
                          isOpen={accordionValue === 'item-8'}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade>
          <section id="download" className="sticky-section server-section">
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#1a3f35] to-[#2a5f55]">
              <div className="container mx-auto py-12 px-4 relative z-30">
                <div className="w-full lg:flex lg:justify-center lg:gap-8 items-start">
                  <div className="hidden lg:block relative overflow-hidden w-full max-w-[500px]">
                    <div className="aspect-auto relative">
                      <Image
                        src="https://i.imgur.com/NVwJoID.png"
                        alt="Lineage 2 Orc Fighter character with muscular build, wearing tribal armor and holding a large axe"
                        layout="responsive"
                        width={500}
                        height={700}
                        objectFit="contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-center py-12 lg:py-0">
                    <div className="server-section w-full max-w-[500px] bg-[#1a3f35]/50 p-6 border-2 border-[#4ade80] shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                      <Tree data={treeData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        <BlurFade>
          <section id="support" className="sticky-section server-section" style={{ height: '40vh' }}>
            <div className="relative h-full w-full overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/videos/Contacto.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center relative z-10">
                  <h2 className="text-xl font-semibold mb-2"> Problemas con tu cuenta, donación o simplemente quieres hablar con soporte?</h2>
                  <h3 className="text-3xl font-bold mb-4">Contactanos</h3>
                  <GlassButton>
                    Haz click aqui
                  </GlassButton>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>
      </main>

      <footer className="bg-gradient-to-b from-[#0f2922] to-[#1a3f35] py-8 server-section">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <img 
                src="https://i.imgur.com/0Qt9MjV.png" 
                alt="Lineage Logo" 
                className="h-12 filter drop-shadow-[0_0_0.75rem_#4ade80]"
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center text-sm">
            <p>&copy; 2023 Lineage. All rights reserved.</p>
            <p>Terms of Service | Privacy Policy | Refund Policy</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
