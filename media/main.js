const vscode = acquireVsCodeApi();

// Initialize
document.getElementById('sendBtn').addEventListener('click', sendRequest);

function addHeader() {
	const container = document.getElementById('headers');
	const headerInput = document.createElement('div');
	headerInput.className = 'header-input';
	headerInput.innerHTML = `
		<input type="text" class="header-key" placeholder="Key" />
		<input type="text" class="header-value" placeholder="Value" />
		<button class="btn-remove" onclick="removeHeader(this)">Remove</button>
	`;
	container.appendChild(headerInput);
}

function removeHeader(button) {
	button.parentElement.remove();
}

function formatJson(json) {
	try {
		const parsed = JSON.parse(json);
		return JSON.stringify(parsed, null, 2);
	} catch (e) {
		return json;
	}
}

function highlightJson(text) {
	const json = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json
		.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			let cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return `<span class="${cls}">${match}</span>`;
		});
}

async function sendRequest() {
	const method = document.getElementById('method').value;
	const url = document.getElementById('url').value;
	const body = document.getElementById('body').value;
	const responseDiv = document.getElementById('response');

	if (!url) {
		responseDiv.innerHTML = '<p class="text-muted" style="color: var(--vscode-testing-iconFailed);">Please enter a URL</p>';
		return;
	}

	responseDiv.innerHTML = '<p class="text-muted">Sending request...</p>';

	try {
		const headers = {};
		const headerInputs = Array.from(document.querySelectorAll('.header-input'));
		
		for (const headerInput of headerInputs) {
			const key = headerInput.querySelector('.header-key').value;
			const value = headerInput.querySelector('.header-value').value;
			if (key && value) {
				headers[key] = value;
			}
		}

		const options = {
			method: method,
			headers: headers,
		};

		if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
			options.body = body;
		}

		const response = await fetch(url, options);
		const responseBody = await response.text();
		const contentType = response.headers.get('content-type');

		let formattedBody = responseBody;
		if (contentType && contentType.includes('application/json')) {
			formattedBody = formatJson(responseBody);
		}

		const statusColor = response.ok ? 'var(--vscode-testing-iconPassed)' : 'var(--vscode-testing-iconFailed)';
		const statusClass = response.ok ? 'status-success' : 'status-error';

		let html = `
			<div class="response-header">
				<div style="color: ${statusColor}; font-weight: 600;">Status: ${response.status} ${response.statusText}</div>
				<div style="margin-top: 5px; font-size: 12px; color: var(--vscode-descriptionForeground);">
					Content-Type: ${contentType || 'Not specified'}
				</div>
			</div>
			<div class="response-body">
				<div style="margin-bottom: 10px; font-weight: 500; color: var(--vscode-foreground);">Response Body:</div>
				<pre>${formattedBody}</pre>
			</div>
		`;

		responseDiv.innerHTML = html;
	} catch (error) {
		responseDiv.innerHTML = `
			<div class="response-header">
				<div class="status-error">Error: ${error.message}</div>
			</div>
			<div class="response-body">
				<p>Failed to send request. Check the URL and network connection.</p>
			</div>
		`;
	}
}
