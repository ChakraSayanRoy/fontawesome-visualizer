# FontAwesome Visualizer

FontAwesome Visualizer is a VS Code extension that displays **FontAwesome icons directly inside the editor** next to your HTML or JSX code.

It helps developers visually identify icons while writing code without opening the FontAwesome website.

---

## Features

* Detects `<i>` tags containing FontAwesome classes
* Displays the icon **inline after the tag**
* Supports common FontAwesome styles:

```
fa-solid
fa-regular
fa-brands
fa-light
fa-thin
fa-duotone
```

* Works with multiple environments:

```
HTML
React
JSX / TSX
Vue
Svelte
JSP
```

* Supports additional classes like Bootstrap:

```
<i class="fa-solid fa-user text-primary me-2"></i>
```

* **Local icon storage**

  * The extension downloads FontAwesome SVG icons on first run
  * Icons are stored locally for fast rendering

* **Editor decorations**

  * Icons are displayed using VS Code editor decorations

* **Performance optimized**

  * Only scans visible editor lines

* **Autocomplete**

  * IntelliSense suggestions for `fa-*` classes
  * Includes icon preview

---

## Example

Code:

```
<i class="fa-solid fa-user"></i>
```

Editor view:

```
<i class="fa-solid fa-user"></i> 👤
```

---

## Installation

### Install from VSIX

1. Download the `.vsix` package
2. Open VS Code
3. Press `Ctrl + Shift + P`
4. Select:

```
Extensions: Install from VSIX
```

5. Choose the `.vsix` file

---

## Requirements

No additional dependencies required.

The extension automatically downloads FontAwesome icons on first activation.

---

## Known Limitations

Currently detects icons inside:

```
<i class="fa-*"></i>
<i className="fa-*"></i>
```

Future versions may support additional patterns such as:

```
<FontAwesomeIcon icon="user" />
```

---

## Roadmap

Planned improvements:

* React `<FontAwesomeIcon />` support
* Icon hover preview
* Inline emoji-style replacement
* Improved icon search and autocomplete
* Icon picker UI

---

## License

MIT License
