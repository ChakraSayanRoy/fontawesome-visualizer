# FontAwesome Visualizer

FontAwesome Visualizer is a VS Code extension that displays **FontAwesome icons directly inside the editor** next to your code.

It helps developers **visually identify icons while writing HTML, JSX, or template code**, without leaving the editor.

---

## Features

• Automatically detects FontAwesome `<i>` tags
• Displays the icon **inline after the tag**
• Works with multiple frameworks
• Smart IntelliSense for FontAwesome classes
• Icon preview while navigating suggestions
• Optional **FontAwesome Pro support**

Example:

```html
<i class="fa-solid fa-user"></i>
```

Editor view:

```
<i class="fa-solid fa-user"></i> 👤
```

---

## Supported Frameworks

The extension works with:

* HTML
* JavaScript
* TypeScript
* React (JSX / TSX)
* Vue
* Svelte
* JSP

Example React usage:

```jsx
<i className="fa-solid fa-user"></i>
```

---

## IntelliSense

Autocomplete suggestions appear **only inside `class` or `className` attributes**.

Example:

```html
<i class="fa-">
```

Suggestions:

```
fa-user
fa-house
fa-gear
fa-github
```

While navigating suggestions using **↑ ↓ arrows**, the icon preview updates automatically.

---

## FontAwesome Styles

### Free Icons

Supported by default:

```
fa-solid
fa-regular
fa-brands
```

### FontAwesome Pro (Optional)

If FontAwesome Pro icons are configured, the extension also supports:

```
fa-light
fa-thin
fa-duotone
```

---

## FontAwesome Icon Sources

### Default Mode (Free Icons)

On first activation, the extension automatically downloads the **FontAwesome Free SVG icons** and stores them locally.

Icons are cached for fast loading.

---

### FontAwesome Pro Mode

If you own FontAwesome Pro, you can configure the extension to use your local SVG icons.

After installation, the extension will prompt you to select the **FontAwesome `svgs` folder**.

Expected structure:

```
svgs/
 ├─ solid/
 ├─ regular/
 ├─ brands/
 ├─ light/
 ├─ thin/
 └─ duotone/
```

Example path:

```
C:\fontawesome-pro\svgs
```

You can also change this later in VS Code settings.

---

## Configuration

Open VS Code settings and configure:

```
fontawesomeVisualizer.proIconsPath
```

Example:

```
C:\fontawesome-pro\svgs
```

---

## Performance

The extension is optimized for performance:

• Only scans **visible editor lines**
• Uses **icon caching**
• Icons are loaded from **local SVG files**

---

## Installation

### Install from VSIX

1. Download the `.vsix` package
2. Open VS Code
3. Press `Ctrl + Shift + P`
4. Run

```
Extensions: Install from VSIX
```

5. Select the extension package

---

## Known Limitations

Currently detects icons inside:

```
<i class="fa-*"></i>
<i className="fa-*"></i>
```

Future versions may support additional syntax such as:

```
<FontAwesomeIcon icon="user" />
```

---

## License

MIT License
