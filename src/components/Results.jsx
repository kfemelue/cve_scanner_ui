import { useContext } from "react";
import { ResultsJSON } from '../App';

export function ResultsComponent(props) {
    const { results, setResults } = useContext(ResultsJSON);

    let criticalCount = 0;
    let highCount = 0;
    let medCount = 0;
    let lowCount = 0;
    let findingsHTML = [];

    if (results) {


        const sortedFindings = [...results.findings].sort((a, b) => {
            return b.cvss_score - a.cvss_score
        });

        for (let i = 0; i < sortedFindings.length; i++) {
            if (sortedFindings[i].cvss_severity == "CRITICAL") {
                criticalCount += 1;
            } else if (sortedFindings[i].cvss_severity == "HIGH") {
                highCount += 1;
            } else if (sortedFindings[i].cvss_severity == "MED") {
                medCount += 1;
            } else if (sortedFindings[i].cvss_severity == "LOW") {
                lowCount += 1;
            };

            let html = <section key={i} className="vulnerability-finding">
                <p>{sortedFindings[i].cve_id} </p>
                <p>Severity: {sortedFindings[i].cvss_severity} </p>
                {/* <p>Confidence Level: {sortedFindings[i].confidence} </p> */}
                <p>File: {sortedFindings[i].dependency.source_file} </p>
                <p>Dependency: {sortedFindings[i].dependency.name}</p>
                <button onClick> Details </button>
                {/* click button to open modal for a vulnerability's finding detail */}
                {/* pass sortedFindings[i] as a prop into VulnerabilityModal component */}
            </section>;

            findingsHTML = [...findingsHTML, html]
        }
    }



    return (
        <section id="results-container">
            <section className="results-heading">
                <h3>Application Status: {String(results.status).toUpperCase()} </h3>
            </section>
            <section className="results" id="summary">
                <p><strong>{results.findings == 0 ? 0 : criticalCount}</strong> Critical Severity Vulnerability Risk Findings</p>
                <p><strong>{results.findings == 0 ? 0 : highCount}</strong> High Severity Vulnerability Findings</p>
                <p><strong>{results.findings == 0 ? 0 : medCount}</strong> Med Severity Vulnerability Findings</p>
                <p><strong>{results.findings == 0 ? 0 : lowCount}</strong> Low Severity Vulnerability Findings</p>
            </section>
            <section className="results-heading">
                <h3>Vulnerabilites</h3>
            </section>
            <section className="results" id="findings">
                {findingsHTML.map((findingElement) => {
                    return findingElement
                })}
            </section>
        </section>
    )
}
