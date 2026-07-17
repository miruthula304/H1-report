import { useState } from "react";
import "./H2Report.css";

import team1 from "./team1.jpeg";
import team2 from "./team2.jpeg";
import team3 from "./team3.jpeg";

/* =========================================================
   DATA SECTION
========================================================= */
const platformStyles = `
.platform-section {
  padding: 40px;
  background: linear-gradient(135deg, #081b33, #0d3b66);
  border-radius: 20px;
  color: white;
}

.platform-header {
  text-align: center;
  margin-bottom: 35px;
}

.platform-header h2 {
  font-size: 36px;
  color: #00e5ff;
}

.platform-header p {
  color: #cbd5e1;
  font-size: 16px;
}

.platform-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.platform-card {
  display: flex;
  gap: 18px;
  padding: 25px;
  background: rgba(255,255,255,0.12);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  transition: 0.3s;
}

.platform-card:hover {
  transform: translateY(-8px);
  background: rgba(0,229,255,0.15);
}

.platform-icon {
  font-size: 30px;
  min-width: 55px;
  height: 55px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#00e5ff;
  color:#002b45;
  border-radius:50%;
}

.platform-card h3 {
  margin:0 0 10px;
}

.platform-card p {
  color:#dbeafe;
  line-height:1.6;
}
`;

const style = document.createElement("style");
style.innerHTML = platformStyles;
document.head.appendChild(style);

const MONTHLY_INCIDENTS = [
  { month: "Jan", p1: 0, p2: 1, p3: 20, p4: 48 },
  { month: "Feb", p1: 0, p2: 0, p3: 15, p4: 28 },
  { month: "Mar", p1: 1, p2: 0, p3: 35, p4: 74 ,marker: "red1"},
  { month: "Apr", p1: 0, p2: 0, p3: 22, p4: 35 },
  { month: "May", p1: 0, p2: 0, p3: 10, p4: 17 ,marker: "green1"},
  { month: "Jun", p1: 0, p2: 1, p3: 40, p4: 72 ,marker: "red2"},
];


/*
  Derived values
  Do not manually edit
*/

const INCIDENT_DATA = MONTHLY_INCIDENTS.map(item => ({
  ...item,
  p1p2: item.p1 + item.p2,
  p3p4: item.p3 + item.p4,
  total:
    item.p1 +
    item.p2 +
    item.p3 +
    item.p4
}));


const TOTAL_P1P2 = INCIDENT_DATA.reduce(
  (sum,item)=>sum + item.p1p2,
  0
);

const TOTAL_P3P4 = INCIDENT_DATA.reduce(
  (sum,item)=>sum + item.p3p4,
  0
);

const TOTAL_INCIDENTS =
  TOTAL_P1P2 + TOTAL_P3P4;


/* =========================================================
   KEY METRICS
========================================================= */

const KEY_METRICS = [
  {
    icon:"P1/P2",
    label:"Critical incidents received",
    value:TOTAL_P1P2,
    tone:"critical",
    href:
    "https://sky.atlassian.net/wiki/spaces/CRM/pages/4379803716/2026+Priority+Incident+Tracker"
  },

  {
    icon:"P3/P4",
    label:"Standard incidents received",
    value:TOTAL_P3P4,
    tone:"info",
    href:"https://spark.at.sky/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_query%3DstateANYTHING%255Eassignment_groupDYNAMIC570ca06637aafe406cf54b3a54990e96%255Eopened_by!%253D4bd0c8d01b71cd90d1b2db16dc4bcb31%255Eopened_atBETWEENjavascript%3Ags.dateGenerate(%25272026-01-05%2527%252C%252700%3A00%3A00%2527)%40javascript%3Ags.dateGenerate(%25272026-07-01%2527%252C%252723%3A59%3A59%2527)%255Epriority%253D3%255EORpriority%253D4%26sysparm_first_row%3D1%26sysparm_view%3D"
  },

  {
    icon:"Ops",
    label:"Callouts handled",
    value:383,
    tone:"accent",
    href:
    "https://sky.atlassian.net/wiki/spaces/CRM/pages/4601413778/2026+Spark+Call-out+Report"
  },

  {
    icon:"MR",
    label:"Monitoring requests shared",
    value:22,
    tone:"neutral",
    href:
    "https://sky.atlassian.net/wiki/spaces/CRM/pages/4451729410/Microservices+-+PI26-1+Requirements+for+monitoring"
  },

  {
    icon:"Done",
    label:"Monitoring requests implemented",
    value:11,
    tone:"success",
    href:
    "https://sky.atlassian.net/wiki/spaces/CRM/pages/4829383819/Microservices+-+PI26-2+Requirements+for+monitoring"
  }
];



/* =========================================================
   RELEASE DATA
========================================================= */

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
 Comments:"Deployment completed without any major hiccups, within expected time window.",
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
const S = {
  th: {
    padding: "20px",
    textAlign: "left",
    verticalAlign: "top",
    borderBottom: "1px solid #ddd"
  },

  td: {
    padding: "20px",
    textAlign: "left",
    verticalAlign: "top",
    borderBottom: "1px solid #ddd"
  }
};



/* =========================================================
   INSIGHTS
========================================================= */


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
      "Reducing P3 and P4 incidents compared to H1-2025, with IDM go-live callouts stabilized within two days.",
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
const TABS=[

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
 label:"💡 OPS Insights"
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
const COMPARISON_DATA = [
  {
    label: "2025 Total",
    segments: [
      {
        name: "H1-2025",
        value: 300,
        color: "#0077b6",
      },
      {
        name: "H2-2025",
        value: 350,
        color: "#90e0ef",
      },
    ],
    total: 650,
  },

  {
    label: "H1-2026",
    segments: [
      {
        name: "H1-2026",
        value: TOTAL_INCIDENTS,
        color: "#023e8a",
      },
    ],
    total: TOTAL_INCIDENTS,
  },
];
const H1_2025_MONTHLY = [
  { month: "Jan", value: 55 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 57 },
  { month: "Apr", value: 44 },
  { month: "May", value: 25 },
  { month: "Jun", value: 41 }
];

const H1_2026_MONTHLY = [
  { month: "Jan", value: 69 },
  { month: "Feb", value: 43 },
  { month: "Mar", value: 110 },
  { month: "Apr", value: 57 },
  { month: "May", value: 27 },
  { month: "Jun", value: 113 }
];
function MonthlyComparison() {
  return (
    <div className="monthly-wrap">

      <h3 className="monthly-title">
        Monthly Comparison (H1-2025 vs H1-2026)
      </h3>

      <div className="graph">

        {/* Y axis spacing */}
        <div className="graph-area">

          {H1_2025_MONTHLY.map((item, index) => {
            const h2026 = H1_2026_MONTHLY[index];

            return (
              <div className="graph-row" key={item.month}>

                <div className="graph-month">
                  {item.month}
                </div>

                <div className="graph-bars">

                  {/* H1-2025 bar */}
                  <div className="bar-wrap">
                    <div
                      className="bar h2025"
                      style={{ height: `${item.value}px` }}
                    />
                    <span>{item.value}</span>
                  </div>

                  {/* H1-2026 bar */}
                  <div className="bar-wrap">
                    <div
                      className="bar h2026"
                      style={{ height: `${h2026.value}px` }}
                    />
                    <span>{h2026.value}</span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
const HIGHLIGHTS=[

{
label:"Service health",
value:"Stable",
detail:"Limited number of critical incidents"
},

{
label:"Release execution",
value:"5 shipped",
detail:"Successful H1-2026 delivery"
},

{
label:"Response posture",
value:"<15 min",
detail:"Improved response time"
}

];


const SUMMARY_CARDS=[

{
label:"Total incidents",
value:TOTAL_INCIDENTS,
tone:"neutral"
},

{
label:"Critical incidents",
value:TOTAL_P1P2,
tone:"critical"
},

{
label:"Callouts",
value:383,
tone:"accent"
}

];
function MetricRow({
  icon,
  label,
  value,
  href,
  tone
}) {

  return (
    <div className="metric-row">

      <div className="metric-meta">

        <div className={`metric-icon metric-icon--${tone}`}>
          {icon}
        </div>

        <p>{label}</p>

      </div>


      {
        href ?

        <a
          className={`metric-value metric-value--${tone} metric-value--link`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value.toLocaleString()}
        </a>

        :

        <div className={`metric-value metric-value--${tone}`}>
          {value.toLocaleString()}
        </div>

      }


    </div>
  );
}



/* =========================================================
   INCIDENT TREND CHART
========================================================= */

function TrendChart({
  data
}) {


const maxValue=Math.max(
  ...data.map(
    item=>Math.max(
      item.p1p2,
      item.p3p4
    )
  ),
  1
);



return (

<div className="trend-chart">


<div className="chart-legend">

<span>
<i className="legend-dot legend-dot--critical"/>
P1/P2
</span>


<span>
<i className="legend-dot legend-dot--info"/>
P3/P4
</span>


</div>



{
data.map(item=>(

<div className="chart-row" key={item.month}>


<div className="chart-month">
{item.month}
</div>



<div className="chart-bars">


<div className="chart-bar-group">

<div
className="chart-bar chart-bar--critical"
style={{
width:`${(item.p1p2/maxValue)*100}%`
}}
/>

<span>
{item.p1p2}
</span>


</div>



<div className="chart-bar-group">

<div
className="chart-bar chart-bar--info"
style={{
width:`${(item.p3p4/maxValue)*100}%`
}}
/>


<span>
{item.p3p4}
</span>


</div>


</div>


</div>

))
}



</div>

);

}
function ComparisonBarChart(){

const maxValue = Math.max(
 ...COMPARISON_DATA.map(item => item.total)
);

return (

<div className="comparison-chart">

{
COMPARISON_DATA.map(item => (

<div className="comparison-row" key={item.label}>

<div className="comparison-label">
{item.label}
</div>


<div className="comparison-bar-container">

<div className="comparison-bar">

{
item.segments.map(segment => (

<div
key={segment.name}
className="comparison-segment"
style={{
width:`${(segment.value/maxValue)*100}%`,
background:segment.color
}}
>

{segment.name}

</div>

))
}

</div>


<strong>
{item.total}
</strong>


</div>

</div>

))
}


</div>

)

}


/* =========================================================
 INSIGHT CARD
========================================================= */


function InsightCard({
  title,
  items = [],
  eyebrow
}) {
  return (
    <article className="insight-card">
      <span className="eyebrow">
        {eyebrow}
      </span>

      <h3>{title}</h3>

      <div className="insight-items">
        {items.map((item, index) => (
          <div
            key={index}
            style={{ marginBottom: "18px" }}
          >
            <h4
              style={{
                color: "#0369a1",
                marginBottom: "6px"
              }}
            >
              {item.title}
            </h4>

            <p
              style={{
                margin: 0,
                lineHeight: "1.6"
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

/* =========================================================
 OVERVIEW TAB
========================================================= */


function OverviewTab(){

return (

<div className="tab-panel">


<section className="summary-grid">


{
SUMMARY_CARDS.map(card=>(

<article
key={card.label}
className={`summary-card summary-card--${card.tone}`}
>


<span>
{card.label}
</span>


<strong>
{card.value.toLocaleString()}
</strong>


</article>

))
}


</section>





<section className="report-section">


<div className="section-heading">


<div>

<span className="eyebrow">
Executive snapshot
</span>


<h2>
Core operating metrics
</h2>


</div>


<p>
Click highlighted values to open source pages
</p>


</div>



<div className="metrics-grid">


{
KEY_METRICS.map(metric=>(

<MetricRow
key={metric.label}
{...metric}
/>

))
}


</div>


</section>


</div>

);

}







/* =========================================================
 INCIDENT TAB
========================================================= */


/* =========================================================
 INCIDENT TAB
========================================================= */

/* =========================================================
   INCIDENT TAB
========================================================= */

function IncidentsTab() {

  return (

    <div className="tab-panel">


      <section className="report-section report-section--split">


        <div>


          <div className="section-heading">


            <div>

              <span className="eyebrow">
                Operations trend
              </span>


              <h2>
                Monthly incident profile
              </h2>

            </div>



            <a
              href="https://sky.atlassian.net/wiki/spaces/CRM/pages/4379803716/2026+Priority+Incident+Tracker"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color:"#00e5ff",
                fontWeight:"600",
                textDecoration:"none",
                marginLeft:"auto",
                alignSelf:"center"
              }}
            >
              2026 Priority Tracker
            </a>


          </div>



          <TrendChart data={INCIDENT_DATA}/>


        </div>




        <aside className="support-card">


          <span className="eyebrow">
            Readout
          </span>


          <h3>
            What stands out
          </h3>


          <p>
            P1/P2 volume remained low while standard incidents stayed manageable throughout H1-2026.
          </p>



          <ul className="compact-list">


            <li>
              Total incidents: {TOTAL_INCIDENTS}
            </li>


            <li>
              Highest incident month: June
            </li>


          </ul>


        </aside>



      </section>






      <section className="report-section">


        <div className="section-heading">


          <div>

            <span className="eyebrow">
              Supporting data
            </span>


            <h2>
              Monthly breakdown
            </h2>


          </div>


        </div>





        <div className="table-shell">



          <table className="report-table">


            <thead>

              <tr>

                <th>
                  Month
                </th>

                <th>
                  P1
                </th>

                <th>
                  P2
                </th>

                <th>
                  P3
                </th>

                <th>
                  P4
                </th>

                <th>
                  Total
                </th>


              </tr>

            </thead>





            <tbody>


              {
                MONTHLY_INCIDENTS.map((item)=>(


                  <tr key={item.month}>


                    <td>
                      {item.month} 2026
                    </td>


                    <td>
                      {item.p1}
                    </td>


                    <td>
                      {item.p2}
                    </td>


                    <td>
                      {item.p3}
                    </td>


                    <td>
                      {item.p4}
                    </td>



                    <td>


                      {item.p1 + item.p2 + item.p3 + item.p4}



                      {
                        item.marker === "red1" && (

                          <span
                            style={{
                              color:"red",
                              marginLeft:"5px"
                            }}
                          >
                            ★
                          </span>

                        )
                      }



                      {
                        item.marker === "red2" && (

                          <span
                            style={{
                              color:"red",
                              marginLeft:"5px"
                            }}
                          >
                            ★★
                          </span>

                        )
                      }



                      {
                        item.marker === "green1" && (

                          <span
                            style={{
                              color:"green",
                              marginLeft:"5px"
                            }}
                          >
                            ★
                          </span>

                        )
                      }



                    </td>



                  </tr>


                ))
              }


            </tbody>



          </table>






          {/* STAR GLOSSARY */}

          <div style={{marginTop:"20px"}}>


            <h3>
              Star Glossary
            </h3>



            <p>

              <span style={{color:"red"}}>
                ★
              </span>

              {" "}
              = High count is due to customer profile refresh and pod allocation for new customer during the Bundesliga match

            </p>




            <p>

              <span style={{color:"red"}}>
                ★★
              </span>

              {" "}
              = Couchbase issue and IDM go-live related incidents

            </p>





            <p>

              <span style={{color:"green"}}>
                ★
              </span>

              {" "}
              = Handover of the service domain to the fulfillment

            </p>



          </div>



        </div>



      </section>



    </div>

  );

}

function Platform() {
  const platformAchievements = [
    {
      icon: "🧩",
      title: "Modular Parent Framework",
      description:
        "Successfully completed the modular parent initiative and merged all changes into the main branch. The rollout to all repositories is currently underway. This creates a smoother migration path to Spring Boot 4 while improving application startup time through a modular and optimized framework.",
    },
    {
      icon: "🛡️",
      title: "30,000+ Vulnerabilities Resolved",
      description:
        "Over the past six months, we resolved more than 30,000 vulnerabilities across 350+ repositories. This significantly strengthened application security posture and helped maintain a secure and compliant ecosystem.",
    },
    {
      icon: "🔐",
      title: "PII Data Masking",
      description:
        "Successfully implemented PII data masking capabilities in the parent framework. Feature teams can now easily mask sensitive information in application logs, improving data privacy and protection.",
    },
    {
      icon: "🚀",
      title: "Testcontainers Enablement",
      description:
        "Successfully implemented Testcontainers support for Microcks, Couchbase, and Kafka. This enables faster, reliable, and production-like integration testing in local environments.",
    },
    {
      icon: "☕",
      title: "Java 25 Upgrade",
      description:
        "Successfully upgraded the platform to Java 25 and adapted all CI/CD pipelines. The platform is now ready to leverage modern Java capabilities and future enhancements.",
    },
    {
      icon: "⚙️",
      title: "Engineering Enablement",
      description:
        "Continued supporting feature teams with CPU and memory optimization, deployment support, performance troubleshooting, IDM improvements, and technical issue resolution.",
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8fafc",
        borderRadius: "20px",
      }}
    >

      {/* PLATFORM SECTION */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            color: "#0369a1",
          }}
        >
          Platform Achievements
        </h2>

        <p
          style={{
            color: "#475569",
            fontSize: "17px",
          }}
        >
          Key engineering initiatives improving security,
          scalability, performance, and developer productivity.
        </p>
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
        }}
      >
        {platformAchievements.map((item,index)=>(
          <AchievementCard
            key={index}
            item={item}
          />
        ))}
      </div>


      {/* APIGEE SECTION BELOW PLATFORM */}
      <Apigee />

    </div>
  );
}



function Apigee() {

  const apigeeAchievements = [
    {
      icon:"🛡️",
      title:"Enhanced Platform Security",
      description:
      "Successfully implemented YubiKey-based Multi-Factor Authentication (MFA) for Apigee administrative access, strengthening platform security and aligning with organizational security compliance requirements.",
    },
    {
      icon:"👤",
      title:"Identity Management (IDM) Migration",
      description:
      "Successfully completed the IDM migration for the Apigee platform, ensuring seamless authentication, improved identity governance, and minimal disruption to platform users.",
    },
    {
      icon:"🏗️",
      title:"Solution Architecture Optimization",
      description:
      "Successfully redesigned the integration flow for APIs that were directly communicating with Salesforce by introducing a microservice layer. This ensured adherence to the enterprise integration standard (Apigee → Microservice → Salesforce), improving maintainability, scalability, and governance.",
    },
  
  ];


  return (
    <section
      style={{
        marginTop:"70px",
      }}
    >

      <div
        style={{
          textAlign:"center",
          marginBottom:"40px",
        }}
      >

        <h2
          style={{
            fontSize:"36px",
            color:"#0369a1",
          }}
        >
          Apigee Achievements
        </h2>


        <p
          style={{
            color:"#475569",
            fontSize:"17px",
          }}
        >
          Key initiatives focused on API security,
          governance, architecture optimization,
          and platform reliability.
        </p>

      </div>



      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(320px,1fr))",
          gap:"25px",
        }}
      >

      {apigeeAchievements.map((item,index)=>(
        <AchievementCard
          key={index}
          item={item}
        />
      ))}

      </div>


    </section>
  );
}




function AchievementCard({item}) {

  return (
    <div
      style={{
        background:"#ffffff",
        borderRadius:"20px",
        padding:"25px",
        display:"flex",
        gap:"18px",
        border:"1px solid #e2e8f0",
        boxShadow:
        "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >

      <div
        style={{
          minWidth:"55px",
          height:"55px",
          borderRadius:"50%",
          background:
          "linear-gradient(135deg,#06b6d4,#0284c7)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontSize:"28px",
        }}
      >
        {item.icon}
      </div>


      <div>

        <h3
          style={{
            margin:"0 0 12px",
            color:"#0369a1",
            fontSize:"21px",
          }}
        >
          {item.title}
        </h3>


        <p
          style={{
            margin:0,
            color:"#334155",
            lineHeight:"1.7",
            fontSize:"15px",
          }}
        >
          {item.description}
        </p>

      </div>


    </div>
  );
}
function ReleasesTab(){

const released =
FEATURE_RELEASES.filter(
item=>item.status==="Released"
).length;


return (

<div className="tab-panel">


<section className="status-strip">


<article>

<span className="eyebrow">
Delivered
</span>

<strong>
{released}
</strong>

<p>
Releases completed in H1
</p>

</article>






</section>





<section className="report-section">


<div className="section-heading">

<div>

<span className="eyebrow">
Delivery rhythm
</span>

<h2>
Feature release timeline
</h2>

</div>

</div>





<div className="table-container">

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed"
  }}
>

<thead>
<tr>

<th style={{...S.th, width:"35%"}}>
  Feature
</th>

<th style={{...S.th, width:"40%"}}>
  Comments
</th>

<th style={{...S.th, width:"15%"}}>
  Status
</th>

<th style={{...S.th, width:"10%"}}>
  Reference
</th>

</tr>
</thead>


<tbody>

{
FEATURE_RELEASES.map(item => (

<tr key={item.name}>

<td style={S.td}>
  {item.name}
</td>


<td style={S.td}>
  {item.Comments}
</td>


<td style={S.td}>

<span
className={
item.status === "Released"
?
"status-pill status-pill--released"
:
"status-pill status-pill--progress"
}
>
{item.status}
</span>

</td>


<td style={S.td}>

{
item.jiraUrl ?

<a
className="table-link"
href={item.jiraUrl}
target="_blank"
rel="noopener noreferrer"
>
View
</a>

:

<span className="table-muted">
Not linked
</span>

}

</td>


</tr>

))

}

</tbody>

</table>


</div>


</section>



</div>

);

}







/* =====================================================
   INSIGHTS TAB
===================================================== */


function InsightsTab() {

  return (

    <div className="tab-panel">


      <section className="insight-grid">


        <InsightCard
          eyebrow="Wins"
          title="Recent Wins"
          items={RECENT_WINS}
        />


        <InsightCard
          eyebrow="Patterns"
          title="Emerging Trends"
          items={EMERGING_TRENDS}
        />


        <InsightCard
          eyebrow="Team"
          title="Execution Support"
          items={TEAM_EFFORTS}
        />


      </section>




      <section className="report-section">


        <div className="section-heading">

          <div>

            <span className="eyebrow">
              Forward look
            </span>


            <h2>
              What's Next
            </h2>


          </div>

        </div>




        <div className="next-grid">


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


        </div>


      </section>



    </div>

  );

}

/* =====================================================
   COMPARISON TAB
===================================================== */


const H1_2025 = [

{
month:"Jan",
value:55
},

{
month:"Feb",
value:82
},

{
month:"Mar",
value:57
},

{
month:"Apr",
value:44
},

{
month:"May",
value:25
},

{
month:"Jun",
value:41
}

];




function ComparisonTab() {
  return (
    <div className="tab-panel">

      <section className="report-section">

        <div className="section-heading">
          <div>
            <span className="eyebrow">Comparison</span>
            <h2>2025 vs 2026 Incident Comparison</h2>
          </div>
        </div>

        {/* TOP BAR (your existing one) */}
        <ComparisonBarChart />

        {/* BOTTOM MONTHLY CHART (NEW) */}
        <MonthlyComparison />

      </section>

    </div>
  );
}

/* =====================================================
   MEET THE EXPERTS TAB
===================================================== */


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
/* =====================================================
   MAIN COMPONENT
===================================================== */


function H2ReportEnhanced(){


const [
activeTab,
setActiveTab
]=useState("overview");



const [
exporting,
setExporting
]=useState(false);




const handleExport=()=>{


setExporting(true);


setTimeout(()=>{

window.print();

setExporting(false);

},300);


};





const renderTab = () => {

  if (activeTab === "incidents") {
    return <IncidentsTab />;
  }

  if (activeTab === "releases") {
    return <ReleasesTab />;
  }
  if (activeTab === "platform") {
    return <Platform />;
  }
  if (activeTab === "insights") {
    return <InsightsTab />;
  }

  if (activeTab === "comparison") {
    return <ComparisonTab />;
  }

 if (activeTab === "Meet the Experts") {
  return <MeettheExpertsTab />;
}

  return <OverviewTab />;
};




return (

<main className="report-page">



<section className="hero">


<div className="hero__content">


<div className="hero__copy">


<span className="hero__eyebrow">
H1-2026 Report
</span>


<h1>
APIMS Platform and Operations
</h1>


<p>
Engineering performance summary covering incidents, releases, platform improvements, monitoring enhancements, and future priorities.
</p>


</div>





<div className="hero__panel">



{
HIGHLIGHTS.map(item=>(


<div
className="highlight-row"
key={item.label}
>


<div>

<strong>
{item.value}
</strong>


<p>
{item.label}
</p>


</div>


<span>
{item.detail}
</span>


</div>


))

}



</div>


</div>


</section>





<div className="report-shell">



<div className="topbar">


<div className="tablist">


{
TABS.map(tab=>(


<button

key={tab.id}

className={
activeTab===tab.id
?
"tab-button is-active"
:
"tab-button"
}

onClick={()=>
setActiveTab(tab.id)
}

>

{tab.label}

</button>


))

}



</div>





<button

className="export-button"

onClick={handleExport}

>


{
exporting
?
"Preparing..."
:
"Export PDF"
}


</button>



</div>




{renderTab()}



</div>



</main>


);


}
export default H2ReportEnhanced;
