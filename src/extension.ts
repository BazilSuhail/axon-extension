import * as vscode from 'vscode';
import { ApiTesterPanel } from './panels/ApiTesterPanel';

export function activate(context: vscode.ExtensionContext) {
	console.log('API Tester extension activated');

	const disposable = vscode.commands.registerCommand('api-tester.openPanel', () => {
		ApiTesterPanel.render(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('API Tester extension deactivated');
}
