import { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export function Upload() {
    const [fileUpload, setFileUpload] = useState(null);

    const supportedInputs = [
        "SBOM: CycloneDX JSON/XML; SPDX 2.x JSON/YAML/tag-value; SPDX 3.x JSON/JSON-LD",
        "Python: requirements*.txt, Pipfile, Pipfile.lock, pyproject.toml, poetry.lock, uv.lock",
        "Node/npm: package.json, package-lock.json, npm-shrinkwrap.json, yarn.lock, pnpm-lock.yaml",
        "Java: pom.xml, Gradle .lockfile",
        "Go: go.mod, go.sum",
        "Rust: Cargo.toml, Cargo.lock",
        "Ruby: Gemfile.lock",
        "PHP: composer.json, composer.lock",
        ".NET: *.csproj, packages.lock.json, project.assets.json"
    ]

    let supportedInputsHTML = [];

    for (let i = 0; i < supportedInputs.length; i++) {
        let html = <li className="supported-inputs-list-elements" key={i}>{supportedInputs[i]}</li>
        supportedInputsHTML = [...supportedInputsHTML, html]
    }

    function handleFileUpload(e) {
        console.log(e)
        console.log("uploaded")
    }

    async function handleSubmit() {
        console.log("submit")
    }

    return (
        <section id="upload-container">
            <section className="upload-row">
                <input onChange={(e)=>{
                    handleFileUpload(e);
                }} id="input" type="file" />
            </section>
            <section className="upload-row">
                <p>Supported Inputs:</p>
                <ul id="supported-inputs-list">
                    {supportedInputsHTML.map((listElement) => {
                        return listElement
                    })}
                </ul>
            </section>
            <section className="upload-row">
                <button onClick={()=>{
                    handleSubmit();
                }} id="submit-button">Analyze</button>
            </section>
        </section>
    )
};
