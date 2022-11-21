
const _defaults = {
  mission: [
    {
      text: 'To provide the skills for apprenticeship learners or NHS staff to feel empowered, equipped and confident to drive and manage, measurable and sustainable change in their area of work.'
    }
  ],
  transformation: [
    {
      text: 'We are a team of Improvement Specialists specialising in helping Healthcare clients ”execute strategy” by delivering long-term performance improvements, which are sustainable and drive positive impact. We provide consultancy services and training.'

    }
  ],
  person: [
    {
      name: 'Anil Matthew',
      role: 'Chief Exec Officer',
      pic: 'anil-pic',
      email: '',
      text: [
        'Professional, Chartered Engineer',
        'Lean Six-Sigma Master Black Belt, programmes with 100 companies globally. With over 25 years Lean experience in FMCG, Pharmaceutical, Consumer Healthcare Industries driving Change, structured Problem Solving & Engineering solutions inc. the business improvement turnaround of "failing" NHS Trust (CQC Rating – GOOD)',
        'Managed Global Improvement Teams that Coached, Mentored & delivered Supply chain Improvements to Service, Delivery, Cost (in excess of £50M)'
      ],
      endorsements: 'anil-endorsements'
    },
    {
      name: 'Nick Chambers',
      role: 'Chief Operating Officer',
      pic: 'nick-pic',
      email: '',
      text: [
        'With over 15 years Lean transformation experience in FMCG, Pharmaceutical and Healthcare industry, Nick has implemented significant programmes in driving change, structured problem solving & organisational strategy.',
        'Managed whole organisation improvement Initiatives including coaching, mentored & delivery of lean management systems across entire NHS trusts.',
        'Proven track record of developing and implementing a fully engaging culture change that links executive boards to front line workforce and creates a successful improvement culture. Winner of HSJ Patient Safety Awards 2018 for Education & Training'
      ],
      endorsements: 'nick-endorsements'
    }
  ],
  course: [
    {
      name: 'Improvement Technician',
      logo: 'technician',
      courseType: 'Standard',
      level: 3,
      leanSixSigma: true,
      belt: 'yellow',
      modules: []
    },
    {
      name: 'Improvement Practitioner',
      logo: 'practitioner',
      courseType: 'Standard',
      level: 4,
      leanSixSigma: true,
      belt: 'green',
      modules: [
        { id: '23ffc867-0094-482f-8c5f-ee352b0b99ac', number: 1, name: 'Compliance' },
        { id: '995cd051-c8c1-491e-9917-2483e9c38811', number: 2, name: 'Communication' },
        { id: '575e9e0f-a211-4822-973d-0028d1b91841', number: 3, name: 'Coaching' },
        { id: 'd3bff1ee-9d43-477d-892d-ef0ed8e98774', number: 4, name: 'Project Management' },
        { id: '330ab562-498a-4bcd-b3cb-f16549a19cb0', number: 5, name: 'Change Management' },
        { id: '31e07e65-41f1-47f3-b6ef-8010731efdbc', number: 6, name: 'Principles & Methods' },
        { id: 'a91bf058-8d90-41e8-b5f5-1eb12a1fa500', number: 7, name: 'Project selection & Scoping' },
        { id: '6183c0c7-7811-42bb-8704-2d0ca14fed32', number: 8, name: 'Problem Definition' },
        { id: '1e0b43c2-0ce5-4418-b904-220c2496e076', number: 9, name: 'Voice of the Customer' },
        { id: 'd1aca33e-dcd7-4edb-9292-79fae8978d1b', number: 10, name: 'Process Mapping & Analysis' },
        { id: 'cccfe904-e11b-42b4-b5ef-fa583b2c852a', number: 11, name: 'Lean Tools' },
        { id: '39da6836-8a3f-41b9-aaa8-06e685598f75', number: 12, name: 'Measurement Systems' },
        { id: '85773ec6-a0a8-47eb-bffa-c6092c5db821', number: 13, name: 'Data acquisition for analysis' },
        { id: '82aab243-45a1-48a7-9bcd-fba9a591abbb', number: 14, name: 'Basic Statistics & Measures' },
        { id: '5a3a0848-bd0f-4177-bfff-214528decadf', number: 15, name: 'Data Analysis – Statistical methods' },
        { id: 'f33441b9-8993-4eab-90b9-ff1acf2b5978', number: 16, name: 'Process Capability & Performance' },
        { id: 'de5bddef-d6b4-47be-b907-a7b067caa510', number: 17, name: 'Root Cause Analysis' },
        { id: '9c2cda99-650f-4a33-8a9a-8537458b27e8', number: 18, name: 'Experimentation & Optimisation' },
        { id: '130861ae-f833-4bb9-a87a-c6c261f8f9af', number: 19, name: 'Identification & Prioritisation' },
        { id: 'ddecda29-0f85-4043-8527-5071214c6266', number: 20, name: 'Data Analysis – SPC' },
        { id: '73b1ef24-276c-4e00-8f7c-a3398785a80a', number: 21, name: 'Benchmarking' },
        { id: 'bdd366e6-8115-4096-836a-0b8b69813fa7', number: 22, name: 'Sustainability & Control' }
      ]
    },
    {
      name: 'Improvement Coach (Specialist)',
      logo: 'coach',
      courseType: 'Standard',
      level: 5,
      leanSixSigma: true,
      belt: 'black',
      modules: [
        { id: '2c1ca2eb-477c-47f1-b728-e42ff3739c7b', number: 1, name: 'Leading Improvement teams' },
        { id: 'ed2c2a3f-7eb7-4102-96f7-8c7394e970da', number: 2, name: 'Strategic Deployment of C.I' },
        { id: '783c6f05-df92-420a-90bb-c87ac8bb93bf', number: 3, name: 'Communication' },
        { id: 'f54f2f0d-292b-4c89-897c-1540d26b05c6', number: 4, name: 'Capability Development' },
        { id: '602f43b0-ff54-4833-a269-7c3072242d00', number: 5, name: 'Project Planning' },
        { id: '5fb81960-5856-4cfb-81d5-fd8ff2bb4d9e', number: 6, name: 'Change Planning' },
        { id: '044b4f97-5e32-4a50-9169-c5e2535933d3', number: 7, name: 'Principles & Methods for Improvement' },
        { id: '37364d72-9363-4fe2-a580-7f48eb8a9bc6', number: 8, name: 'Project selection & Scope' },
        { id: 'd43f319b-aca3-4891-8f37-322a723a579e', number: 9, name: 'Process Mapping & Analysis' },
        { id: 'e8b8074c-fbf1-4cec-a02d-868e5ebb7c4e', number: 10, name: 'Lean Tools' },
        { id: '07a67bf9-8f40-4ad4-9dde-b0bb632a4440', number: 11, name: 'Measurement' },
        { id: 'ef7b1d02-45a7-4309-947b-ef9d9c3df0fa', number: 12, name: 'Statistics & Measures' },
        { id: '99efc614-a3d2-4bb6-9187-f0c2db63bd33', number: 13, name: 'Data analysis-Statistical Methods' },
        { id: 'cf1d865b-f355-4667-a671-10f895d16e78', number: 14, name: 'Process Capability & Performance' },
        { id: '14c2febb-f7e6-44d0-8403-611c7c58a9a7', number: 15, name: 'Root Cause Analysis' },
        { id: '00ff052a-1390-4c96-aff4-b65f34ba5655', number: 16, name: 'Experimentation & Optimisation' },
        { id: 'c3562bad-144d-4963-ad80-895ed0e75386', number: 17, name: 'Data Analysis – Statistical Process Control' },
        { id: '6029eb58-7987-45b4-8034-7c8147f16a44', number: 18, name: 'Benchmarking' },
        { id: 'ec856249-3eac-43a9-b55f-df7656c03e42', number: 19, name: 'Failure mode avoidance' },
        { id: 'a71abef6-611b-4f5b-ba1b-d3a485c768aa', number: 20, name: 'Sustainability & Control' }
      ]
    },
    {
      name: 'Improvement Leader',
      logo: 'leader',
      courseType: 'Standard',
      level: 6,
      leanSixSigma: true,
      belt: 'master-black',
      modules: []
    }
  ],
  service: [
    {
      title: 'Face to Face and Online Training',
      text: 'Practical hands-on coaching for Executives, Leaders and Team members'
    },
    {
      title: '1:1 and Group Coaching'
    },
    {
      title: 'NHS Case Studies'
    },
    {
      title: 'NHS themed Simulations'
    },
    {
      title: 'Group Problem Solving'
    },
    {
      title: 'Guest Speakers'
    }
  ],
  contentConsultancy: [
    {
      text: [
        'We work to improve healthcare training tailored to NHS Trusts own Vision, Values and Strategy. We build relationships by taking the time to look at issues through the eyes of others and providing products of real benefit.',
        'We provide consultancy services using Lean Six Sigma principles to deliver efficency inprovements and reductions of waste'
      ]
    }
  ],
  contentTraining: [
    {
      text: [
        'We provide Lean Six Sigma training to empower trusts and their departments to enjoy ongoing improvements',
        'Our vision is to build staff capability across the NHS and to be recognised as a "Centre of Excellence" by applying NHS best practices with industry best practices.',
        'See a [Case Study] for an example of throughput increase.'
      ]
    }
  ],
  contentServices: [
    {
      text: [
        'We are a team of Improvement Specialists specialising in helping Healthcare clients ”execute strategy” by delivering long-term performance improvements, which are sustainable and drive positive impact.'
      ]
    }
  ],
  contentApprenticesIntro: [
    {
      manager: {
        text: [
          'Manager apprentices intro'
        ]
      },
      apprentice: {
        text: [
          'User apprentices intro'
        ]
      },
    }
  ],
  contentCoursesIntro: [
    {
      manager: {
        text: [
          'Manager training intro'
        ]
      },
      apprentice: {
        text: [
          'User training intro'
        ]
      },
    }
  ],
  contentServicesIntro: [
    {
      manager: {
        text: [
          'Manager services intro'
        ]
      },
      apprentice: {
        text: [
          'User services intro'
        ]
      },
    }
  ],
  caseStudy: [
    {
      header: 'Vaccination Centre Case Study',
      intro: 'Applying Lean Six Sigma principles to throughput in a NHS vaccination centre increased the amount of people vaccinated per day by 50%',
      text: [
        {
          type: 'header',
          text: 'Outcomes'
        },
        {
          type: 'text',
          text: 'Throughput increased by 50%'
        },
        {
          type: 'header',
          text: 'What We Did'
        },
        {
          type: 'text',
          text: 'Lots of training'
        }
      ]
    }
  ]
}

module.exports = {

  get: function(type) {
    return _defaults[type]
  }
}
