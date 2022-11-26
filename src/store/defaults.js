
const _defaults = {
  mission: [
    {
      text: 'To provide the skills for apprenticeship learners or NHS staff to feel empowered, equipped and confident to drive and manage, measurable and sustainable change in their area of work.'
    }
  ],
  quote: [
    {
      quote: 'Practice the philosophy of continuous improvement. Get a little bit better every single day.',
      author: 'Brian Tracy'
    },
    {
      quote: 'We are what we repeatedly do. Excellence, then, is not an act but a habit.',
      author: 'Will Durant'
    },
    {
      quote: 'The message of the Kaizen strategy is that not a day should go by without some kind of improvement being made somewhere in the company.',
      author: 'Masaaki Imai'
    },
    {
      quote: 'The biggest room in the world is the room for improvement.',
      author: 'Helmut Schmidt'
    },
    {
      quote: 'Success is the product of daily habits—not once-in-a-lifetime transformations.',
      author: 'James Clear'
    },
    {
      quote: 'Great things are done by a series of small things brought together.',
      author: 'Vincent Van Gough'
    },
    {
      quote: 'Any organization’s competitiveness, ability to adapt, and culture arise from the routines and habits by which the people in the organization conduct themselves every day. It is an issue of human behaviour.',
      author: 'Mike Rother'
    },
    {
      quote: 'Measurement is the first step that leads to control and eventually to improvement. If you can’t measure something, you can’t understand it. If you can’t understand it, you can’t control it. If you can’t control it, you can’t improve it.',
      author: 'H.James Harrington'
    },
    {
      quote: 'This is a fundamental truth about any sort of practice: If you never push yourself beyond your comfort zone, you will never improve.',
      author: 'Anders Ericsson'
    },
    {
      quote: 'Small daily improvements over time lead to stunning results.',
      author: 'Robin Sharma'
    },
    {
      quote: 'Discipline is choosing between what you want now and what you want most.',
      author: 'Abraham Lincoln'
    },
    {
      quote: 'I fear not the man who has practiced 10,000 kicks, but I do fear the man who has practiced one kick 10,000 times.',
      author: 'Bruce Lee'
    },
    {
      quote: 'If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude.',
      author: 'Colin Powell'
    },
    {
      quote: 'Motivation is what gets you started. Habit is what keeps you going.',
      author: 'Jim Rohn'
    },
    {
      quote: 'You’ll never change your life until you change something you do daily. The secret of your success is found in your daily routine.',
      author: 'John C. Maxwell'
    },
    {
      quote: 'I have learned that champions aren’t just born; champions can be made when they embrace and commit to life-changing positive habits.',
      author: 'Lewis Howes'
    },
    {
      quote: 'We improve by 1% every day. In just 70 days, you’re twice as good.',
      author: 'Alan Weiss'
    },
    {
      quote: 'Excellence is an art won by training and habituation.',
      author: 'Aristotle'
    },
    {
      quote: 'If I had one hour to save the world, I would spend fifty-five minutes defining the problem and only five minutes finding the solution.',
      author: 'Albert Einstein'
    },
    {
      quote: 'Don\’t say it can not be done, rather say, you don\’t know how to do it yet.',
      author: 'Tomas Bata'
    },
    {
      quote: 'Perfection is not attainable. But if we chase perfection, we can catch excellence.',
      author: 'Vince Lombardi'
    },
    {
      quote: 'If you define the problem correctly, you almost have the solution.',
      author: 'Steve Jobs'
    },
    {
      quote: 'Without continual growth and progress, such words as improvement, achievement, and success have no meaning.',
      author: 'Benjamin Franklin'
    },
    {
      quote: 'If you always do what you\’ve always done, you’ll always get what you\’ve always got.',
      author: 'Henry Ford'
    },
    {
      quote: 'If you can\'t describe what you are doing as a process, you don\'t know what you\'re doing.',
      author: 'W. Edwards Deming'
    },
    {
      quote: 'Everything can be improved.',
      author: 'Clarence W. Barron'
    },
    {
      quote: 'Almost all quality improvement comes via simplification of design, manufacturing, layout, processes, and procedures.',
      author: 'Tom Peters'
    },
    {
      quote: 'If you can\’t explain something simply, you don’t understand it well enough.',
      author: 'Albert Einstein'
    },
    {
      quote: 'The most dangerous kind of waste is the waste we do not recognize.',
      author: 'Shigeo Shingo'
    },
    {
      quote: 'Manage the cause, not the result.',
      author: 'W.E Deming'
    },
    {
      quote: 'Focus on being productive, instead of busy.',
      author: 'Tim Ferris'
    },
    {
      quote: 'Coming together is a beginning, staying together is progress, and working together is success.',
      author: 'Henry Ford'
    },
    {
      quote: 'Great things are done by a series of small things brought together.',
      author: 'Vincent Van Gough'
    },
    {
      quote: 'Watch the little things; a small leak will sink a great ship.',
      author: 'Benjamin Franklin'
    },
    {
      quote: 'Growth and improvement is about acknowledging weakness.',
      author: 'Tony Frontier'
    },
    {
      quote: 'Strive for continuous improvement, instead of perfection.',
      author: 'Kim Collins'
    },
    {
      quote: 'Continuous improvement is better than delayed perfection.',
      author: 'Mark Twain'
    },
    {
      quote: 'To improve is to change; to be perfect is to change often.',
      author: 'Winston Churchill'
    },
    {
      quote: 'Excellent firms don\'t believe in excellence - only in constant improvement and constant change.',
      author: 'Tom Peters'
    },
    {
      quote: 'The message of the Kaizen strategy is that not a day should go by without some kind of improvement being made somewhere in the company.',
      author: 'Masaaki Imai'
    },
    {
      quote: 'Almost all quality improvement comes via simplification of design, manufacturing... layout, processes, and procedures.',
      author: 'Tom Peters'
    },
    {
      quote: 'Without change, there is no innovation, creativity or incentive for improvement.',
      author: 'William Pollard'
    },
    {
      quote: 'Change is never easy, but always possible.',
      author: 'Barack Obama'
    },
    {
      quote: 'He who rejects change is the architect of decay.',
      author: 'Harold Wilson'
    },
    {
      quote: 'Deciding what not to do is as important as deciding what to do.',
      author: 'Steve Jobs'
    },
    {
      quote: 'Improvement usually means doing something we have never done before.',
      author: 'Shigeo Shingo'
    },
    {
      quote: 'Do not be afraid of improving slowly. Be afraid of standing still.',
      author: 'Leo Babauta'
    },
    {
      quote: 'Excellence is not a destination, it is a continuous journey that never ends.',
      author: 'Brian Tracy'
    },
    {
      quote: 'Some people try to make everything complicated, be the person who tries to make everything simple.',
      author: 'Dave Waters'
    }
  ],
  transformation: [
    {
      text: 'We are a team of Improvement Specialists specialising in helping Healthcare clients ”execute strategy” by delivering long-term performance improvements, which are sustainable and drive positive impact. We provide consultancy services and training.',
      quote: {
        text: 'This NHS Trust has the best learning culture across the whole of the NHS',
        author: 'Jeremy Hunt, Secretary of State for Health and Social Care (1 Feb 2018)'
      }
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
      video: false,
      modules: [],
    },
    {
      name: 'Improvement Practitioner',
      logo: 'practitioner',
      courseType: 'Standard',
      level: 4,
      leanSixSigma: true,
      belt: 'green',
      video: false,
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
      video: true,
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
      video: false,
      modules: []
    }
  ],
  courseComment: [
    {
      level: 3,
      comments: []
    },
    {
      level: 4,
      comments: [
        'Excellent course delivery',
        'Great !  Interactive study day and a nice mix of theory & practical',
        'Pace of sharing information makes it very engaging',
        'Extremely interactive, stimulating & thought provoking'
      ]
    },
    {
      level: 5,
      comments: [
        'Loved the interaction elements, definitely helped with anxiety levels',
        'Really nice team of people, good first day',
        'Fantastic and enthusiastic teachers',
        'I’ve had more movement and opportunity in the last five weeks in my career than I have had in the last five years!'
      ]
    },
    {
      level: 6,
      comments: []
    }
  ],
  service: [
    {
      title: 'Practical hands-on coaching for Executives, Leaders and Team members',
      text: ''
    },
    {
      title: 'Design and build Lean systems, connecting strategic priorities through to the front-line service',
      text: ''
    },
    {
      title: 'Proven effective Lean Problem-solving training, to strengthen your workforce capability',
      text: ''
    },
    {
      title: 'Facilitated Improvement workshops, through teamwork to achieve rapid results',
      text: ''
    },
    {
      title: 'Implement Lean methods and Visual Management to sustain performance',
      text: ''
    }
  ],
  technique: [
    {
      title: 'Face to Face and Online Training',
      text: ''
    },
    {
      title: '1:1 and Group Coaching',
      text: ''
    },
    {
      title: 'NHS Case Studies',
      text: ''
    },
    {
      title: 'NHS themed Simulations',
      text: ''
    },
    {
      title: 'Group Problem Solving',
      text: ''
    },
    {
      title: 'Guest Speakers',
      text: ''
    }
  ],
  comment: [
    {
      author: 'Exec Director, Guys & St Thomas NHS',
      comment: 'The enthusiasm of Kaizen team is amazing and there is a good mix of people with great NHS knowledge and external industries',
      scope: 'stakeholder',
      enabled: true
    },
    {
      author: 'Former Director of Performance, CQC',
      comment: 'The ambition to embed a culture of Improvement here is clear….staff have a passion about improvement…it is very impressive',
      scope: 'stakeholder',
      enabled: true
    },
    {
      author: 'Liz Truss  MP, Chief Secretary to the Treasury',
      comment: 'This approach is delivering huge benefits for patients. It takes a proven method used by companies… eg, Toyota….and its been adapted to suit the hospital – by a leadership team with purpose',
      scope: 'stakeholder',
      enabled: true
    },
    {
      author: 'Stephen Hay, Deputy CEO, NHS Improvement',
      comment: 'When are you rolling Kaizen approach to whole NHS?',
      scope: 'stakeholder',
      enabled: true
    },
    {
      author: 'David – Nurse Consultant, Cardiology',
      comment: 'Yellow Belt training gave me structure to push my project forward',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'Louise, Paediatric Lead & A&E',
      comment: 'Yellow Belt training has helped us formulate a comprehensive plan for service improvement',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'Mandy, Technician Team Leader, Pharmacy',
      comment: 'Yellow Belt has made me realise you only need to make a small change to make a massive difference',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'James, Consultant Anaesthetist',
      comment: 'This was the first time that I have been involved in a Kaizen project and I have been very impressed..',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'James, Consultant Anaesthetist',
      comment: 'This was the first time that I have been involved in a Kaizen project and I have been very impressed..',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'Sir Bruce Keogh,  National Medical Director, NHS England',
      comment: 'What I have seen today is that you’ve been able to harness that desire for change and improvement, but support it by giving people a professional methodology and support, with a very clear focus and common purpose',
      scope: 'stakeholder',
      enabled: true
    },
    {
      author: 'Heather – Ward Sister, Baker Ward',
      comment: 'Improvement Huddles has given our team a voice and we now have a platform to improve things for the patients in our care as well as ourselves. We can iron out frustrations that occur on a day to day basis',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'Jesse, Ward Sister, Carlisle Ward',
      comment: 'We now feel ownership of it [Improvements] the staff feel empowered, they feel heard and they feel proud of their ward',
      scope: 'staff',
      enabled: true
    },
    {
      author: 'Shane, Consultant Anaesthetist ',
      comment: 'I was a bit sceptical but, at the first meeting, it was clear they had a process, they had brought all the right people together – the ICU team, nursing staff, site managers, and management. People wanted to make it better and the Lean improvement methodology helps you drive that. Immediately, I was delighted to start seeing a change in both attitude and results',
      scope: 'staff',
      enabled: true
    },
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
  ],
  howItWorks: [
    {
      text: [
        {
          type: 'header',
          text: 'Key Focus Outcomes'
        },
        {
          type: 'text',
          text: 'TBD'
        },
        {
          type: 'header',
          text: 'Daily Team Huddles'
        },
        {
          type: 'text',
          text: 'TBD'
        },
        {
          type: 'header',
          text: 'Strategy Deployment'
        },
        {
          type: 'text',
          text: 'TBD'
        },
        {
          type: 'header',
          text: 'Staff Capacity and Availability'
        },
        {
          type: 'text',
          text: 'TBD'
        },
        {
          type: 'header',
          text: 'Kaizen Team and External Support'
        },
        {
          type: 'text',
          text: 'TBD'
        },
        {
          type: 'header',
          text: 'KLeadership Behaviours and Sustainability'
        },
        {
          type: 'text',
          text: 'TBD'
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
