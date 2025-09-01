/** @type {import("stylelint").Config} */
export default {
    extends: ["stylelint-config-standard"],
    rules: {
        "selector-class-pattern": null,
        "selector-pseudo-class-no-unknown": null,
        "selector-pseudo-element-no-unknown": null,
        "selector-type-no-unknown": null,
        "number-leading-zero": "always",
        "no-descending-specificity": null
    },
}