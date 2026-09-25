export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
  status?: "experimental" | "preview" | "stable" | "deprecated";
  keywords?: string[];
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs", description: "The HaloUI documentation system and product principles." },
      { title: "Installation", href: "/docs/installation", description: "Configure the registry and install your first component." },
      { title: "Quick start", href: "/docs/quick-start", description: "Add, import, and customize a HaloUI component." },
    ],
  },
  {
    title: "Foundations & Material",
    items: [
      { title: "Liquid material", href: "/docs/liquid-material", description: "The ten-layer optical material engine." },
      {
        title: "Halo Surface",
        href: "/components/halo-surface",
        description: "The base material container used to construct HaloUI surfaces.",
        status: "preview",
        keywords: ["surface", "material", "substrate", "container", "glass"],
      },
      {
        title: "Halo Edge",
        href: "/components/halo-edge",
        description: "Layered outer and inset optical boundary treatment for translucent materials.",
        status: "preview",
        keywords: ["edge", "boundary", "hairline", "specular", "thickness"],
      },
      {
        title: "Halo Highlight",
        href: "/components/halo-highlight",
        description: "Directional reflected light and specular highlights along the 135° illumination vector.",
        status: "preview",
        keywords: ["highlight", "specular", "reflection", "directional", "lighting"],
      },
      {
        title: "Halo Glow",
        href: "/components/halo-glow",
        description: "Ambient luminous layer for emphasis, active state, or focus-adjacent depth.",
        status: "preview",
        keywords: ["glow", "ambient", "emphasis", "active", "luminous", "aura"],
      },
      {
        title: "Halo Noise",
        href: "/components/halo-noise",
        description: "Subtle material grain and high-frequency procedural texture reducing gradient banding.",
        status: "preview",
        keywords: ["noise", "grain", "texture", "banding", "dither", "tactile"],
      },
      {
        title: "Halo Refraction Layer",
        href: "/components/halo-refraction-layer",
        description: "Optional progressive-enhancement optical distortion for selected HaloUI materials.",
        status: "experimental",
        keywords: ["refraction", "meniscus", "distortion", "optical", "dispersion", "progressive enhancement"],
      },
      {
        title: "Halo Focus Ring",
        href: "/components/halo-focus-ring",
        description: "Shared high-contrast focus-visible treatment for HaloUI interactive components.",
        status: "stable",
        keywords: ["focus", "focus-ring", "keyboard", "accessibility", "a11y", "focus-visible"],
      },
      {
        title: "Halo Motion Presets",
        href: "/components/halo-motion-presets",
        description: "Central motion vocabulary standardizing press, lift, reveal, settle, and float behavior.",
        status: "stable",
        keywords: ["motion", "presets", "animation", "kinetic", "press", "lift", "reveal", "transition"],
      },
      {
        title: "Halo Theme Provider",
        href: "/components/halo-theme-provider",
        description: "Light/dark/system theme and material-intensity orchestration across the interface tree.",
        status: "stable",
        keywords: ["theme", "provider", "material-intensity", "dark mode", "light mode", "system", "orchestration"],
      },
      {
        title: "Halo Background",
        href: "/components/halo-background",
        description: "Reference backgrounds for testing and evaluating translucent liquid materials.",
        status: "stable",
        keywords: ["background", "testing", "reference", "neutral", "dense", "paper", "spectral", "dark"],
      },
      {
        title: "Halo Portal Surface",
        href: "/components/halo-portal-surface",
        description: "Consistent liquid-glass material wrapper for portalled floating overlays, dialogs, and popovers.",
        status: "stable",
        keywords: ["portal", "overlay", "dialog", "popover", "menu", "floating", "modal"],
      },
      {
        title: "Halo Scrim",
        href: "/components/halo-scrim",
        description: "Backdrop and scrim treatment positioned behind modal dialogs and overlays.",
        status: "stable",
        keywords: ["scrim", "backdrop", "blur", "occlusion", "modal", "sheet", "dialog"],
      },
      { title: "Accessibility", href: "/docs/accessibility", description: "Keyboard, contrast, semantics, and reduced motion." },
    ],
  },
  {
    title: "Actions",
    items: [
      {
        title: "Button",
        href: "/components/button",
        description: "A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.",
        status: "preview",
        keywords: ["button", "action", "primary", "secondary", "outline", "ghost", "destructive", "link", "trigger"],
      },
      {
        title: "Icon Button",
        href: "/components/icon-button",
        description: "A compact icon-only action control with mandatory accessible naming and HaloUI material interaction states.",
        status: "preview",
        keywords: ["icon-button", "icon button", "icon", "action", "toolbar", "accessible name", "aria-label", "ghost", "outline", "compact"],
      },
      {
        title: "Button Group",
        href: "/components/button-group",
        description: "Visually connects related independent actions while preserving the semantics, focus behavior, and activation model of each control.",
        status: "preview",
        keywords: ["button-group", "button group", "actions", "connected", "cluster", "toolbar", "orientation", "cluster"],
      },
      {
        title: "Split Button",
        href: "/components/split-button",
        description: "Combines a primary immediate action with a secondary menu of closely related alternative actions.",
        status: "preview",
        keywords: ["split-button", "split button", "action", "menu", "dropdown", "primary action", "secondary menu", "alternative actions"],
      },
      {
        title: "Toggle",
        href: "/components/toggle",
        description: "A two-state action control that communicates and changes a persistent pressed or unpressed state.",
        status: "preview",
        keywords: ["toggle", "pressed", "state", "aria-pressed", "switch", "toolbar", "formatting", "pin", "favorite"],
      },
      {
        title: "Toggle Group",
        href: "/components/toggle-group",
        description: "Single- or multi-selection set of toggles.",
        status: "preview",
        keywords: ["toggle-group", "toggle group", "selection", "single", "multiple", "toolbar", "alignment", "roving tabindex"],
      },
      {
        title: "Floating Action Button",
        href: "/components/floating-action-button",
        description: "A prominent floating control for exposing a high-priority contextual action above surrounding content.",
        status: "preview",
        keywords: ["floating-action-button", "fab", "floating action button", "action", "floating", "create", "elevated", "high-priority", "extended"],
      },
      {
        title: "Copy Button",
        href: "/components/copy-button",
        description: "Copies text to the clipboard and provides short-lived accessible feedback when the operation succeeds or fails.",
        status: "preview",
        keywords: ["copy", "clipboard", "copy-button", "action", "snippet", "feedback", "code block", "utility"],
      },
      {
        title: "Favorite Button",
        href: "/components/favorite-button",
        description: "A specialized persistent toggle action for saving, bookmarking, or favoriting items across sessions.",
        status: "preview",
        keywords: ["favorite", "save", "bookmark", "like", "heart", "favorite-button", "toggle", "star", "actions"],
      },
      {
        title: "Segmented Control",
        href: "/components/segmented-control",
        description: "A compact control for switching between a small set of mutually exclusive modes or values.",
        status: "preview",
        keywords: ["segmented-control", "segmented control", "segmented", "toggle", "view switcher", "modes", "radiogroup", "single-select"],
      },
      {
        title: "Action Bar",
        href: "/components/action-bar",
        description: "A contextual container for organizing actions related to the user's current selection or task.",
        status: "preview",
        keywords: ["action-bar", "action bar", "contextual bar", "batch actions", "selection bar", "toolbar", "actions"],
      },
    ],
  },
  {
    title: "Forms & Fields",
    items: [
      {
        title: "Field",
        href: "/components/field",
        description: "A semantic composition primitive that connects a form control with its label, description, validation message, and related field context.",
        status: "preview",
        keywords: [
          "field",
          "form",
          "label",
          "description",
          "error",
          "validation",
          "control",
          "required",
          "optional",
          "input wrapper",
          "fieldset",
          "legend"
        ],
      },
      {
        title: "Field Group",
        href: "/components/field-group",
        description: "Organizes multiple related fields into a consistent structural group while preserving each field's individual semantics.",
        status: "preview",
        keywords: [
          "field-group",
          "field group",
          "form",
          "layout",
          "vertical",
          "horizontal",
          "spacing",
          "stack",
          "rhythm",
          "fields"
        ],
      },
      {
        title: "Label",
        href: "/components/label",
        description: "An accessible text label for associating a visible name with a form control.",
        status: "preview",
        keywords: [
          "label",
          "accessible name",
          "htmlFor",
          "form label",
          "text",
          "checkbox label",
          "input label"
        ],
      },
      {
        title: "Input",
        href: "/components/input",
        description: "A single-line native text-entry control with HaloUI material states, accessible focus treatment, validation support, and consistent form behavior.",
        status: "preview",
        keywords: [
          "input",
          "text input",
          "form input",
          "text-entry",
          "email input",
          "password input",
          "native input",
          "search input"
        ],
      },
      {
        title: "Input Group",
        href: "/components/input-group",
        description: "Composes an Input with contextual prefixes, suffixes, icons, text, or actions inside a shared control boundary.",
        status: "preview",
        keywords: [
          "input-group",
          "input group",
          "prefix",
          "suffix",
          "addons",
          "icon input",
          "action input",
          "search bar"
        ],
      },
      {
        title: "Textarea",
        href: "/components/textarea",
        description: "A native multiline text-entry control with HaloUI form states, accessible focus treatment, and configurable resizing.",
        status: "preview",
        keywords: [
          "textarea",
          "multiline",
          "text area",
          "form textarea",
          "comment box",
          "notes",
          "resize"
        ],
      },
      {
        title: "Native Select",
        href: "/components/native-select",
        description: "A styled native select for simple, reliable single-value choices using the browser and operating system's built-in selection behavior.",
        status: "preview",
        keywords: [
          "native-select",
          "native select",
          "select",
          "dropdown",
          "picker",
          "options",
          "form select",
          "country picker"
        ],
      },
      {
        title: "Select",
        href: "/components/select",
        description: "An accessible custom option picker for selecting one value from a structured list of choices.",
        status: "preview",
        keywords: [
          "select",
          "dropdown",
          "option picker",
          "custom select",
          "menu",
          "choices",
          "popup"
        ],
      },
      {
        title: "Combobox",
        href: "/components/combobox",
        description: "An accessible searchable option picker for selecting one value from a filterable collection.",
        status: "preview",
        keywords: [
          "combobox",
          "autocomplete",
          "searchable select",
          "typeahead",
          "filter",
          "search picker"
        ],
      },
      {
        title: "Multi Select",
        href: "/components/multi-select",
        description: "A searchable multi-value picker for selecting and managing multiple options as removable tokens.",
        status: "preview",
        keywords: [
          "multi-select",
          "multi select",
          "tags",
          "tokens",
          "chips",
          "multiple",
          "picker",
          "searchable",
          "filter"
        ],
      },
      {
        title: "Checkbox",
        href: "/components/checkbox",
        description: "An accessible boolean selection control supporting unchecked, checked, and indeterminate states.",
        status: "preview",
        keywords: [
          "checkbox",
          "check",
          "boolean",
          "selection",
          "indeterminate",
          "toggle",
          "form checkbox",
          "select all"
        ],
      },
      {
        title: "Checkbox Group",
        href: "/components/checkbox-group",
        description: "A related set of independent checkbox options for selecting zero, one, or multiple values.",
        status: "preview",
        keywords: [
          "checkbox-group",
          "checkbox group",
          "multiple",
          "selection",
          "options",
          "fieldset",
          "independent choices",
          "group"
        ],
      },
      {
        title: "Radio Group",
        href: "/components/radio-group",
        description: "An accessible mutually exclusive option set for selecting one value from a related group.",
        status: "preview",
        keywords: [
          "radio-group",
          "radio group",
          "radio",
          "single selection",
          "mutually exclusive",
          "options",
          "choices"
        ],
      },
      {
        title: "Switch",
        href: "/components/switch",
        description: "An accessible binary control for immediately turning a setting on or off.",
        status: "preview",
        keywords: [
          "switch",
          "toggle",
          "binary",
          "setting",
          "on off",
          "immediate setting",
          "form switch",
          "boolean"
        ],
      },
      {
        title: "Slider",
        href: "/components/slider",
        description: "An accessible single-value range control for choosing a numeric value within defined minimum and maximum bounds.",
        status: "preview",
        keywords: [
          "slider",
          "range",
          "track",
          "thumb",
          "numeric value",
          "volume",
          "percent"
        ],
      },
      {
        title: "Range Slider",
        href: "/components/range-slider",
        description: "An accessible two-thumb range control for selecting a bounded numeric interval.",
        status: "preview",
        keywords: [
          "range-slider",
          "range slider",
          "two thumbs",
          "interval",
          "min max",
          "price range",
          "bounded range"
        ],
      },
      {
        title: "Input OTP",
        href: "/components/input-otp",
        description: "A segmented one-time-code input optimized for short verification codes, paste, mobile keyboards, and platform OTP autofill.",
        status: "preview",
        keywords: [
          "input-otp",
          "input otp",
          "otp",
          "pin",
          "one time password",
          "verification code",
          "sms code",
          "2fa"
        ],
      },
      {
        title: "Number Field",
        href: "/components/number-field",
        description: "An accessible numeric-entry control with keyboard editing, decimal precision, range boundaries, and optional increment/decrement actions.",
        status: "preview",
        keywords: [
          "number-field",
          "number field",
          "numeric",
          "counter",
          "stepper",
          "spinbutton",
          "increment",
          "decrement",
          "decimal",
          "quantity"
        ],
      },
      {
        title: "Currency Field",
        href: "/components/currency-field",
        description: "A locale-aware monetary entry control that separates numeric value from currency presentation.",
        status: "preview",
        keywords: [
          "currency-field",
          "currency field",
          "currency",
          "money",
          "price",
          "amount",
          "dollar",
          "euro",
          "monetary",
          "finance"
        ],
      },
      {
        title: "Phone Field",
        href: "/components/phone-field",
        description: "A structured phone-number input for entering international telephone numbers with country context, formatting, and accessible validation support.",
        status: "preview",
        keywords: [
          "phone-field",
          "phone field",
          "phone",
          "telephone",
          "mobile",
          "country code",
          "calling code",
          "international",
          "e164",
          "contact"
        ],
      },
      {
        title: "URL Field",
        href: "/components/url-field",
        description: "A URL-oriented text-entry control with browser-friendly input semantics, optional normalization, and clear validation affordances.",
        status: "preview",
        keywords: [
          "url-field",
          "url field",
          "url",
          "website",
          "link",
          "href",
          "web",
          "domain",
          "http",
          "https"
        ],
      },
      {
        title: "Tag Input",
        href: "/components/tag-input",
        description: "A freeform token-entry control for creating, editing, and removing multiple short text values.",
        status: "preview",
        keywords: [
          "tag-input",
          "tag input",
          "tags",
          "tokens",
          "chips",
          "freeform",
          "labels",
          "multi text",
          "keywords",
          "badges"
        ],
      },
      {
        title: "File Input",
        href: "/components/file-input",
        description: "An accessible native file-selection control with HaloUI form styling and clear selected-file feedback.",
        status: "preview",
        keywords: [
          "file-input",
          "file input",
          "file",
          "upload",
          "attachment",
          "picker",
          "native file",
          "file selector"
        ],
      },
      {
        title: "File Upload",
        href: "/components/file-upload",
        description: "An accessible drag-and-drop file-upload workflow with validation, queue state, progress, and application-owned transfer integration.",
        status: "preview",
        keywords: [
          "file-upload",
          "file upload",
          "dropzone",
          "drag and drop",
          "queue",
          "progress",
          "attachment",
          "transfer",
          "retry",
          "abort"
        ],
      },
      {
        title: "Color Picker",
        href: "/components/color-picker",
        description: "An accessible color-selection control combining visual color adjustment with precise textual color entry.",
        status: "preview",
        keywords: [
          "color-picker",
          "color picker",
          "color",
          "hex",
          "rgb",
          "hsv",
          "palette",
          "swatch",
          "alpha",
          "opacity",
          "picker"
        ],
      },
      {
        title: "Rating Input",
        href: "/components/rating-input",
        description: "An accessible single-value rating control for choosing a score from an ordered icon-based scale.",
        status: "preview",
        keywords: [
          "rating-input",
          "rating input",
          "rating",
          "score",
          "stars",
          "single choice",
          "scale",
          "radio group",
          "feedback",
          "review"
        ],
      },
      {
        title: "Date Picker",
        href: "/components/date-picker",
        description: "An accessible calendar-backed control for selecting a single calendar date.",
        status: "preview",
        keywords: [
          "date-picker",
          "date picker",
          "calendar",
          "date",
          "day",
          "month",
          "year",
          "popover",
          "single date",
          "schedule"
        ],
      },
      {
        title: "Date Range Picker",
        href: "/components/date-range-picker",
        description: "An accessible calendar-backed control for selecting a start and end date as one ordered date interval.",
        status: "preview",
        keywords: [
          "date-range-picker",
          "date range picker",
          "calendar range",
          "date range",
          "interval",
          "start date",
          "end date",
          "period",
          "dates"
        ],
      },
      {
        title: "Time Picker",
        href: "/components/time-picker",
        description: "An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.",
        status: "preview",
        keywords: [
          "time-picker",
          "time picker",
          "time",
          "clock",
          "hours",
          "minutes",
          "am pm",
          "24-hour",
          "schedule"
        ],
      },
    ],
  },




  {
    title: "Developers",
    items: [
      { title: "Registry", href: "/docs/registry", description: "Source-owned distribution through the shadcn registry." },
      { title: "Theming", href: "/docs/theming", description: "Adapt material, color, and motion tokens." },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Showcase", href: "/showcase", description: "Interfaces built with HaloUI." },
    ],
  },
];

export const docsNavItems = docsNavigation.flatMap((section) => section.items);

export function getDocsPagination(pathname: string) {
  const normalizedPath = pathname === "/docs/introduction" ? "/docs" : pathname;
  const index = docsNavItems.findIndex((item) => item.href === normalizedPath);

  return {
    previous: index > 0 ? docsNavItems[index - 1] : undefined,
    next: index >= 0 && index < docsNavItems.length - 1 ? docsNavItems[index + 1] : undefined,
  };
}
