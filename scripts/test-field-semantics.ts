import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import assert from "node:assert/strict";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "../components/ui/field";

console.log("=== Testing HaloUI Field Semantics & Accessibility Invariants ===");

// 1. Basic Association: htmlFor matches control id
{
  const html = ReactDOMServer.renderToString(
    React.createElement(
      Field,
      { id: "email-input" },
      React.createElement(FieldLabel, null, "Email Address"),
      React.createElement("input", { id: "email-input", type: "email" }),
      React.createElement(FieldDescription, null, "Enter your account email.")
    )
  );

  assert.ok(html.includes('for="email-input"'), "FieldLabel must have for='email-input'");
  assert.ok(html.includes('id="email-input"'), "Control must have id='email-input'");
  assert.ok(html.includes('id="email-input-description"'), "FieldDescription must have id='email-input-description'");
  console.log("✓ Label htmlFor matches control id and Description receives coordinated ID");
}

// 2. Coexisting Description and Error IDs
{
  const html = ReactDOMServer.renderToString(
    React.createElement(
      Field,
      { id: "password-input", invalid: true },
      React.createElement(FieldLabel, null, "Password"),
      React.createElement("input", {
        id: "password-input",
        type: "password",
        "aria-invalid": "true",
        "aria-describedby": "password-input-description password-input-error",
      }),
      React.createElement(FieldDescription, null, "At least 12 characters required."),
      React.createElement(FieldError, null, "Password must include a number.")
    )
  );

  assert.ok(html.includes('id="password-input-description"'), "Description ID must exist");
  assert.ok(html.includes('id="password-input-error"'), "Error ID must exist");
  assert.ok(html.includes('role="alert"'), "FieldError must have role='alert'");
  assert.ok(html.includes('aria-live="polite"'), "FieldError must have aria-live='polite'");
  assert.ok(html.includes('data-invalid="true"'), "Field must have data-invalid='true'");
  console.log("✓ Coexisting Description and Error IDs with alert role and invalid state verified");
}

// 3. Required Indicator Semantics (aria-hidden)
{
  const html = ReactDOMServer.renderToString(
    React.createElement(
      Field,
      { id: "username-input", required: true },
      React.createElement(FieldLabel, null, "Username"),
      React.createElement("input", { id: "username-input", required: true })
    )
  );

  assert.ok(html.includes('aria-hidden="true"'), "Required asterisk must have aria-hidden='true'");
  assert.ok(html.includes("*"), "Required asterisk must render visually");
  console.log("✓ Required indicator is rendered with aria-hidden='true'");
}

// 4. Orientation Semantics
{
  const verticalHtml = ReactDOMServer.renderToString(
    React.createElement(Field, { orientation: "vertical" }, "Content")
  );
  assert.ok(verticalHtml.includes("flex-col"), "Vertical orientation must include flex-col");

  const horizontalHtml = ReactDOMServer.renderToString(
    React.createElement(Field, { orientation: "horizontal" }, "Content")
  );
  assert.ok(horizontalHtml.includes("flex-row"), "Horizontal orientation must include flex-row");

  const responsiveHtml = ReactDOMServer.renderToString(
    React.createElement(Field, { orientation: "responsive" }, "Content")
  );
  assert.ok(responsiveHtml.includes("sm:flex-row"), "Responsive orientation must include sm:flex-row");
  console.log("✓ Layout orientations (vertical, horizontal, responsive) verified");
}

// 5. FieldSet & FieldLegend Semantics
{
  const html = ReactDOMServer.renderToString(
    React.createElement(
      FieldSet,
      null,
      React.createElement(FieldLegend, null, "Notification Settings"),
      React.createElement(FieldDescription, null, "Select how you receive alerts.")
    )
  );

  assert.ok(html.includes("<fieldset"), "FieldSet must render a semantic <fieldset>");
  assert.ok(html.includes("<legend"), "FieldLegend must render a semantic <legend>");
  console.log("✓ FieldSet (<fieldset>) and FieldLegend (<legend>) verified");
}

console.log("\n========================================================");
console.log("🎉 ALL FIELD SEMANTIC INVARIANTS PASSED!");
console.log("========================================================\n");
