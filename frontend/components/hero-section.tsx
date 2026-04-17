"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, clearError } from "@/store/slices/authSlice";
import { SiteText, getImageUrl } from "@/lib/content";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DEFAULTS: SiteText = {
  hero_title: "FITNESS\nGOALS",
  hero_subtitle1: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  hero_subtitle2: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  hero_button_text: "Fill Form",
  hero_image:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anastase-maragos-ehQimz6-1qM-unsplash%201-GdqLOCVXElCrEmbSonGZfnAdIqozNH.png",
};

export function HeroSection() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState<SiteText>(DEFAULTS);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    phone: "",
    goal: "",
    experience: "",
  });

  useEffect(() => {
    fetch(`${API}/content/text/hero`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setText((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender || undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        height: form.height ? Number(form.height) : undefined,
        goal: form.goal || undefined,
        experience: form.experience || undefined,
      }),
    );
    if (registerUser.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    }
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      dispatch(clearError());
      setSuccess(false);
    }
  };

  const heroImage = getImageUrl(text.hero_image) || DEFAULTS.hero_image;
  const titleLines = (text.hero_title || DEFAULTS.hero_title).split("\n");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Blur overlay when dialog is open */}
      {open && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm transition-all duration-300"
          style={{ pointerEvents: "none" }}
        />
      )}
      {/* Right-side man image — placed in the right 60% so it isn't zoomed */}
      <div className="absolute right-0 top-0 bottom-0 w-[65%]">
        <Image
          src={heroImage}
          alt="Fitness background"
          fill
          className="object-cover"
          style={{ objectPosition: "center center" }}
          priority
        />
        {/* Subtle dark veil so the image stays moody */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Left-side fade: image blends into the dark background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #08010a 0%, rgba(8,1,10,0.6) 20%, transparent 50%)",
          }}
        />
        {/* Top/bottom vignette matching the photo's natural darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* Solid dark background for the left text panel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #08010a 0%, #08010a 38%, rgba(8,1,10,0.4) 52%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-20">
        <div className="max-w-lg">
          <h1 className="text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem] font-black text-white leading-none tracking-tight mb-6 uppercase">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mb-4 text-justify">
            {text.hero_subtitle1 || DEFAULTS.hero_subtitle1}
          </p>
          <p className="text-white/75 text-sm leading-relaxed mb-8 text-justify">
            {text.hero_subtitle2 || DEFAULTS.hero_subtitle2}
          </p>
          <Button
            className="bg-[#7a1a1a] hover:bg-[#8f1f1f] text-white px-7 py-5 text-sm font-semibold rounded-sm cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {text.hero_button_text || "Fill Form"}
          </Button>

          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
              className="max-w-md w-full bg-[#08010a] border-none"
              style={{
                border: "2px solid #733EA6",
              }}
            >
              <DialogHeader>
                <DialogTitle className="text-white text-2xl font-bold mb-2">
                  Membership Form
                </DialogTitle>
              </DialogHeader>
              {success ? (
                <div className="py-8 text-center">
                  <p className="text-green-400 text-lg font-semibold">
                    ✅ Registered successfully! Welcome aboard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-900/40 border border-red-500 text-red-300 text-sm rounded px-3 py-2">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="name" className="text-white mb-1 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="bg-[#18181b] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white mb-1 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="bg-[#18181b] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-white mb-1 block">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="bg-[#18181b] text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="age" className="text-white mb-1 block">
                        Age
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="10"
                        max="100"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="bg-[#18181b] text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="gender" className="text-white mb-1 block">
                        Gender
                      </Label>
                      <select
                        id="gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="bg-[#18181b] text-white w-full rounded-md px-3 py-2"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="weight" className="text-white mb-1 block">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={form.weight}
                        onChange={handleChange}
                        required
                        className="bg-[#18181b] text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="height" className="text-white mb-1 block">
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={form.height}
                        onChange={handleChange}
                        required
                        className="bg-[#18181b] text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white mb-1 block">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="bg-[#18181b] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal" className="text-white mb-1 block">
                      Fitness Goal
                    </Label>
                    <Input
                      id="goal"
                      name="goal"
                      value={form.goal}
                      onChange={handleChange}
                      placeholder="e.g. Weight Loss, Muscle Gain"
                      className="bg-[#18181b] text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="experience"
                      className="text-white mb-1 block"
                    >
                      Experience Level
                    </Label>
                    <select
                      id="experience"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      required
                      className="bg-[#18181b] text-white w-full rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-gradient hover:bg-[#8f1f1f] text-white w-full "
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
