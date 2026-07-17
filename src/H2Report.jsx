import { useState, useEffect } from "react";
import team1 from "./team1.jpeg";
import team2 from "./team2.jpeg";
import team3 from "./team3.jpeg";

// ============================================================
// 1. DATA
// ============================================================


const MONTHLY_INCIDENTS = [
  { month:"Jan", p1:0, p2:1, p3:20, p4:48 },
  { month:"Feb", p1:0, p2:0, p3:15, p4:28 },
  { month:"Mar", p1:1, p2:0, p3:35, p4:74 },
  { month:"Apr", p1:0, p2:0, p3:22, p4:35 },
  { month:"May", p1:0, p2:0, p3:10, p4:17 },
  { month:"Jun", p1:0, p2:1, p3:40, p4:72 },
];


// Incident totals

const TOTAL_P1 = MONTHLY_INCIDENTS.reduce(
  (sum,item)=>sum+item.p1,0
);

const TOTAL_P2 = MONTHLY_INCIDENTS.reduce(
  (sum,item)=>sum+item.p2,0
);

const TOTAL_P3 = MONTHLY_INCIDENTS.reduce(
  (sum,item)=>sum+item.p3,0
);

const TOTAL_P4 = MONTHLY_INCIDENTS.reduce(
  (sum,item)=>sum+item.p4,0
);


const TOTAL_INCIDENTS =
TOTAL_P1 + TOTAL_P2 + TOTAL_P3 + TOTAL_P4;



// ============================================================
// KEY METRICS
// ============================================================


const KEY_METRICS = [

{
 icon:"🔴",
 label:"P1 Incidents",
 value:TOTAL_P1,
 confluenceUrl:null
},

{
 icon:"🟠",
 label:"P2 Incidents",
 value:TOTAL_P2,
 confluenceUrl:null
},

{
 icon:"🔵",
 label:"P3 Incidents",
 value:TOTAL_P3,
 confluenceUrl:null
},

{
 icon:"🟦",
 label:"P4 Incidents",
 value:TOTAL_P4,
 confluenceUrl:null
},

{
 icon:"📞",
 label:"Callouts",
 value:383,
 confluenceUrl:null
},

{
 icon:"📋",
 label:"Monitoring Requests Shared",
 value:22,
 confluenceUrl:null
},

{
 icon:"✅",
 label:"Monitoring Requests Implemented",
 value:11,
 confluenceUrl:null
}

];



// ============================================================
// RELEASE DATA
// ============================================================


const FEATURE_RELEASES = [

{
 name:"25-4B - Guardians of the Migration PROD deployment",
 status:"Released",
 Comments:"Production deployment completed successfully with planned service exclusions applied and unready services removed from the deployment scope.",
 jiraUrl:
 "https://sky.atlassian.net/browse/NCE-2602"
},

{
 name:"26-1A - Ball of Duty PROD deployment",
 status:"Released",
 Comments:"The deployment encountered a few infrastructure and configuration issues, which were resolved through configuration updates, deployment retries, and a code rollback, resulting in a successful deployment.",
 jiraUrl:
 "https://sky.atlassian.net/browse/NCE-2763"
},

{
 name:"26-1B​  Everything, Everywhere All At Once PROD deployment",
 status:"Released",
 Comments:"The deployment was completed successfully with no issues in Couchbase, Apigee, Cloud Functions, Cloud SQL, and Akamai. A few Kubernetes and Kafka-related issues were encountered, along with planned service scale-down activities for the CAIF/Tibco upgrade, all of which were addressed without impacting the overall deployment outcome.",
 jiraUrl:
 "https://sky.atlassian.net/browse/NCE-2951"
},

{
 name:"26-2A Avengers PROD deployment",
 status:"Released",
 Comments:"Deployment completed without any major hiccups, within expected time window. ",
 jiraUrl:
 "https://sky.atlassian.net/browse/NCE-3413"
},

{
 name:"26-2B One Battle After Another PROD deployment",
 status:"Released",
 Comments:"The deployment encountered a few configuration and deployment issues, including IDM-CB deployment, Vault configuration, Schema Registry, and database migration failures. All issues were resolved through fixes and redeployments, resulting in a successful deployment.",
 jiraUrl:
 "https://sky.atlassian.net/browse/NCE-3568"
}

];


// ============================================================
// INSIGHTS
// ============================================================


const RECENT_WINS = [
  {
    title: "📊 Deployment Dashboard Implementation",
    description:
      "Implemented Grafana deployment dashboards to improve visibility into deployment activities and support smooth production rollouts.",
  },
  {
    title: "🗄️ Couchbase Application Dashboard",
    description:
      "Developed Grafana dashboards for Couchbase applications, providing enhanced visibility into database health and performance.",
  },
  {
    title: "📦 Kafka Monitoring Dashboard",
    description:
      "Implemented Kafka dashboards in Grafana to monitor broker health, message flow, and consumer activity in real time.",
  },
  {
    title: "🚀 IDM Go-Live Readiness Dashboard",
    description:
      "Delivered production readiness dashboards using Splunk and Grafana, improving deployment confidence and operational preparedness.",
  },
  {
    title: "🔔 Domain Alert Ownership Transition",
    description:
      "Successfully handed over domain-specific alerts to Fulfilment Integration and BRM teams, improving ownership and reducing Spark callout incidents.",
  },
];


const EMERGING_TRENDS = [
  {
    title: "📈 Intelligent Alert Optimization",
    description:
      "Improving dashboard and alert efficiency after IDM go-live by segregating faster and slower burn-rate alerts.",
  },
  {
    title: "🚀 Deployment Visibility Enhancement",
    description:
      "Providing real-time visibility into pod upscaling and downscaling activities during monthly production deployments.",
  },
  {
    title: "🛡️ Incident Reduction & Stability Improvements",
    description:
      "Reducing P3 and P4 incidents compared to H1 2025, with IDM go-live callouts stabilized within two days.",
  },
];


const TEAM_EFFORTS = [
  {
    title: "🤝 Cross-Team Collaboration",
    description:
      "Strengthening collaboration across teams to improve release stability and delivery confidence.",
  },
  {
    title: "🩺 Proactive Health Checks",
    description:
      "Introducing proactive application health checks during non-peak hours to improve platform reliability.",
  },
  {
    title: "📚 Documentation & Knowledge Sharing",
    description:
      "Completing documentation improvements and knowledge-sharing activities to enhance team efficiency.",
  },
];




// ============================================================
// WHAT'S NEXT
// ============================================================


const WHATS_NEXT = [
  {
    title: "☕ Kafka Java 17 Upgrade",
    description:
      "Migrating Kafka services to Java 17 for improved performance and long-term support.",
  },
  {
    title: "📦 Kafka 7.9.4 to 8.1.x Upgrade",
    description:
      "Enhancing Kafka platform features, stability, and security through the latest version upgrade.",
  },
  {
    title: "⚙️ Kafka BAU Operation Pipeline Improvements",
    description:
      "Improving automation, operational efficiency, and monitoring capabilities for smoother platform operations.",
  },
  {
    title: "🗄️ Couchbase 8.2.x Upgrade",
    description:
      "Improving compatibility, stability, and enabling new database functionality through the latest upgrade.",
  },
  {
    title: "🛡️ Compliance Transition (Snyk → Wiz)",
    description:
      "Enhancing cloud security coverage, vulnerability management, and compliance posture through Wiz adoption.",
  },
  {
    title: "🔍 GKE Microservices Pen Testing",
    description:
      "Strengthening security posture through proactive penetration testing of microservices running on GKE.",
  },
  {
    title: "🔄 Kafka DR & Failover Testing",
    description:
      "Validating platform resilience, recovery readiness, and business continuity through disaster recovery testing.",
  },
  {
    title: "☸️ Kubernetes Deployment Modernization",
    description:
      "Overhauling microservices deployment processes to improve scalability, reliability, and operational consistency.",
  },
  {
    title: "🚀 Apigee Edge to Apigee X Migration",
    description:
      "Modernizing API management capabilities with enhanced security, scalability, and cloud-ready architecture.",
  },
  {
    title: "📈 Monitoring Alert Optimization",
    description:
      "Fine-tuning alert thresholds to reduce noise and improve incident response efficiency.",
  },
];

// ============================================================
// COMPARISON DATA
// ============================================================


const H1_2025_INCIDENTS = [

{month:"Jan",value:55},
{month:"Feb",value:82},
{month:"Mar",value:57},
{month:"Apr",value:44},
{month:"May",value:25},
{month:"Jun",value:41}

];


const H1_2026_INCIDENTS =
MONTHLY_INCIDENTS.map(item=>({

month:item.month,

value:
item.p1+
item.p2+
item.p3+
item.p4

}));
// ─────────────────────────────────────────────────────────────
// 4. REUSABLE CHILD COMPONENTS
// ─────────────────────────────────────────────────────────────

function MetricRow({ icon, label, value, confluenceUrl, delay }) {
  return (
    <div
      className="metric-row"
      style={{
        ...S.metricRow,
        animationDelay: `${delay || 0}s`,
      }}
    >
      <span style={S.metricLeft}>
        <span style={{ fontSize: "1.2rem" }}>{icon}</span>
        {label}
      </span>

      {confluenceUrl ? (
        <a
          className="link-val metric-value"
          href={confluenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#ef476f",
          }}
        >
          {value} ↗
        </a>
      ) : (
        <span
          className="metric-value"
          style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#00b4d8",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// INCIDENT BAR CHART
// Separate P1 P2 P3 P4
// ─────────────────────────────────────────────────────────────

function BarChart({ data }) {

  const priorities = [
    { key:"p1", label:"P1", color:"#d00000" },
    { key:"p2", label:"P2", color:"#ef476f" },
    { key:"p3", label:"P3", color:"#0096c7" },
    { key:"p4", label:"P4", color:"#48cae4" }
  ];


  const maxValue = Math.max(
    ...data.flatMap(d =>
      priorities.map(p => d[p.key])
    )
  );


  return (
    <div>

      <div style={{
        display:"flex",
        gap:20,
        marginBottom:20
      }}>

        {priorities.map(p => (
          <span key={p.key}>
            <span
              style={{
                display:"inline-block",
                width:12,
                height:12,
                background:p.color,
                marginRight:6
              }}
            />
            {p.label}
          </span>
        ))}

      </div>


      {data.map(row => (

        <div
          key={row.month}
          style={{
            marginBottom:18
          }}
        >

          <b>{row.month}</b>


          {priorities.map(p => (

            <div
              key={p.key}
              style={{
                display:"flex",
                alignItems:"center",
                gap:10,
                marginTop:6
              }}
            >

              <span style={{
                width:25
              }}>
                {p.label}
              </span>


              <div
                style={{
                  height:14,
                  width:`${(row[p.key]/maxValue)*70}%`,
                  background:p.color,
                  borderRadius:5
                }}
              />


              <span>
                {row[p.key]}
              </span>

            </div>

          ))}


        </div>

      ))}


    </div>
  );
}



function InsightCard({ eyebrow, title, items = [] }) {
  return (
    <div className="insight-card">
      <span className="eyebrow">{eyebrow}</span>

      <h3>{title}</h3>

      {Array.isArray(items) &&
        items.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4
              style={{
                color: "#0369a1",
                marginBottom: "8px",
              }}
            >
              {item.title}
            </h4>

            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// TAB COMPONENTS
// ─────────────────────────────────────────────────────────────


function OverviewTab(){

const cards=[
{
label:"Total P1",
value:TOTAL_P1
},
{
label:"Total P2",
value:TOTAL_P2
},
{
label:"Total P3",
value:TOTAL_P3
},
{
label:"Total P4",
value:TOTAL_P4
},
];


return(

<div className="tab-content">


<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:15
}}>


{
cards.map(c=>(

<div
className="summary-card"
style={{
background:"#fff",
padding:20,
borderRadius:12,
textAlign:"center"
}}
>

<h2>{c.value}</h2>

<p>{c.label}</p>

</div>

))
}


</div>



<div style={S.section}>

<h2 style={S.sectionTitle}>
🎯 Key Metrics
</h2>


{
KEY_METRICS.map((m,i)=>

<MetricRow
key={m.label}
{...m}
delay={i*0.05}
/>

)

}


</div>


</div>

)

}




function IncidentsTab(){

return(

<div className="tab-content">


<div style={S.section}>


<h2 style={S.sectionTitle}>
🚨 Incident Priority Breakdown
</h2>


<BarChart data={MONTHLY_INCIDENTS}/>


</div>


</div>

)

}





function ReleasesTab(){

return(

<div className="tab-content">

<div style={S.section}>

<h2 style={S.sectionTitle}>
🚀 Releases
</h2>


<table style={S.table}>

<thead>

<tr>

<th style={S.th}>Feature</th>
<th style={S.th}>Month</th>
<th style={S.th}>Status</th>

</tr>

</thead>


<tbody>


{
FEATURE_RELEASES.map((r) => (
  <tr key={r.name}>
    <td style={S.td}>{r.name}</td>
    <td style={S.td}>{r.status}</td>
    <td style={S.td}>{r.Comments}</td>
    <td style={S.td}>
      <a href={r.jiraUrl} target="_blank" rel="noopener noreferrer">
        Jira
      </a>
    </td>
  </tr>
))
}


</tbody>

</table>


</div>


</div>

)

}
// ─────────────────────────────────────────────────────────────
// COMPARISON TAB
// ─────────────────────────────────────────────────────────────


const H1_2025_INCIDENTS = [
  { month:"Jan", value:55 },
  { month:"Feb", value:82 },
  { month:"Mar", value:57 },
  { month:"Apr", value:44 },
  { month:"May", value:25 },
  { month:"Jun", value:41 },
];


const H1_2026_INCIDENTS = MONTHLY_INCIDENTS.map(d => ({
  month:d.month,
  value:
    d.p1 +
    d.p2 +
    d.p3 +
    d.p4
}));



function ComparisonTab(){

return (

<div className="tab-panel">

<section className="report-section">


<div className="section-heading">

<div>

<span className="eyebrow">
Comparison
</span>

<h2>
2025 vs 2026 Incident Comparison
</h2>

</div>

</div>


<ComparisonBarChart/>


</section>

</div>

)

}




// ─────────────────────────────────────────────────────────────
// MEET THE EXPERTS TAB
// ─────────────────────────────────────────────────────────────


function MeettheExpertsTab() {
  const experts = [
    {
      name: "Swathy",
      title: "Spring Architect Prime",
      description:
        "Designs scalable Spring Boot solutions and turns complex requirements into elegant architectures.",
    },
    {
      name: "Ashok",
      title: "Application Forge Master",
      description:
        "Builds resilient backend services where performance meets precision.",
    },
    {
      name: "Willson",
      title: "Code Execution Commander",
      description:
        "Transforms ideas into reliable, production-ready code with engineering discipline.",
    },
    {
      name: "Gowtham S",
      title: "Pipeline Commander",
      description:
        "Automates delivery pipelines and engineers the foundation for continuous deployment.",
    },
    {
      name: "Sivabharathi",
      title: "Reliability Sentinel",
      description:
        "Keeps deployments smooth and production systems resilient around the clock.",
    },
    {
      name: "Gobinath",
      title: "Infrastructure Guardian",
      description:
        "Protects and strengthens the infrastructure that powers every platform service.",
    },
    {
      name: "Gowtham V",
      title: "Infrastructure Navigator",
      description:
        "Steers infrastructure reliability while ensuring stable platform operations.",
    },
    {
      name: "Ashfaq",
      title: "Operations Orchestrator",
      description:
        "Transforms operational challenges into strategic improvements and lasting solutions.",
    },
    {
      name: "Ragava",
      title: "Feature Engineer & Reliability Ranger",
      description:
        "Builds new capabilities while safeguarding production reliability.",
    },
    {
      name: "Mirudula",
      title: "Operations Sentinel",
      description:
        "Monitors, resolves, and ensures uninterrupted platform operations with precision.",
    },
    {
      name: "Sai",
      title: "Feature Engineer & Reliability Ranger",
      description:
        "Develops scalable features and champions operational excellence.",
    },
    {
      name: "Parameshwari",
      title: "API Gateway Guardian",
      description:
        "Secures and orchestrates APIs that connect systems seamlessly and reliably.",
    },
    {
      name: "Sridevi",
      title: "API Integration Specialist",
      description:
        "Builds seamless API integrations that connect systems with speed and precision.",
    },
    {
      name: "Kaushik",
      title: "Engineering Orchestrator",
      description:
        "Leads the platform mission by empowering the team, shaping engineering strategy, driving operational excellence, and ensuring every deployment moves the organization forward.",
    },
  ];

  return (
    <div className="tab-panel">
      <section className="report-section">

        <div className="section-heading">
          <div>
            <span className="eyebrow">TEAM</span>
            <h2>Meet the Experts</h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px",
                lineHeight: "1.6",
              }}
            >
              The talented engineers behind platform innovation, reliability,
              automation, security, and operational excellence.
            </p>
          </div>
        </div>


        {/* Team Photos */}
        <div
          className="team-grid"
          style={{
            marginTop: "35px",
            marginBottom: "45px",
          }}
        >
          <img
            src={team1}
            alt="Team Photo 1"
            className="team-image"
          />

          <img
            src={team2}
            alt="Team Photo 2"
            className="team-image"
          />

          <img
            src={team3}
            alt="Team Photo 3"
            className="team-image"
          />
        </div>


        {/* Expert Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {experts.map((expert, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "25px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#0369a1",
                  fontSize: "21px",
                }}
              >
                {expert.name}
              </h3>

              <h4
                style={{
                  margin: "0 0 12px",
                  color: "#0f172a",
                  fontSize: "16px",
                }}
              >
                {expert.title}
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.7",
                  fontSize: "15px",
                }}
              >
                {expert.description}
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────
// INSIGHTS TAB
// ─────────────────────────────────────────────────────────────


function InsightsTab() {

  return (

    <div className="tab-content">


      <div style={S.section}>


        <h2 style={S.sectionTitle}>
          💡 Insights
        </h2>

<div style={S.cardGrid}>

  <InsightCard
    emoji="🎉"
    title="Recent Wins"
    items={RECENT_WINS}
  />

  <InsightCard
    emoji="📉"
    title="Emerging Trends"
    items={EMERGING_TRENDS}
  />

  <InsightCard
    emoji="🤝"
    title="Team Efforts"
    items={TEAM_EFFORTS}
  />

</div>


      </div>



      <div style={S.section}>


        <h2 style={S.sectionTitle}>
          🧭 What's Next
        </h2>



        <ul style={S.nextList}>

          {WHATS_NEXT.map((item, index) => (
            <div key={index}>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>
          ))}

        </ul>


      </div>


    </div>

  );

}





// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────


const TABS = [

{
id:"Operations",
label:"📊 Operations"
},

{
id:"incidents",
label:"🚨 Incidents"
},
{
  id:"platform",
  label:"🖥️ Platform"
},

{
id:"releases",
label:"🚀 Releases"
},

{
id:"insights",
label:"💡 Insights"
},

{
id:"comparison",
label:"📈 Comparison"
},

{
id:"Meet the Experts",
label:"👥 Meet the Experts"
}

];




export default function H1Report(){


const [activeTab,setActiveTab]
=
useState("overview");


const [exporting,setExporting]
=
useState(false);



useEffect(()=>{


const style=document.createElement("style");

style.innerHTML=ANIMATION_CSS;


document.head.appendChild(style);



return()=>{

document.head.removeChild(style);

};


},[]);




const handleExport=()=>{


setExporting(true);


setTimeout(()=>{

window.print();

setExporting(false);

},300);


};




const renderTab=()=>{


switch(activeTab){


case "overview":
return <OverviewTab/>;


case "incidents":
return <IncidentsTab/>;

case "platform":
return <Platform />;


case "releases":
return <ReleasesTab/>;


case "insights":
return <InsightsTab/>;


case "comparison":
return <ComparisonTab/>;

case "Meet the Experts":
return <Meet the ExpertsTab/>;


default:
return <OverviewTab/>;


}


};




return(

<div style={S.page}>


<div style={S.hero}>


<h1
className="hero-title"
style={S.heroTitle}
>

2026 H1 APIMS : Platform and Operations

</h1>


<p style={S.heroSub}>

Engineering Performance Report · Jan – Jun 2026

</p>



<span
className="hero-badge"
style={S.heroBadge}
>

📊 Half-Year Summary

</span>


</div>





<div style={S.content}>



<button

className="export-btn"

style={S.exportBtn}

onClick={handleExport}

>

{
exporting
?
"Preparing..."
:
"⬇ Export as PDF"
}


</button>





<div style={S.tabBar}>


{
TABS.map(tab=>(


<button

key={tab.id}

className="tab-btn"

style={
S.tabBtn(activeTab===tab.id)
}


onClick={()=>setActiveTab(tab.id)}

>

{tab.label}

</button>


))

}


</div>




{renderTab()}



</div>


</div>


)


}