/*
 * Personal Learning Hub curriculum
 *
 * Future curriculum updates should normally require changes to this file only.
 * Keep lesson IDs stable after release so saved completion progress is preserved.
 */
window.LEARNING_HUB_CURRICULUM = {
  version: "2026.08.14",
  tracks: [
    {
      id: "business",
      name: "Business Case and Financial Analysis",
      summary: "Product-development economics, investment logic, uncertainty, and go/no-go decisions."
    },
    {
      id: "pce",
      name: "PCE / Polymer Chemistry",
      summary: "From polymer architecture and molecular-weight distribution to adsorption and cement performance."
    },
    {
      id: "air",
      name: "Air / Surfactants / Defoamers",
      summary: "Interfaces, micelles, foam stability, and the molecular mechanisms of foam control."
    }
  ],
  courses: [
    {
      id: "mit-ids333",
      track: "business",
      title: "MIT Risk and Decision Analysis",
      source: "MIT OpenCourseWare · IDS.333 · Fall 2021",
      creator: "Prof. Richard de Neufville",
      description: "A four-module learning series on forecasting error, simulation, flexibility, decision analysis, value of information, and multidimensional evaluation.",
      totalModules: 4
    }
  ],
  lessons: [
    {
      id: "bc-track-overview",
      track: "business",
      title: "Business Case and Financial Analysis Overview",
      source: "Customized NotebookLM overview from MIT and Farhat Lectures materials",
      creator: "NotebookLM overview based on the listed source creators",
      credentials: "AI-generated overview synthesized from MIT OpenCourseWare, MIT 2.009 materials by Prof. Steven D. Eppinger, and capital-budgeting instruction from Farhat Lectures. This is a curated overview, not an official certificate or course from the source providers.",
      url: "video-player.html?src=business-case-financial-analysis-overview.mp4&title=Business%20Case%20and%20Financial%20Analysis%20Overview",
      resources: [
        {
          label: "Watch track overview",
          url: "video-player.html?src=business-case-financial-analysis-overview.mp4&title=Business%20Case%20and%20Financial%20Analysis%20Overview",
          type: "video",
          duration: "~9 min"
        }
      ],
      references: [
        {
          title: "Capital Budgeting Explained",
          source: "Farhat Lectures",
          url: "https://www.youtube.com/watch?v=ppnjUicPHV0&list=PLxP0KZzCGFYMo0_H0qTAS2qnLlYOFwMlw"
        },
        {
          title: "Product Definition & Development to Delivery",
          source: "MIT 15.390 New Enterprises — Howard Anderson and Bill Aulet",
          url: "https://ocw.mit.edu/courses/15-390-new-enterprises-spring-2013/85d18c5f1ce4ade7415c75be670dd0c0_MIT15_390S13_lec19.pdf"
        },
        {
          title: "Product Development Economics",
          source: "MIT 2.009 — Prof. Steven D. Eppinger",
          url: "https://web.mit.edu/2.009/www/resources/ProductDevelopmentEconomics.pdf"
        },
        {
          title: "How Are You Going to Make Money?—The Business/Venture Model",
          source: "MIT Nuts and Bolts of New Ventures",
          url: "https://www.youtube.com/watch?v=wzC4PddpFnA"
        },
        {
          title: "Financial Projections",
          source: "MIT Nuts and Bolts of New Ventures",
          url: "https://www.youtube.com/watch?v=YweBomE2cr4"
        }
      ],
      duration: "~9 min",
      mode: "Watch",
      description: "Start here for a concise map of product economics, business models, development and launch investment, cash-flow projections, NPV and IRR, risk, and go/no-go decision logic."
    },
    {
      id: "bc-demand-forecasting",
      track: "business",
      title: "Forecasting Demand for a New Product",
      source: "MIT OpenCourseWare + NotebookLM overview",
      creator: "Mahender Singh (source presentation)",
      credentials: "Guest lecturer in MIT's graduate Logistics Systems course; specialist lecture on new-product forecasting. The optional video is an AI-generated NotebookLM overview of the MIT presentation.",
      url: "https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/0be27a467617b4a83c6ba512933d7e5d_lect5.pdf",
      resources: [
        {
          label: "Read presentation",
          url: "https://ocw.mit.edu/courses/esd-260j-logistics-systems-fall-2006/0be27a467617b4a83c6ba512933d7e5d_lect5.pdf",
          type: "reading",
          duration: "20–25 min"
        },
        {
          label: "Watch overview video",
          url: "video-player.html?src=forecasting-demand-overview.mp4&title=Forecasting%20Demand%20for%20a%20New%20Product&drive=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1NrC8KMs7UqNKNQX6RrT3XtAqWkAGVlXp%2Fview%3Fusp%3Ddrive_link",
          type: "video",
          duration: "~10 min"
        }
      ],
      duration: "~10 min video / 20–25 min reading",
      mode: "Watch or Focused Study",
      description: "Build defensible market and volume assumptions and identify where uncertainty enters a new-product forecast. Choose the short NotebookLM video overview, the full MIT presentation, or both."
    },
    {
      id: "bc-financial-projections",
      track: "business",
      title: "Building Financial Projections",
      source: "MIT OpenCourseWare · 2025 + NotebookLM overview",
      creator: "Steve Derezinski (source lesson)",
      credentials: "MIT S.B. in Mechanical Engineering; MIT Sloan MBA and Sloan Fellow; venture builder and former founder of GT VentureLab. The optional video is an AI-generated NotebookLM overview of the source lesson.",
      url: "https://ocw.mit.edu/courses/15-393-nuts-and-bolts-of-new-ventures-january-iap-2025/mit15_393_iap25_session5_part2_derezinski.pdf",
      resources: [
        {
          label: "Read presentation",
          url: "https://ocw.mit.edu/courses/15-393-nuts-and-bolts-of-new-ventures-january-iap-2025/mit15_393_iap25_session5_part2_derezinski.pdf",
          type: "reading",
          duration: "20–30 min"
        },
        {
          label: "Watch overview video",
          url: "video-player.html?src=building-financial-projections.mp4&title=Building%20Financial%20Projections",
          type: "video",
          duration: "~9 min"
        }
      ],
      duration: "~9 min video / 20–30 min reading",
      mode: "Watch or Focused Study",
      description: "Translate volume, price, cost, staffing, and investment assumptions into revenue, margin, cash flow, runway, and funding needs. Choose the short NotebookLM overview, the full MIT presentation, or both."
    },
    {
      id: "bc-capital-budgeting-1",
      track: "business",
      title: "Capital Budgeting I: Cash Flows and NPV",
      source: "MIT Sloan OpenCourseWare",
      creator: "Prof. Andrew W. Lo",
      credentials: "Charles E. and Susan T. Harris Professor, MIT Sloan; Director, MIT Laboratory for Financial Engineering; Ph.D. in Economics, Harvard.",
      url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/resources/part-iii-of-the-capm-and-apt-1/",
      duration: "~45 min",
      mode: "Watch",
      description: "Opens directly on the Part I video. Use incremental project cash flows and the NPV rule to decide whether a development or launch investment creates value."
    },
    {
      id: "bc-capital-budgeting-2",
      track: "business",
      title: "Capital Budgeting II: IRR and Competing Uses of Capital",
      source: "MIT Sloan OpenCourseWare",
      creator: "Prof. Andrew W. Lo",
      credentials: "Charles E. and Susan T. Harris Professor, MIT Sloan; Director, MIT Laboratory for Financial Engineering; Ph.D. in Economics, Harvard.",
      url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/resources/part-ii-of-capital-budgeting/",
      duration: "~45 min",
      mode: "Watch",
      description: "Opens directly on the Part II video. Compare NPV with payback, IRR, profitability index, and capital rationing—and learn where shortcut metrics can mislead."
    },
    {
      id: "bc-npv-sensitivity",
      track: "business",
      title: "NPV and Sensitivity Analysis in Excel",
      source: "MIT OpenCourseWare",
      creator: "Michel-Alexandre Cardin and Prof. Richard de Neufville",
      credentials: "MIT Engineering Systems and Civil & Environmental Engineering faculty; graduate instruction in engineering economy and analysis under uncertainty.",
      url: "https://ocw.mit.edu/courses/11-434j-advanced-topics-in-real-estate-finance-spring-2007/e2174f8ce9c01ed09ffe775e98120ce5_using_excel.pdf",
      duration: "25–35 min",
      mode: "Focused Study",
      description: "Opens the MIT PDF directly. See how sensitivity tables reveal the volume, price, variable-cost, CAPEX, and discount-rate assumptions that drive the recommendation."
    },
    {
      id: "bc-ids333-forecasting",
      course: "mit-ids333",
      module: 1,
      track: "business",
      title: "Forecasting and the Flaw of Averages",
      source: "MIT OpenCourseWare · IDS.333 Unit 2",
      creator: "Prof. Richard de Neufville",
      credentials: "MIT Professor of Engineering Systems; specialist in engineering design, uncertainty, flexibility, and decision analysis.",
      url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/",
      resources: [
        {
          label: "Listen to overview",
          url: "audio-player.html?src=ids333-module1-audio-overview.m4a&title=Module%201%3A%20Why%20Your%20Admixture%20Forecasts%20Are%20Wrong",
          type: "audio",
          duration: "47:44"
        },
        {
          label: "Watch overview",
          url: "video-player.html?src=ids333-module1-video-overview.mp4&title=Module%201%3A%20Escaping%20the%20Forecasting%20Trap",
          type: "video",
          duration: "7:43"
        },
        {
          label: "Watch MIT lessons",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/",
          type: "video",
          duration: "~42 min"
        },
        {
          label: "View lecture deck",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/mit_ids_333f21_lec2.pdf",
          type: "reading",
          duration: "15–20 min"
        }
      ],
      references: [
        {
          title: "Unit 2 orientation — Forecast Is Always Wrong",
          source: "MIT OpenCourseWare",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/orientation-2/"
        },
        {
          title: "Unit 2 lecture videos",
          source: "MIT OpenCourseWare",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/"
        },
        {
          title: "The Forecast Is Always Wrong — lecture deck",
          source: "MIT OpenCourseWare",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/mit_ids_333f21_lec2.pdf"
        }
      ],
      duration: "Choose an overview, then study the MIT lessons and deck as needed",
      mode: "Mixed Media",
      description: "Recognize why point forecasts of cost, price, production, demand, and timing miss actual outcomes; interpret porcupine graphs; and avoid decisions built around a misleading average."
    },
    {
      id: "bc-ids333-dcf-simulation",
      course: "mit-ids333",
      module: 2,
      track: "business",
      title: "DCF and Simulation Under Uncertainty",
      source: "MIT OpenCourseWare · IDS.333 Units 3 and 5",
      creator: "Prof. Richard de Neufville",
      credentials: "MIT Professor of Engineering Systems; specialist in engineering design, uncertainty, flexibility, and decision analysis.",
      url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/unit-orientations/",
      resources: [
        {
          label: "Explore Units 3 and 5",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/unit-orientations/",
          type: "reading"
        },
        {
          label: "Watch MIT lessons",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/",
          type: "video"
        }
      ],
      duration: "90–120 min",
      mode: "Mixed Media",
      description: "Use discounted cash flow and simulation to represent ranges of financial outcomes rather than relying only on one deterministic business case."
    },
    {
      id: "bc-ids333-flexibility",
      course: "mit-ids333",
      module: 3,
      track: "business",
      title: "Designing for Flexibility: The Parking Garage Case",
      source: "MIT OpenCourseWare · IDS.333 Units 4 and 7",
      creator: "Prof. Richard de Neufville",
      credentials: "MIT Professor of Engineering Systems; specialist in engineering design, uncertainty, flexibility, and decision analysis.",
      url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/unit-orientations/",
      resources: [
        {
          label: "Explore Units 4 and 7",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/unit-orientations/",
          type: "reading"
        },
        {
          label: "Watch MIT case lessons",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/",
          type: "video"
        }
      ],
      duration: "90–120 min",
      mode: "Mixed Media",
      description: "Use the parking-garage case to understand how staged capacity and managerial flexibility can improve outcomes when future demand is uncertain."
    },
    {
      id: "bc-risk-decision",
      course: "mit-ids333",
      module: 4,
      track: "business",
      title: "Decision, Information, and Utility Analysis",
      source: "MIT OpenCourseWare · IDS.333 Units 8–10",
      creator: "Prof. Richard de Neufville",
      credentials: "MIT Professor of Engineering Systems; specialist in engineering design, uncertainty, flexibility, and decision analysis.",
      url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/assignment-8/",
      resources: [
        {
          label: "Explore decision analysis",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/pages/assignment-8/",
          type: "reading"
        },
        {
          label: "Watch MIT lessons",
          url: "https://ocw.mit.edu/courses/ids-333-risk-and-decision-analysis-fall-2021/video_galleries/videos/",
          type: "video"
        }
      ],
      duration: "120–150 min",
      mode: "Mixed Media",
      description: "Use decision trees, value of information, utility analysis, and multidimensional evaluation to compare uncertain alternatives and frame practical recommendations."
    },

    {
      id: "polymer-structure",
      track: "pce",
      title: "Polymer Nomenclature and Structure",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=QYCpo-C-dHo",
      duration: "~48 min",
      mode: "Walking / Cooking",
      description: "Build the architecture vocabulary needed to discuss PCE backbones, side chains, grafting density, and functional groups precisely."
    },
    {
      id: "polymer-size-shape",
      track: "pce",
      title: "Polymer Size and Shape",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=Pxk1MO5jBrU",
      duration: "~45 min",
      mode: "Watch",
      description: "Connect chain conformation and architecture to solution behavior and the steric layer created by adsorbed PCE molecules."
    },
    {
      id: "molecular-weight",
      track: "pce",
      title: "Molecular Weight and Molecular-Weight Distribution",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=87kBD_xsOh4",
      duration: "~39 min",
      mode: "Watch",
      description: "Understand Mn, Mw, dispersity, viscosity-based measures, and why one average cannot fully describe a PCE sample."
    },
    {
      id: "hydrophobic-colloids",
      track: "pce",
      title: "Colloids, Particle Size, and Stability",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=vcAZvk091_c",
      duration: "~35 min",
      mode: "Walking / Cooking",
      description: "Bridge polymer fundamentals to particle dispersion, aggregation, settling, and the competing interactions in a cement suspension."
    },
    {
      id: "pce-structure-performance",
      track: "pce",
      title: "PCE Molecular Structure → Dispersion and Adsorption",
      source: "Polymers · Open Access",
      creator: "Peer-reviewed research authors",
      credentials: "Open-access research published in the peer-reviewed journal Polymers on PCE molecular structure, adsorption, dispersion, and microstructure.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10255468/",
      duration: "25–35 min selected reading",
      mode: "Focused Study",
      description: "Read the introduction, results summary, and conclusions to connect side-chain length/density and acid-to-ether ratio with adsorption, dispersion, and microstructure."
    },
    {
      id: "pce-adsorbed-conformation",
      track: "pce",
      title: "Adsorbed PCE Conformations in Cement Pore Solution",
      source: "Langmuir · Open Access",
      creator: "Tsuyoshi Hirata et al.",
      credentials: "Multidisciplinary research team from Nippon Shokubai, A*STAR Institute of High Performance Computing, USC, and Technical University of Munich Construction Chemistry.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5709394/",
      duration: "25–35 min selected reading",
      mode: "Focused Study",
      description: "Use molecular simulations to visualize adsorption, backbone anchoring, side-chain extension, and the molecular origin of steric repulsion."
    },

    {
      id: "surface-tension",
      track: "air",
      title: "Surface Energy and Surface Tension",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=rlwcM9IorUw",
      duration: "~26 min",
      mode: "Walking / Cooking",
      description: "Start with the energetic origin of an interface and why creating air–water area costs energy."
    },
    {
      id: "surfactant-background",
      track: "air",
      title: "Surfactant Structure and Interfacial Adsorption",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=t7W9kNCkRtQ",
      duration: "~33 min",
      mode: "Walking / Cooking",
      description: "Relate amphiphilic structure, head-group type, and hydrophobe size to adsorption and surface-tension reduction."
    },
    {
      id: "micelles-cmc",
      track: "air",
      title: "Micelles, CMC, Krafft Temperature, and Cloud Point",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=jCHjZIrf2Pg",
      duration: "~32 min",
      mode: "Watch",
      description: "Understand when micelles form, what CMC does—and does not—mean, and how temperature changes surfactant behavior."
    },
    {
      id: "foams",
      track: "air",
      title: "Foam Formation, Drainage, and Stability",
      source: "University of Minnesota · Severtson Lab",
      creator: "Prof. Steve J. Severtson",
      credentials: "Professor, University of Minnesota Bioproducts and Biosystems Engineering; researcher in polymer materials, macromonomers, and interfaces.",
      url: "https://www.youtube.com/watch?v=62czT-p7JLE",
      duration: "~35 min",
      mode: "Walking / Cooking",
      description: "Follow a bubble from formation through film drainage, coalescence, and stabilization to understand persistent air."
    },
    {
      id: "mit-interfaces",
      track: "air",
      title: "Interfacial Phenomena: Bubbles and Marangoni Effects",
      source: "MIT OpenCourseWare",
      creator: "Prof. John W. M. Bush",
      credentials: "Professor of Applied Mathematics, MIT; Director, MIT Applied Math Laboratory; fluid dynamicist specializing in surface-tension-driven phenomena.",
      url: "https://ocw.mit.edu/courses/18-357-interfacial-phenomena-fall-2010/ebad47a511d146bd949f249eb5e4e046_MIT18_357F10_Lecture9.pdf",
      duration: "25–40 min selected study",
      mode: "Focused Study",
      description: "Opens the five-page MIT Marangoni-flow note directly for a deeper physical picture of interfacial-tension gradients and film response."
    },
    {
      id: "defoamer-mechanisms",
      track: "air",
      title: "Polyether Defoamer Chemistry and Antifoaming Mechanism",
      source: "Open-access research article",
      creator: "Yifei Zhao, Chunlong Xue, Deluo Ji, Weiqian Gong, Yue Liu, and Ying Li",
      credentials: "Research team, Key Laboratory of Colloid and Interface Chemistry, School of Chemistry and Chemical Engineering, Shandong University.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11054078/",
      duration: "25–35 min selected reading",
      mode: "Focused Study",
      description: "Connect EO/PO block structure, interfacial adsorption, entry into foam films, and film rupture to practical defoamer performance."
    }
  ]
};
