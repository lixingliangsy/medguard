export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "MedGuard",
  slug: "medguard",
  tagline: "Catch unsafe AI medical advice before a patient reads it.",
  description: "MedGuard validates patient-facing AI responses against clinical safety rules and blocks or flags unsafe guidance before a single patient ever sees it.",
  toolTitle: "Health AI Safety Check",
  resultLabel: "Safety Report",
  ctaLabel: "Check Safety",
  features: [
  "Assess safety risks of health AI tools",
  "Flag unverified medical claims and missing disclaimers",
  "Check regulatory and evidence red flags",
  "Get a cautious-use guidance sheet"
],
  inputs: [
  {
    "key": "health_ai_description",
    "label": "Describe the Health AI Tool",
    "type": "textarea",
    "placeholder": "e.g. An app suggesting supplements from photos"
  },
  {
    "key": "use_case",
    "label": "What It's Used For",
    "type": "text",
    "placeholder": "e.g. symptom checking, diet advice"
  },
  {
    "key": "user_type",
    "label": "Who Uses It",
    "type": "select",
    "options": [
      "General public",
      "Clinicians",
      "Both",
      "Not sure"
    ]
  }
] as InputField[],
  systemPrompt: "You are MedGuard, a health-AI safety evaluator. Given a description of a health-related AI tool, its use case, and who uses it, assess the tool's safety risks and the credibility of its claims. Always structure your response as: (1) a safety risk score from 0-100, (2) red flags (unverified claims, missing disclaimers, weak evidence), (3) regulatory and evidence concerns, and (4) a cautious-use guidance sheet with clear disclaimers. Never give medical advice. In demo (mock) mode, return a realistic sample evaluation following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Single output check"
  },
  {
    "tier": "Pro",
    "price": "$49/mo",
    "desc": "Batch validation + export"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const desc = (inputs['health_ai_description'] || '').trim()
  const use = (inputs['use_case'] || '').trim()
  const who = inputs['user_type'] || 'General public'
  if (!desc) return 'Describe the health AI tool to run the safety evaluation.'
  const score = 66
  let out = 'HEALTH AI SAFETY EVALUATION - users: ' + who + '\n\n'
  out += 'Safety risk score: ' + score + '/100 (caution)\n\n'
  out += 'Red flags:\n'
  out += '  - Unverified medical claims without citations\n'
  out += '  - Missing "not a substitute for professional advice" disclaimer\n'
  out += '  - Weak evidence base for ' + (use || 'the stated use case') + '\n\n'
  out += 'Regulatory & evidence concerns:\n'
  out += '  - May trigger FDA/EMA software-as-medical-device rules\n'
  out += '  - No clinical validation referenced\n\n'
  out += 'Cautious-use guidance sheet:\n'
  out += '  - Always show a clear medical disclaimer\n'
  out += '  - Cite sources for any claim\n'
  out += '  - Route high-risk symptoms to a clinician\n'
  out += '\n--- (Mock demo. Not medical advice. Pro unlocks batch validation + disclaimer checks.)'
  return out
}
}
