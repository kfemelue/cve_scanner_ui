import { useContext } from "react";
import { ResultsJSON } from '../App';

export function ResultsComponent(props) {
    const {results, setResults} = useContext(ResultsJSON);

    return (
        <section id="results-container">
            <section className="results-heading">
                <h3>Applictation Status: {"CRITICAL"} </h3>
            </section>
            <section className="results" id="summary">
                <p><strong>{10}</strong> Critical Severity Vulnerability Risk Findings</p>
                <p><strong>{4}</strong> High Severity Vulnerability Findings</p>
                <p><strong>{3}</strong> Med Severity Vulnerability Findings</p>
                <p><strong>{1}</strong> Number of Low Severity Vulnerability Findings</p>
            </section>
            <section className="results-heading">
                <h3>Vulnerabilites</h3>
            </section>
            <section className="results" id="findings">
                {/* produce each finding from a map of json data, sort by cvss score, highest first */}
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
                <section className="vulnerability-finding">
                    <p>CVE: { } </p>
                    <p>Severity: { } </p>

                    {/* click section to open modal for a vulnerability's finding detail */}
                </section>
            </section>
        </section>
    )
}
