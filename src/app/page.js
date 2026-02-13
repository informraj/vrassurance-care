'use client';

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Clock,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [careType, setCareType] = useState("therapy");
  const [visitType, setVisitType] = useState("virtual");
  const [query, setQuery] = useState("");
  const [stateValue, setStateValue] = useState("Texas");
  const [showSignIn, setShowSignIn] = useState(false);

  const specialties = useMemo(
    () => [
      "Anxiety",
      "Depression",
      "Stress",
      "ADHD",
      "Trauma",
      "Relationships",
      "Grief",
      "Sleep",
      "Self-esteem",
      "Burnout",
    ],
    []
  );

  const providers = useMemo(
    () => [
      {
        name: "Dr. Maya Chen, PsyD",
        title: "Clinical Psychologist",
        tags: ["Anxiety", "Trauma", "CBT"],
        rating: 4.9,
        reviews: 312,
        next: "Tomorrow",
        mode: "Virtual + In‑person",
        price: "$95+ / session",
      },
      {
        name: "Jordan Rivera, LCSW",
        title: "Therapist",
        tags: ["Depression", "Burnout", "Mindfulness"],
        rating: 4.8,
        reviews: 198,
        next: "In 2 days",
        mode: "Virtual",
        price: "$75+ / session",
      },
      {
        name: "Ava Patel, PMHNP",
        title: "Medication Provider",
        tags: ["Medication", "ADHD", "Anxiety"],
        rating: 4.7,
        reviews: 141,
        next: "This week",
        mode: "Virtual",
        price: "$120+ / visit",
      },
      {
        name: "Sam Nguyen, LMFT",
        title: "Couples Therapist",
        tags: ["Relationships", "Communication", "Couples"],
        rating: 4.9,
        reviews: 224,
        next: "Tomorrow",
        mode: "Virtual + In‑person",
        price: "$110+ / session",
      },
      {
        name: "Elena Garcia, LPC",
        title: "Therapist",
        tags: ["Grief", "Stress", "Teens"],
        rating: 4.8,
        reviews: 167,
        next: "In 3 days",
        mode: "In‑person",
        price: "$85+ / session",
      },
      {
        name: "Chris Walker, MD",
        title: "Psychiatrist",
        tags: ["Medication", "Depression", "Sleep"],
        rating: 4.6,
        reviews: 96,
        next: "Next week",
        mode: "Virtual",
        price: "$160+ / visit",
      },
    ],
    []
  );

  const filteredProviders = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = providers.slice();

    if (careType === "therapy") {
      list = list.filter((p) => p.title.toLowerCase().includes("therap") || p.title.toLowerCase().includes("psychologist") || p.title.toLowerCase().includes("couples"));
    }

    if (careType === "meds") {
      list = list.filter((p) => p.tags.join(" ").toLowerCase().includes("medication") || p.title.toLowerCase().includes("psychiat") || p.title.toLowerCase().includes("pmhnp"));
    }

    if (visitType === "virtual") {
      list = list.filter((p) => p.mode.toLowerCase().includes("virtual"));
    }

    if (visitType === "inperson") {
      list = list.filter((p) => p.mode.toLowerCase().includes("in‑person") || p.mode.toLowerCase().includes("in-person"));
    }

    if (q.length > 0) {
      list = list.filter((p) => {
        const blob = (p.name + " " + p.title + " " + p.tags.join(" ") + " " + p.mode).toLowerCase();
        return blob.includes(q);
      });
    }

    return list;
  }, [providers, query, careType, visitType]);

  if (showSignIn) {
    return <SignInPage onBack={() => setShowSignIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 text-foreground">
      <TopNav onSignIn={() => setShowSignIn(true)} />

      <main>
        <Hero
          careType={careType}
          setCareType={setCareType}
          visitType={visitType}
          setVisitType={setVisitType}
          query={query}
          setQuery={setQuery}
          stateValue={stateValue}
          setStateValue={setStateValue}
          specialties={specialties}
        />

        <section className="mx-auto w-full max-w-6xl px-4 pb-10">
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="md:col-span-7">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Providers you can book today</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Directory-style marketplace (UI only). Filter, browse, and book — without the insurance workflow.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">{stateValue}</Badge>
                  <Badge variant="secondary" className="rounded-full">{careType === "therapy" ? "Therapy" : "Medication"}</Badge>
                  <Badge variant="secondary" className="rounded-full">
                    {visitType === "virtual" ? "Virtual" : visitType === "inperson" ? "In‑person" : "Any"}
                  </Badge>
                  <Separator orientation="vertical" className="mx-1 h-5" />
                  <div className="text-xs text-muted-foreground">Showing {filteredProviders.length} matches</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredProviders.map((p, idx) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                    >
                      <ProviderCard provider={p} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-5 space-y-6">
              <TrustCard />
              <HowItWorks />
              <OutcomeCard />
            </div>
          </div>
        </section>

        <SpecialtyStrip specialties={specialties} />
        <Testimonials />
        <FAQ />
        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}

function TopNav({ onSignIn }) {
  return (
    <div className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">VR Assurance</div>
            <div className="text-xs text-muted-foreground">Behavioral Health Services</div>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a className="text-sm text-muted-foreground hover:text-foreground" href="#providers">Find a provider</a>
          <a className="text-sm text-muted-foreground hover:text-foreground" href="#how">How it works</a>
          <a className="text-sm text-muted-foreground hover:text-foreground" href="#faq">FAQ</a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="rounded-full" onClick={onSignIn}>Sign in</Button>
          <Button className="rounded-full">
            Book now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Hero({
  careType,
  setCareType,
  visitType,
  setVisitType,
  query,
  setQuery,
  stateValue,
  setStateValue,
  specialties,
}) {
  const popular = useMemo(() => specialties.slice(0, 6), [specialties]);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-muted blur-3xl" />
        <div className="absolute -bottom-24 right-[-6rem] h-72 w-72 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                <BadgeCheck className="h-4 w-4" />
                Credentialed providers • Enterprise-grade standards
              </div>

              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Mental health care you can trust — <span className="text-muted-foreground">simple, secure, and made for you</span>
              </h1>

              <p className="text-base text-muted-foreground md:text-lg">
                Find licensed therapists and psychiatric providers with transparent pricing and real availability. VR Assurance Care helps you start confidently — without the stress or confusion.
              </p>

              <div id="providers" className="rounded-3xl border bg-background p-4 shadow-sm">
                <div className="grid gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-medium">Start your search</div>
                    <div className="text-xs text-muted-foreground">UI demo • not functional</div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-12">
                    <div className="sm:col-span-7">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search anxiety, couples, ADHD, trauma…"
                          className="h-11 rounded-2xl pl-9"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-5">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={stateValue}
                          onChange={(e) => setStateValue(e.target.value)}
                          placeholder="State (e.g., Texas)"
                          className="h-11 rounded-2xl pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <Card className="rounded-3xl border-dashed">
                      <CardContent className="pt-4">
                        <div className="text-xs text-muted-foreground">Type of care</div>
                        <Tabs value={careType} onValueChange={(v) => setCareType(v)} className="mt-2">
                          <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                            <TabsTrigger value="therapy" className="rounded-2xl">Talk therapy</TabsTrigger>
                            <TabsTrigger value="meds" className="rounded-2xl">Medication</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-dashed">
                      <CardContent className="pt-4">
                        <div className="text-xs text-muted-foreground">Visit preference</div>
                        <Tabs value={visitType} onValueChange={(v) => setVisitType(v)} className="mt-2">
                          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                            <TabsTrigger value="virtual" className="rounded-2xl">Virtual</TabsTrigger>
                            <TabsTrigger value="inperson" className="rounded-2xl">In‑person</TabsTrigger>
                            <TabsTrigger value="any" className="rounded-2xl">Any</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs text-muted-foreground">Popular:</div>
                    {popular.map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-full">{s}</Badge>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />Starts in days</span>
                      <span className="inline-flex items-center gap-1"><Video className="h-4 w-4" />Online sessions</span>
                      <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />Individuals + couples</span>
                    </div>
                    <Button className="rounded-full h-11">
                      View matches
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="grid gap-4"
            >
              <Card className="rounded-3xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">A calmer week starts here</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    A simple dashboard-style preview for progress, goals, and session notes.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <MiniStat icon={<Calendar className="h-4 w-4" />} label="Appointments" value="8" />
                    <MiniStat icon={<HeartHandshake className="h-4 w-4" />} label="Goals in progress" value="2" />
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Anxiety check‑ins</div>
                      <Badge variant="secondary" className="rounded-full">Last 90 days</Badge>
                    </div>
                    <div className="mt-3 grid gap-2">
                      <Bar label="Severe" value={78} />
                      <Bar label="Moderate" value={52} />
                      <Bar label="Mild" value={28} />
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">Visual only — not a clinical measure</div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="rounded-3xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Privacy-first</div>
                        <div className="text-sm text-muted-foreground">Secure messaging and protected info.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Care that adapts</div>
                        <div className="text-sm text-muted-foreground">Switch providers anytime, easily.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-background p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted">{icon}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-background">
        <div className="h-2 rounded-full bg-foreground/20" style={{ width: value + "%" }} />
      </div>
    </div>
  );
}

function ProviderCard({ provider }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{provider.name}</div>
            <div className="text-sm text-muted-foreground">{provider.title}</div>
          </div>
          <div className="rounded-2xl bg-muted px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="font-medium text-foreground">{provider.rating}</span>
              <span>({provider.reviews})</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {provider.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />Next available</div>
            <div className="font-medium">{provider.next}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-muted-foreground"><Video className="h-4 w-4" />Format</div>
            <div className="font-medium">{provider.mode}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-muted-foreground"><Stethoscope className="h-4 w-4" />Typical cost</div>
            <div className="font-medium">{provider.price}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button className="w-full rounded-2xl">View profile</Button>
          <Button variant="outline" className="rounded-2xl">Book</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TrustCard() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Care you can feel confident about</CardTitle>
        <p className="text-sm text-muted-foreground">
          Clear pricing, verified providers, and privacy protections.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <TrustRow icon={<BadgeCheck className="h-4 w-4" />} title="Verified credentials" desc="Licensure + identity checks." />
        <TrustRow icon={<Shield className="h-4 w-4" />} title="Secure experience" desc="Protected messaging and records." />
        <TrustRow icon={<Calendar className="h-4 w-4" />} title="Fast scheduling" desc="Availability shown up front." />
      </CardContent>
    </Card>
  );
}

function TrustRow({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-muted/30 p-3">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-background">{icon}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <Card id="how" className="rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How it works</CardTitle>
        <p className="text-sm text-muted-foreground">A simple three-step flow you can wire up later.</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Step n="1" title="Search" desc="Choose care type, preferences, and needs." />
        <Step n="2" title="Match" desc="Compare profiles, availability, and pricing." />
        <Step n="3" title="Book" desc="Pick a time and confirm in a few clicks." />
      </CardContent>
    </Card>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-sm font-semibold">{n}</div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function OutcomeCard() {
  return (
    <Card className="rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progress you can see</CardTitle>
        <p className="text-sm text-muted-foreground">
          A lightweight dashboard concept for goals, check-ins, and notes.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-2xl border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Today’s focus</div>
            <Badge variant="secondary" className="rounded-full">Sample</Badge>
          </div>
          <div className="mt-2 grid gap-2 text-sm">
            <Row left="Topic" right="Managing overthinking" />
            <Row left="Tool" right="Grounding + reframing" />
            <Row left="Next step" right="Practice 5 minutes/day" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border bg-background p-4">
          <div className="text-sm">
            <div className="font-semibold">Need to switch providers?</div>
            <div className="text-sm text-muted-foreground">Rematch anytime — no awkwardness.</div>
          </div>
          <Button variant="outline" className="rounded-full">Rematch</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ left, right }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground">{left}</div>
      <div className="font-medium">{right}</div>
    </div>
  );
}

function SpecialtyStrip({ specialties }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10">
      <Card className="rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Browse by what you’re dealing with</CardTitle>
          <p className="text-sm text-muted-foreground">Quick entry points into the directory.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <Button key={s} variant="outline" className="rounded-full">
                {s}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Testimonials() {
  const items = useMemo(
    () => [
      {
        quote:
          "I booked my first session in under 10 minutes and found someone who actually matched my vibe.",
        name: "Riley",
        detail: "Virtual therapy",
      },
      {
        quote:
          "Transparent pricing and real availability made this feel way less intimidating than starting from scratch.",
        name: "Sam",
        detail: "In‑person care",
      },
      {
        quote:
          "Loved having profiles, specialties, and next openings all in one spot.",
        name: "Avery",
        detail: "Medication visits",
      },
    ],
    []
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
              <HeartHandshake className="h-4 w-4" />
              Real stories, better starts
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Real people. Real progress. Real support.</h2>
            <p className="text-muted-foreground">
              Everything you need to choose confidently: specialties, approach, pricing, and next availability.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 grid gap-3 sm:grid-cols-2">
          {items.map((t) => (
            <Card key={t.name} className="rounded-3xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <div className="mt-3 text-sm">“{t.quote}”</div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{t.name}</span> • {t.detail}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = useMemo(
    () => [
      {
        q: "Do you offer insurance billing?",
        a: "Not in this version. This UI is built around transparent self-pay pricing (you can add insurance later if you want).",
      },
      {
        q: "Can I do online and in‑person sessions?",
        a: "Yes. Providers can list virtual, in‑person, or both — and you can filter by preference.",
      },
      {
        q: "How fast can I get an appointment?",
        a: "Availability is shown up front so you can book quickly without back-and-forth messages.",
      },
      {
        q: "Can I switch providers if it’s not a fit?",
        a: "Absolutely. The UI includes a rematch concept so people can change providers easily.",
      },
    ],
    []
  );

  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-4 pb-10">
      <Card className="rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">FAQ</CardTitle>
          <p className="text-sm text-muted-foreground">Quick answers for a directory-first experience.</p>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border bg-muted/20 p-4">
              <div className="text-sm font-semibold">{f.q}</div>
              <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <Card className="rounded-3xl">
        <CardContent className="py-10">
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="text-2xl font-semibold tracking-tight">Start feeling better, sooner</h3>
              <p className="mt-2 text-muted-foreground">
                This is a front-end template. Next steps: hook search to your database, add auth, booking, payments, and messaging.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />Scheduling</span>
                <span className="inline-flex items-center gap-1"><MessageCircle className="h-4 w-4" />Messaging</span>
                <span className="inline-flex items-center gap-1"><Shield className="h-4 w-4" />Privacy</span>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2">
              <Button className="h-11 rounded-full">Explore providers</Button>
              <Button variant="outline" className="h-11 rounded-full">Create provider profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              
              <div>
                <div className="text-sm font-semibold tracking-wide">VR Assurance</div>
                <div className="text-xs text-muted-foreground">Behavioral health services powered by VR Assurance</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Consumer-focused mental health care experience built with VR Assurance trust standards.
            </p>
          </div>

          <div className="md:col-span-7 grid gap-6 sm:grid-cols-3">
            <FooterCol title="Product" links={["Find a provider", "How it works", "Pricing", "Support"]} />
            <FooterCol title="Company" links={["About", "Careers", "Privacy", "Terms"]} />
            <FooterCol title="For providers" links={["Join the network", "Profile tips", "Resources", "Contact"]} />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} VR Assurance. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><Shield className="h-4 w-4" />Privacy-first</span>
            <span className="inline-flex items-center gap-1"><BadgeCheck className="h-4 w-4" />Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SignInPage({ onBack }) {
  const countries = [
    { name: "United States", code: "+1" },
    { name: "Canada", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "India", code: "+91" },
    { name: "Australia", code: "+61" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Brazil", code: "+55" },
    { name: "Singapore", code: "+65" },
    { name: "United Arab Emirates", code: "+971" }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [phone, setPhone] = useState("");

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    const match = countries.find((c) => c.name === countryName);
    if (match) {
      setCountryCode(match.code);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-4">
      <Card className="w-full max-w-md rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to VR Assurance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your phone number to receive a verification code.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Country</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="h-11 rounded-2xl border bg-background px-3 text-sm"
            >
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Country code</label>
            <Input
              value={countryCode}
              readOnly
              className="rounded-2xl"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Phone number</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123‑4567"
              className="rounded-2xl"
            />
          </div>

          <Button className="w-full rounded-2xl">
            Send verification code
          </Button>

          <Button
            variant="ghost"
            className="w-full rounded-2xl"
            onClick={onBack}
          >
            Back to home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 grid gap-2">
        {links.map((l) => (
          <a key={l} className="text-sm text-muted-foreground hover:text-foreground" href="#">
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
