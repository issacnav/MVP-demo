export type LocalBlogCachePost = {
  pageId: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  coverUrl: string | null;
  markdown: string;
};

export const localBlogCache: LocalBlogCachePost[] = [
  {
    pageId: "fallback:what-to-expect-first-physiotherapy-appointment",
    title: "What to Expect from Your First Physiotherapy Appointment",
    slug: "what-to-expect-first-physiotherapy-appointment",
    excerpt:
      "Booking your first physio appointment can feel daunting, especially if you're not sure what happens during the session. Here's exactly what to expect - from the moment you arrive to walking out with a plan.",
    publishedAt: "2026-03-20",
    tags: ["Patient Tips", "Rehab"],
    coverUrl:
      "https://static.vecteezy.com/system/resources/previews/015/252/547/non_2x/man-getting-doctor-s-appointment-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg",
    markdown: `
Booking your first physio appointment can feel daunting, especially if you're not sure what happens during the session. Here's exactly what to expect - from the moment you arrive to walking out with a clear plan.

## Before your appointment

You don't need a GP referral to see a physiotherapist privately. You can book directly.

It's helpful to note down:

- When the pain or problem started
- What makes it better or worse
- Any previous treatment you've had
- Any relevant scans, X-rays, or medical history

Wear comfortable clothing that allows easy access to the area being assessed - for a knee problem, shorts are ideal; for a shoulder, a loose t-shirt works well.

## The subjective assessment (about 15-20 minutes)

The session starts with a conversation. Your physiotherapist will ask detailed questions about your symptoms, lifestyle, work, and goals. This isn't small talk - it's a critical part of the clinical picture.

Expect questions like:

- *"Where exactly is the pain, and does it travel anywhere?"*
- *"What does the pain feel like - sharp, aching, burning?"*
- *"What activities make it worse or better?"*
- *"What are you hoping to get back to doing?"*

Be as honest and specific as possible. The more your physio understands your situation, the more targeted your treatment will be.

## The physical assessment (about 15-20 minutes)

Next comes the hands-on assessment. This typically includes:

- **Range of movement testing** - how far can the joint or area move?
- **Strength testing** - identifying any weakness in relevant muscle groups
- **Palpation** - feeling the tissues to identify tenderness, swelling, or muscle tightness
- **Neurological screening** - checking reflexes and sensation if nerve involvement is suspected
- **Functional movement** - watching how you move, walk, or perform a specific task

Nothing should be unnecessarily painful. If anything is uncomfortable, always tell your physiotherapist.

## Your diagnosis and treatment plan

By the end of the assessment, your physiotherapist should be able to give you a working diagnosis - an explanation of what's likely causing your symptoms and why.

You'll leave with:

- A clear understanding of your condition
- A personalised treatment plan outlining how many sessions you might need
- Exercises to start at home
- Realistic expectations about your recovery timeline

## Hands-on treatment in the first session

Depending on your condition and time available, the first session may also include some treatment - manual therapy, soft tissue massage, joint mobilisation, or dry needling. Not always, but often.

## What if I'm nervous?

That's completely normal. A good physiotherapist will explain everything before they do it and check in throughout. You're always in control - you can stop or ask questions at any point.

## The bottom line

A first physiotherapy appointment is less about treatment and more about understanding. Think of it as a detailed conversation with someone whose job is to figure out what's going on and build a plan to fix it.

---

*Ready to book? You can schedule your first appointment directly from this site - in-person in Glasgow or online from anywhere.*
`.trim(),
  },
  {
    pageId: "fallback:5-exercises-lower-back-pain-home",
    title: "5 Exercises for Lower Back Pain You Can Do at Home",
    slug: "5-exercises-lower-back-pain-home",
    excerpt:
      "Lower back pain affects up to 80% of adults at some point in their lives. The good news? A few simple, evidence-based exercises done consistently at home can make a significant difference - no equipment needed.",
    publishedAt: "2026-03-28",
    tags: ["Back Pain", "Exercise", "Patient Tips"],
    coverUrl:
      "https://images.emedicinehealth.com/images/slideshow/emss-topper/low-back-pain.jpg?output-quality=75",
    markdown: `
Lower back pain affects up to 80% of adults at some point in their lives. The good news? A few simple, evidence-based exercises done consistently at home can make a significant difference - no equipment needed.

Before starting, a quick note: if your pain is severe, radiating down your leg, or came on after an injury, please book an assessment before trying these exercises.

## 1. Pelvic tilts

One of the most foundational exercises for back pain. Lie on your back with knees bent and feet flat on the floor. Gently flatten your lower back against the floor by tightening your abdominal muscles, hold for 5 seconds, then release.

**Sets:** 3 x 10 repetitions
**Why it works:** Activates deep core muscles that support the lumbar spine.

## 2. Knee-to-chest stretch

Lie on your back. Bring one knee up toward your chest, holding behind the thigh, and gently pull until you feel a comfortable stretch in your lower back and glute. Hold for 20-30 seconds, then switch sides.

**Sets:** 3 holds each side
**Why it works:** Decompresses the lumbar vertebrae and releases tension in the hip flexors.

## 3. Cat-cow stretch

Start on all fours with hands under shoulders and knees under hips. Inhale as you let your belly drop toward the floor (cow), then exhale as you round your spine toward the ceiling (cat). Move slowly and with control.

**Sets:** 2 x 10 slow repetitions
**Why it works:** Restores spinal mobility and encourages fluid movement through stiff joints.

## 4. Bird-dog

From the same all-fours position, extend your right arm forward and your left leg back simultaneously, keeping your core engaged and your back flat. Hold for 3 seconds, then return and repeat on the opposite side.

**Sets:** 3 x 8 each side
**Why it works:** Trains spinal stability and coordination - often weak in people with chronic back pain.

## 5. Glute bridge

Lie on your back with knees bent. Drive through your heels to lift your hips off the floor until your body forms a straight line from shoulders to knees. Squeeze your glutes at the top, hold for 2 seconds, then lower slowly.

**Sets:** 3 x 12 repetitions
**Why it works:** Strengthens the glutes and hamstrings, which take load off the lumbar spine during daily activities.

## How often should you do these?

Aim for once daily, or at minimum 4-5 times per week. Consistency matters far more than intensity here. Most people notice a meaningful reduction in pain within 2-3 weeks of regular practice.

## When to seek professional help

If your pain hasn't improved after 4 weeks of consistent exercise, is worsening, or is accompanied by numbness, tingling, or weakness in the legs - it's time to get a proper assessment. These exercises are a starting point, not a substitute for individualised care.

---
`.trim(),
  },
];
