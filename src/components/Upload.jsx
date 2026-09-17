import { useContext, useState } from 'react';
import { ResultsJSON } from '../App';

const validationRules = {
    'SBOM': {
        extensions: ['.json', '.xml', '.yaml', '.yml', '.spdx'],
        custom: (file) => {
            const name = file.name.toLowerCase();
            return name.endsWith('.json') || name.endsWith('.xml') || name.endsWith('.yaml') || name.endsWith('.yml') || name.endsWith('.spdx');
        }
    },
    'Python': {
        exactNames: ['pipfile', 'pipfile.lock', 'pyproject.toml', 'poetry.lock', 'uv.lock'],
        custom: (file) => file.name.toLowerCase().startsWith('requirements') && file.name.toLowerCase().endsWith('.txt')
    },
    'Node/npm': {
        exactNames: ['package.json', 'package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock', 'pnpm-lock.yaml']
    },
    'Java': {
        exactNames: ['pom.xml'],
        custom: (file) => file.name.toLowerCase().endsWith('.lockfile')
    },
    'Go': {
        exactNames: ['go.mod', 'go.sum']
    },
    'Rust': {
        exactNames: ['cargo.toml', 'cargo.lock']
    },
    'Ruby': {
        exactNames: ['gemfile.lock']
    },
    'PHP': {
        exactNames: ['composer.json', 'composer.lock']
    },
    '.NET': {
        exactNames: ['packages.lock.json', 'project.assets.json'],
        custom: (file) => file.name.toLowerCase().endsWith('.csproj')
    }
};

export function Upload() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const { results, setResults } = useContext(ResultsJSON);

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
    ];

    let supportedInputsHTML = [];

    for (let i = 0; i < supportedInputs.length; i++) {
        let html = <li className="supported-inputs-list-elements" key={i}>{supportedInputs[i]}</li>;
        supportedInputsHTML = [...supportedInputsHTML, html];
    };

    function handleFileUpload(event) {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    function removeFile(indexToRemove) {
        setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
    };

    async function handleSubmit() {
        if (!selectedFiles) {
            alert("Please select at least 1 file.");
            return;
        };

        const url = "http://localhost:8000/v1/scan";
        const formData = new FormData();

        selectedFiles.forEach((item) => {
            formData.append("files", item)
        });

        const options = {
            method: "POST",
            body: formData
        };

        try {
            const response = await fetch(url, options)
            const result = await response.json();
            setResults(result);

        } catch (error) {
            console.error(error);
        };
    };

    return (
        <section id="upload-container">
            <section className="upload-row">
                <input onChange={(e) => {
                    handleFileUpload(e);
                }} id="input" type="file" multiple />
            </section>
            <section className="upload-row">
                {/* Preview Selected Files */}
                {selectedFiles && (
                    <div id="selected-files-preview">
                        <h4>Selected Files ({selectedFiles.length}):</h4>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index}>
                                    <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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
                <button onClick={() => {
                    handleSubmit();
                }} id="submit-button">Analyze</button>
            </section>
        </section>
    );
};
