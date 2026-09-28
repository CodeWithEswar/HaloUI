"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  Layers01Icon,
  CpuIcon,
  SecurityCheckIcon,
  Globe02Icon,
  Analytics01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

export function CarouselDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Liquid Glass Floating Controls */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Liquid Glass Floating Controls
          </h3>
          <p className="text-sm text-muted-foreground">
            Hero composition with inset glass buttons, specular rim reflections, and accessible pill pagination dots.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/10 via-sky-500/5 to-indigo-500/10 dark:from-slate-950/80 dark:via-sky-950/20 dark:to-indigo-950/30 border border-border/50">
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((num) => (
                <CarouselItem key={num}>
                  <div className="p-8 rounded-2xl border border-white/15 bg-card/60 backdrop-blur-xl shadow-md flex flex-col justify-between h-[200px]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold uppercase text-primary">
                        SHOWCASE // 0{num}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        Liquid Glass
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">
                        Optical Depth Layering {num}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        10-layer physical optical engine delivering crisp contrast across dynamic backdrops.
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious position="inset" variant="glass" />
            <CarouselNext position="inset" variant="glass" />
            <CarouselDots className="mt-3" />
          </Carousel>
        </div>
      </section>

      {/* 2. Multi-Item Responsive Slider */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Multi-Item Responsive Track
          </h3>
          <p className="text-sm text-muted-foreground">
            Slides scale intrinsically: 1 slide on phone, 2 on tablet, and 3 on desktop (`basis-full sm:basis-1/2 lg:basis-1/3`).
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {[
              { title: "Stat Card", desc: "Compact quantitative KPI summary", tag: "Data Display 02" },
              { title: "Code Block", desc: "Line highlighted code presentation", tag: "Data Display 22" },
              { title: "JSON Viewer", desc: "Interactive tree hierarchy inspector", tag: "Data Display 23" },
              { title: "Diff Viewer", desc: "Unified and split comparison", tag: "Data Display 24" },
              { title: "Tree View", desc: "WAI-ARIA 1.2 roving tabindex tree", tag: "Data Display 25" },
            ].map((item, idx) => (
              <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-5 rounded-xl border border-border/80 bg-card/70 backdrop-blur-xs flex flex-col justify-between h-[150px]">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{item.tag}</span>
                    <h5 className="font-semibold text-sm text-foreground mt-1">{item.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  <span className="text-xs font-medium text-primary hover:underline cursor-pointer">
                    Explore component &rarr;
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious position="inset" />
          <CarouselNext position="inset" />
          <CarouselDots className="mt-3" />
        </Carousel>
      </section>

      {/* 3. Customer Testimonials */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Customer Endorsements
          </h3>
          <p className="text-sm text-muted-foreground">
            Editorial testimonials with quotes and author identity tokens.
          </p>
        </div>

        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {[
              {
                quote: "HaloUI completely transformed our developer platform. The optical depth feels Apple-grade without sacrificing readability.",
                author: "Sarah Lin",
                role: "VP of Product at Veloce",
              },
              {
                quote: "The source-ownership model gave our engineering team full control over the registry components without third-party vendor lock-in.",
                author: "Marcus Vance",
                role: "Staff Infrastructure Engineer",
              },
              {
                quote: "Container-aware responsiveness is truly production-ready. Our cards work flawlessly inside sidebars down to 240px.",
                author: "Elena Rostova",
                role: "Design System Lead",
              },
            ].map((t, idx) => (
              <CarouselItem key={idx}>
                <div className="p-8 rounded-2xl border border-border/70 bg-muted/20 text-center space-y-4">
                  <p className="text-base sm:text-lg font-medium text-foreground italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious position="inset" />
          <CarouselNext position="inset" />
          <CarouselDots className="mt-2" />
        </Carousel>
      </section>

      {/* 4. Vertical Slide Orientation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Vertical Orientation (`orientation="vertical"`)
          </h3>
          <p className="text-sm text-muted-foreground">
            Vertical navigation with up/down keyboard controls and rotated liquid glass buttons.
          </p>
        </div>

        <div className="flex justify-center">
          <Carousel
            orientation="vertical"
            className="w-full max-w-md h-[220px]"
          >
            <CarouselContent className="h-[220px]">
              {[1, 2, 3].map((num) => (
                <CarouselItem key={num} className="pt-4 basis-full">
                  <div className="p-6 rounded-xl border border-border/80 bg-card/80 flex flex-col justify-center items-center text-center h-[180px]">
                    <span className="text-xs font-semibold text-primary uppercase">Vertical Step 0{num}</span>
                    <h5 className="text-base font-bold text-foreground mt-1">Sequential Step {num}</h5>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Swipe up or use ArrowUp / ArrowDown keys to cycle through vertical stages.
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious position="inset" />
            <CarouselNext position="inset" />
          </Carousel>
        </div>
      </section>

      {/* 5. Nested Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Nested Inside Dashboard Card
          </h3>
          <p className="text-sm text-muted-foreground">
            Embedded inside a standard Card container to demonstrate clean material containment.
          </p>
        </div>

        <Card className="max-w-xl mx-auto">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <HaloIcon icon={Globe02Icon} size={16} className="text-primary" />
              <CardTitle className="text-sm">Global Regional Health</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Live status across primary cloud regions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Carousel className="w-full">
              <CarouselContent>
                {[
                  { region: "us-east-1 (N. Virginia)", latency: "24ms", status: "Operational" },
                  { region: "eu-west-1 (Ireland)", latency: "38ms", status: "Operational" },
                  { region: "ap-northeast-1 (Tokyo)", latency: "82ms", status: "Degraded" },
                ].map((r, idx) => (
                  <CarouselItem key={idx}>
                    <div className="px-11 py-3.5 rounded-lg bg-muted/40 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-foreground">{r.region}</div>
                        <div className="text-xs text-muted-foreground">Average RTT: {r.latency}</div>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                        {r.status}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious position="inset" size="icon-xs" />
              <CarouselNext position="inset" size="icon-xs" />
              <CarouselDots className="mt-2" />
            </Carousel>
          </CardContent>
        </Card>
      </section>

      {/* 6. Micro-Container Reflow (240px – 320px) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Micro-Container Reflow (240px – 320px)
          </h3>
          <p className="text-sm text-muted-foreground">
            Automatic container query `@container/carousel` keeps controls safely tucked inside without blowing out narrow sidebars.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-[240px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 240px
            </span>
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2].map((i) => (
                  <CarouselItem key={i}>
                    <div className="px-9 py-3.5 rounded-lg border border-border bg-card text-center text-xs font-medium">
                      Mini Slide {i}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious position="inset" size="icon-xs" />
              <CarouselNext position="inset" size="icon-xs" />
              <CarouselDots className="mt-1" />
            </Carousel>
          </div>

          <div className="w-[300px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 300px
            </span>
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2].map((i) => (
                  <CarouselItem key={i}>
                    <div className="px-9 py-3.5 rounded-lg border border-border bg-card text-center text-xs font-medium">
                      Micro Tile {i}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious position="inset" size="icon-xs" />
              <CarouselNext position="inset" size="icon-xs" />
              <CarouselDots className="mt-1" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
