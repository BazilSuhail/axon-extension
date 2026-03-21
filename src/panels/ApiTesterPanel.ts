import * as vscode from 'vscode';
import { getUri } from '../utilities/getUri';
import { getNonce } from '../utilities/getNonce';

export class ApiTesterPanel {
	public static currentPanel: ApiTesterPanel | undefined;
	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;
		this._update();
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
		this._panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case 'sendRequest':
						this._handleSendRequest(message.data);
						break;
				}
			},
			null,
			this._disposables
		);
	}

	public static render(extensionUri: vscode.Uri) {
		if (ApiTesterPanel.currentPanel) {
			ApiTesterPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
		} else {
			const panel = vscode.window.createWebviewPanel(
				'api-tester',
				'API Tester',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
				}
			);
			ApiTesterPanel.currentPanel = new ApiTesterPanel(panel, extensionUri);
		}
	}

	private _update() {
		this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const styleResetUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css')
		);
		const styleVSCodeUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css')
		);
		const styleMainUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css')
		);
		const scriptUri = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js')
		);

		const nonce = getNonce();

		return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="${styleResetUri}" rel="stylesheet">
	<link href="${styleVSCodeUri}" rel="stylesheet">
	<link href="${styleMainUri}" rel="stylesheet">
	<title>API Tester</title>
</head>
<body>
	<h1>API Tester</h1>
	
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
		<h2>Response</h2>
		<div id="response" class="response-content">
			<p class="text-muted">Response will appear here...</p>
		</div>
	</div>

	<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
	}

	private _handleSendRequest(data: any) {
		// Response will be sent back from the webview script
	}

	public dispose() {
		ApiTesterPanel.currentPanel = undefined;
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}
}
