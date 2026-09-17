import { useContext } from "react";
import { ResultsJSON } from '../App';

export function ResultsComponent(props) {
    const { results, setResults } = useContext(ResultsJSON);

    let criticalCount = 0;
    let highCount = 0;
    let medCount = 0;
    let lowCount = 0;
    let findingsHTML = [];

    const sortedFindings = results.findings.sort((a, b) => {
        return a.cvss_score - b.cvss_score
    });

    for (let i = 0; i < sortedFindings.length; i++) {
        if (sortedFindings[i].cvss_severity =="CRITICAL") {
            criticalCount+=1;
        } else if (sortedFindings[i].cvss_severity =="HIGH"){
            highCount+=1;
        } else if (sortedFindings[i].cvss_severity =="MED"){
            medCount+=1;
        } else if (sortedFindings[i].cvss_severity =="LOW"){
            lowCount+=1;
        };

        let html = <section key={i} className="vulnerability-finding">
                    <p>CVE: {sortedFindings[i].cve_id} </p>
                    <p>Severity: {sortedFindings[i].cvss_severity} </p>
                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>;

        findingsHTML = [...findingsHTML, html]
    }



    return (
        <section id="results-container">
            <section className="results-heading">
                <h3>Application Status: {results.status.toUpperCase()} </h3>
            </section>
            <section className="results" id="summary">
                <p><strong>{results.findings == 0 ? 0 : criticalCount}</strong> Critical Severity Vulnerability Risk Findings</p>
                <p><strong>{results.findings == 0 ? 0 : highCount}</strong> High Severity Vulnerability Findings</p>
                <p><strong>{results.findings == 0 ? 0 : medCount}</strong> Med Severity Vulnerability Findings</p>
                <p><strong>{results.findings == 0 ? 0 : lowCount}</strong> Number of Low Severity Vulnerability Findings</p>
            </section>
            <section className="results-heading">
                <h3>Vulnerabilites</h3>
            </section>
            <section className="results" id="findings">
                {findingsHTML.map((findingElement)=>{
                    return findingElement
                })}
            </section>
        </section>
    )
}
