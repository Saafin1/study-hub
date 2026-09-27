// Shared question bank for SAT Math practice.
// Each question is tagged with domain + subtopic so the Practice page
// can filter by whatever the user selects.

const MATH_DOMAINS = {
  algebra: {
    label: "Algebra",
    comingSoon: false,
    subtopics: {
      "linear-equations": "Linear Equations",
      "functions": "Functions",
      "systems": "Systems of Equations",
      "slope": "Slope",
      "inequalities": "Inequalities",
      "modeling": "Word-Problem Modeling"
    }
  },
  advanced: {
    label: "Advanced Math",
    comingSoon: true,
    subtopics: {}
  },
  "problem-solving": {
    label: "Problem-Solving & Data Analysis",
    comingSoon: true,
    subtopics: {}
  },
  geometry: {
    label: "Geometry & Trigonometry",
    comingSoon: true,
    subtopics: {}
  }
};

const MATH_QUESTIONS = [
  {
    id: "alg-lineq-1",
    domain: "algebra",
    subtopic: "linear-equations",
    prompt: "Solve for x: 4x &minus; 7 = 2x + 9",
    choices: [
      { v: "A", t: "x = 4" },
      { v: "B", t: "x = 8" },
      { v: "C", t: "x = &minus;8" },
      { v: "D", t: "x = 16" }
    ],
    correct: "B",
    explain: {
      recognize: "Variable on both sides, no exponents &mdash; a straightforward linear equation.",
      algebra: "Subtract 2x from both sides: 2x &minus; 7 = 9. Add 7 to both sides: 2x = 16. Divide by 2: x = 8.",
      desmos: "Type y_1=4x-7 and y_2=2x+9. The lines cross at x = 8.",
      wrong: "A) 4 comes from dividing 16 by 4 instead of 2. C) &minus;8 comes from a sign slip when moving terms. D) 16 forgets the final division step."
    }
  },
  {
    id: "alg-func-1",
    domain: "algebra",
    subtopic: "functions",
    prompt: "If f(x) = 3x &minus; 5, what is f(4)?",
    choices: [
      { v: "A", t: "7" },
      { v: "B", t: "12" },
      { v: "C", t: "&minus;7" },
      { v: "D", t: "17" }
    ],
    correct: "A",
    explain: {
      recognize: '"f(4)" means: plug 4 in for every x in the function.',
      algebra: "f(4) = 3(4) &minus; 5 = 12 &minus; 5 = 7.",
      desmos: "Type f(x)=3x-5, then on the next line type f(4) &mdash; it evaluates to 7 automatically.",
      wrong: "B) 12 forgets to subtract 5. C) &minus;7 comes from a sign error. D) 17 mistakenly adds instead of subtracts."
    }
  },
  {
    id: "alg-sys-1",
    domain: "algebra",
    subtopic: "systems",
    prompt: "If 2x + y = 10 and x &minus; y = 2, what is the value of x + y?",
    choices: [
      { v: "A", t: "6" },
      { v: "B", t: "8" },
      { v: "C", t: "2" },
      { v: "D", t: "12" }
    ],
    correct: "A",
    explain: {
      recognize: "Two linear equations, two unknowns &rarr; system of equations. Solve for both x and y first.",
      algebra: "Add the equations: (2x + y) + (x &minus; y) = 10 + 2 &rarr; 3x = 12 &rarr; x = 4. Plug in: 4 &minus; y = 2 &rarr; y = 2. So x + y = 6.",
      desmos: "Type y=10-2x and y=x-2. Click the intersection point: (4, 2). Add the coordinates: 4 + 2 = 6.",
      wrong: "B) 8 and D) 12 come from arithmetic slips combining the equations. C) 2 is just the value of y alone."
    }
  },
  {
    id: "alg-slope-1",
    domain: "algebra",
    subtopic: "slope",
    prompt: "A line passes through the points (1, 2) and (3, 8). What is the slope of the line?",
    choices: [
      { v: "A", t: "3" },
      { v: "B", t: "1/3" },
      { v: "C", t: "6" },
      { v: "D", t: "2" }
    ],
    correct: "A",
    explain: {
      recognize: "Two points given, asking for slope &rarr; use the slope formula: (change in y) &divide; (change in x).",
      algebra: "Slope = (8 &minus; 2) / (3 &minus; 1) = 6 / 2 = 3.",
      desmos: "Type the arithmetic directly: (8-2)/(3-1) &mdash; Desmos computes 3 instantly.",
      wrong: "B) 1/3 is the slope flipped upside down &mdash; a very common mistake. C) 6 forgets to divide. D) 2 divides the wrong pair of numbers."
    }
  },
  {
    id: "alg-ineq-1",
    domain: "algebra",
    subtopic: "inequalities",
    prompt: "Solve the inequality: 2x + 3 &lt; 11",
    choices: [
      { v: "A", t: "x &lt; 4" },
      { v: "B", t: "x &lt; 7" },
      { v: "C", t: "x &gt; 4" },
      { v: "D", t: "x &lt; 8" }
    ],
    correct: "A",
    explain: {
      recognize: "Solve inequalities like equations, with one rule: flip the sign only if you multiply/divide by a negative (not needed here).",
      algebra: "Subtract 3: 2x &lt; 8. Divide by 2 (positive, sign stays): x &lt; 4.",
      desmos: "Graph y=2x+3 and y=11. They cross at x = 4. Since we need the left side smaller, the answer is everything left of that point: x &lt; 4.",
      wrong: "B) 7 forgets to divide by 2. C) has the right number but wrong direction. D) 8 forgets the division step."
    }
  },
  {
    id: "alg-model-1",
    domain: "algebra",
    subtopic: "modeling",
    prompt: "A phone plan charges a flat fee of $20 per month plus $0.10 for each text message. Which equation gives the total monthly cost, y, for x text messages?",
    choices: [
      { v: "A", t: "y = 20 + 0.10x" },
      { v: "B", t: "y = 0.10 + 20x" },
      { v: "C", t: "y = 20x + 0.10" },
      { v: "D", t: "y = 0.10x &minus; 20" }
    ],
    correct: "A",
    explain: {
      recognize: "A flat starting fee plus a constant cost per item is y = mx + b: b is the flat fee, m is the per-unit rate.",
      algebra: "Flat fee = $20 &rarr; b. Cost per text = $0.10 &rarr; m, times number of texts x. So y = 0.10x + 20, same as y = 20 + 0.10x.",
      desmos: "Graph the equation and check that y = 20 when x = 0, matching '$20 flat fee, no texts sent.'",
      wrong: "B) and C) swap which number is the rate and which is the flat fee. D) subtracts, which would make the cost negative at zero texts."
    }
  }
];
