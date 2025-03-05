"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  form();
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  // Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };

  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    item.addEventListener('click', function() {
      const details = this.querySelector('.timeline-details');
      if (details.style.display === 'block') {
        details.style.display = 'none';
      } else {
        details.style.display = 'block';
      }
    });
  });

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) { // Adjust the scroll position as needed
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

function toggleDetails(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle('hidden');
  }
}

function showDetails(id) {
  const details = {
    experience1: `
      <ul>
        <li>Data Analysis Leveraging Prescription Drug Monitoring Program (PDMP) Data to Maximize Overdose Prevention Capacity for Stakeholders, focusing on Identifying Patterns and Barriers impacting Prescription Checks.</li>
        <li>Collaborated with Multidisciplinary teams to study Factors influencing Buprenorphine Prescribing Rates across NYC, Analyzing Crude Rates and Demographic Conducted Disparities to inform Evidence-Based policy recommendations.</li>
        <li>Supported budgeting and forecasting efforts for health programs, ensuring alignment with fiscal goals.</li>
        <li>Authored a Research Paper examining the Impact of COVID-19 on Opioid Prescribing pre, post and during the pandemic.</li>
        <li>Research Telehealth Implementation to improve Accessibility and Effectiveness, Contributing to Recommendations for Future Grant-Funded Initiatives.</li>
        <li>Tracked Workforce metrics and Lifecycle processes, creating detailed dashboards to support Strategic Planning.</li>
      </ul>
    `,
    experience2: `
      <ul>
        <li>Facilitated Procurement and Vendor Negotiations to Streamline Operations and Improve Cost Efficiency by%.</li>
        <li>Conducted Public Data Collection and Aggregated Data for the Management Information System (MIS), interacting with 500+ Students, gathering Academic Data, and maintaining Accurate Bookkeeping Records.</li>
        <li>Built Tools that stored Extracted Data from Automation Scripts, Efficiently Populating Databases with 1,000+ Entries to support MIS Operations.</li>
        <li>Collaborated with Cross-Functional Teams to Refine Data Aggregation Techniques, ensuring 100% Alignment with Organizational Requirements.</li>
        <li>Designed Interactive Dashboards showcasing Aggregated Data, providing Actionable Insights and enabling Stakeholders to make Data-Driven Decisions, Optimizing Academic Workflows by 30%. Used Power BI to visualize Budgetary and Workforce Metrics by making 45% efficiency.</li>
      </ul>
    `,
    experience3: `
      <ul>
        <li>Built Business Intelligence Dashboards in Power BI and Looker, providing Real-Time Insights into IAM Metrics that Increased Executive Decision-Making Efficiency by 45% within the Identity and Access Management team.</li>
        <li>Spearheaded IAM Cost-Saving Initiatives, Cutting Operational Expenses by 15% while Maintaining Upholding Security and Compliance Standards.</li>
        <li>Deployed Automated SQL-Based Reporting Solutions to Monitor User Access Patterns and Track Compliance, Improving Audit Readiness by 30%.</li>
      </ul>
    `
  };

  const jobDetails = document.getElementById(id);
  jobDetails.innerHTML = details[id];
  jobDetails.style.display = 'block';

  // Remove active class from all timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked timeline item
  document.querySelector(`.timeline-item[onclick="showDetails('${id}')"]`).classList.add('active');
}

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle('hidden');
  }
}

function toggleProjectDetails(link) {
  const projectDetails = link.nextElementSibling;
  if (projectDetails) {
    projectDetails.classList.toggle('hidden');
  }
}

