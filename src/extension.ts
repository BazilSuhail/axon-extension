import * as vscode from 'vscode';
import { ApiTesterPanel } from './panels/ApiTesterPanel';

export function activate(context: vscode.ExtensionContext) {
	console.log('API Tester extension activated');

	// Register webview view provider
	const provider = new ApiTesterViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('apiTesterPanel', provider)
	);

	// Register command for opening panel
	const disposable = vscode.commands.registerCommand('api-tester.openPanel', () => {
		ApiTesterPanel.render(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('API Tester extension deactivated');
}

class ApiTesterViewProvider implements vscode.WebviewViewProvider {
	constructor(private extensionUri: vscode.Uri) {}

	resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		token: vscode.CancellationToken
	) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')],
		};

		webviewView.webview.html = this.getHtmlContent(webviewView.webview);

		webviewView.webview.onDidReceiveMessage((message) => {
			if (message.command === 'sendRequest') {
				// Handle request if needed
			}
		});
	}

	private getHtmlContent(webview: vscode.Webview): string {
		const styleMainUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUri, 'media', 'main.css')
		);
		const styleVSCodeUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUri, 'media', 'vscode.css')
		);
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this.extensionUri, 'media', 'main.js')
		);

		return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="${styleVSCodeUri}" rel="stylesheet">
	<link href="${styleMainUri}" rel="stylesheet">
	<title>API Tester</title>
	<style>
		body { padding: 10px; }
	</style>
</head>
<body>
	<h2 style="margin-top: 0;">API Tester</h2>
	
	<div class="form-container">
		<div class="form-group">
			<label for="method">Method:</label>
			<select id="method">
				<option value="GET">GET</option>
				<option value="POST">POST</option>
				<option value="PUT">PUT</option>
				<option value="PATCH">PATCH</option>
				<option value="DELETE">DELETE</option>
				<option value="HEAD">HEAD</option>
				<option value="OPTIONS">OPTIONS</option>
			</select>
		</div>

		<div class="form-group">
			<label for="url">URL:</label>
			<input type="text" id="url" placeholder="https://api.example.com/endpoint" />
		</div>

		<details class="collapsible">
			<summary>Headers</summary>
			<div id="headers" class="headers-container">
				<div class="header-input">
					<input type="text" class="header-key" placeholder="Key" />
					<input type="text" class="header-value" placeholder="Value" />
					<button class="btn-remove" onclick="removeHeader(this)">Remove</button>
				</div>
			</div>
			<button class="btn-secondary" onclick="addHeader()">Add Header</button>
		</details>

		<details class="collapsible">
			<summary>Body</summary>
			<textarea id="body" placeholder="JSON body (for POST, PUT, PATCH)"></textarea>
		</details>

		<button id="sendBtn" class="btn-primary">Send Request</button>
	</div>

	<div class="response-container">
		<h3>Response</h3>
		<div id="response" class="response-content">
			<p class="text-muted">Response will appear here...</p>
		</div>
	</div>

	<script src="${scriptUri}"><\/script>
</body>
</html>`;
	}
}
