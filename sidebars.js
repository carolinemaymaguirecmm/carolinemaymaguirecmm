// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  portfolio: [
    {type: 'doc', id: 'index', label: 'Home'},
    {
      type: 'category',
      label: 'CV',
      link: {type: 'doc', id: 'cv/index'},
      items: [
        {type: 'doc', id: 'cv/academic-projects/academic-projects', label: 'Academic projects'},
        {type: 'doc', id: 'cv/writing-samples/writing-samples', label: 'Writing samples'},
      ],
    },
    {
      type: 'category',
      label: 'Projects',
      link: {type: 'doc', id: 'projects/index'},
      items: [
        {type: 'doc', id: 'projects/ai-masters-project/index', label: "AI Master's project"},
        {type: 'doc', id: 'projects/fast-dsp-microservice/deployment-guide', label: 'FastAPI microservice'},
      ],
    },
  ],
};

module.exports = sidebars;
