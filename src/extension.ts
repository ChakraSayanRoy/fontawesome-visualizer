import * as vscode from 'vscode';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from "adm-zip";

const iconCache = new Map<string, string>();
let iconList: string[] = [];

export async function activate(context: vscode.ExtensionContext) {

	console.log("FontAwesome Visualizer Activated");

	const decorationType = vscode.window.createTextEditorDecorationType({});

	const storagePath = context.globalStorageUri.fsPath;

	if (!fs.existsSync(storagePath)) {
		fs.mkdirSync(storagePath, { recursive: true });
	}

	const faSvgDir = await setupFontAwesome(storagePath);

	iconList = getAllIcons(faSvgDir);

	let timeout: NodeJS.Timeout | undefined;

	function triggerUpdate(editor: vscode.TextEditor) {

		if (!supportedLanguage(editor)) {
			return;
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			updateDecorations(editor);
		}, 120);
	}

	async function updateDecorations(editor: vscode.TextEditor) {

		const visibleRanges = editor.visibleRanges;
		const decorations: vscode.DecorationOptions[] = [];

		for (const range of visibleRanges) {

			for (let line = range.start.line; line <= range.end.line; line++) {

				const textLine = editor.document.lineAt(line);
				const text = textLine.text;

				const regex = /<i\b[^>]*\b(class|className)\s*=\s*["']([^"']*fa-[^"']*)["'][^>]*>/g;

				let match;

				while ((match = regex.exec(text))) {

					const classString = match[2];

					const parsed = parseFA(classString);
					if (!parsed) {
						continue;
					}

					const iconPath = getLocalIcon(parsed.style, parsed.icon, faSvgDir);
					if (!iconPath) {
						continue;
					}

					const start = new vscode.Position(line, match.index);
					const end = new vscode.Position(line, match.index + match[0].length);

					decorations.push({
						range: new vscode.Range(start, end),
						renderOptions: {
							after: {
								contentIconPath: vscode.Uri.file(iconPath),
								margin: "0 0 0 6px",
								width: "10px",
								height: "10px"
							}
						}
					});
				}
			}
		}

		editor.setDecorations(decorationType, decorations);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				triggerUpdate(editor);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(event => {
			const editor = vscode.window.activeTextEditor;
			if (editor && event.document === editor.document) {
				triggerUpdate(editor);
			}
		})
	);

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			[
				"html",
				"javascript",
				"typescript",
				"javascriptreact",
				"typescriptreact",
				"vue",
				"svelte",
				"jsp"
			],
			{
				provideCompletionItems() {

					return iconList.map(icon => {

						const item = new vscode.CompletionItem(
							`fa-${icon}`,
							vscode.CompletionItemKind.Enum
						);

						item.insertText = `fa-${icon}`;

						item.documentation = new vscode.MarkdownString(
							`![icon](file://${path.join(faSvgDir, "solid", icon + ".svg")})`
						);

						return item;
					});
				}
			},
			"-"
		)
	);

	if (vscode.window.activeTextEditor) {
		triggerUpdate(vscode.window.activeTextEditor);
	}
}

function supportedLanguage(editor: vscode.TextEditor) {

	const id = editor.document.languageId;
	return [
		"html",
		"javascriptreact",
		"typescriptreact",
		"vue",
		"svelte",
		"jsp"
	].includes(id);
}

function getAllIcons(baseDir: string): string[] {

	const styles = [
		"solid",
		"regular",
		"brands",
		"light",
		"thin",
		"duotone"
	];

	const icons = new Set<string>();

	for (const style of styles) {

		const dir = path.join(baseDir, style);

		if (!fs.existsSync(dir)) {
			continue;
		}

		const files = fs.readdirSync(dir);

		for (const file of files) {
			icons.add(file.replace(".svg", ""));
		}
	}

	return Array.from(icons);
}

function parseFA(classString: string) {

	const styleMatch = classString.match(/fa-(solid|regular|brands|light|thin|duotone)/);

	const classes = classString.split(/\s+/);

	let icon = "";

	for (const c of classes) {

		if (!c.startsWith("fa-")) {
			continue;
		}

		if (
			c === "fa-solid" ||
			c === "fa-regular" ||
			c === "fa-brands" ||
			c === "fa-light" ||
			c === "fa-thin" ||
			c === "fa-duotone"
		) {
			continue;
		}

		icon = c.replace("fa-", "");
	}

	if (!icon) {
		return null;
	}

	const style = styleMatch ? styleMatch[1] : "solid";

	return { style, icon };
}

function getLocalIcon(style: string, icon: string, baseDir: string) {

	const key = `${style}:${icon}`;

	if (iconCache.has(key)) {
		return iconCache.get(key)!;
	}

	const file = path.join(baseDir, style, `${icon}.svg`);

	if (fs.existsSync(file)) {
		iconCache.set(key, file);
		return file;
	}

	iconCache.set(key, "");
	return "";
}

async function setupFontAwesome(storagePath: string) {

	const faDir = path.join(storagePath, "Font-Awesome-6.x", "svgs");

	if (fs.existsSync(faDir)) {
		return faDir;
	}

	const zipPath = path.join(storagePath, "fa.zip");

	const url = "https://github.com/FortAwesome/Font-Awesome/archive/refs/heads/6.x.zip";

	console.log("Downloading FontAwesome pack...");

	const response = await axios.get(url, {
		responseType: "arraybuffer"
	});

	fs.writeFileSync(zipPath, response.data);

	const zip = new AdmZip(zipPath);

	zip.extractAllTo(storagePath, true);

	return faDir;
}

export function deactivate() { }