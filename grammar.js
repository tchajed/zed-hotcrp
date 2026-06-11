/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "hotcrp",

  extras: $ => [],

  rules: {
    source_file: $ => repeat(choice(
      $.template_line,
      $.paper_line,
      $.separator_line,
      $.comment_line,
      $.field_marker,
      $.score_option,
      $.field_name,
      $.text_line,
      $.blank_line,
    )),

    // HotCRP uses these lines as non-editable template/control text in offline
    // review forms. Zed can highlight them, but extensions cannot make them
    // read-only.
    template_line: $ => line(seq("==", choice("*", "-"), "==", optional(/[^\r\n]*/)), 100),

    // Common HotCRP paper header: "==+== Paper #123 ...".
    paper_line: $ => line(seq("==+==", /[ \t]*/, "Paper", optional(/[^\r\n]*/)), 90),

    // Other HotCRP field/section markers, for example "==+== Summary".
    field_marker: $ => line(seq("==", /[^=\r\n]*/, "==", optional(/[^\r\n]*/)), 80),

    // Visual separators sometimes appear in exported/review templates.
    separator_line: $ => line(/[-_=]{3,}[ \t]*/, 70),

    comment_line: $ => line(seq("#", optional(/[^\r\n]*/)), 60),

    // Score option lines commonly look like "2. Accept" or "A. Strong accept".
    score_option: $ => line(seq(/[ \t]*/, /(?:[0-9]+|[A-Z])\./, /[ \t]+/, /[^\r\n]*/), 50),

    // Fallback for simple "Field: value" metadata lines.
    field_name: $ => line(seq(/[A-Za-z][A-Za-z0-9 _/-]*/, ":", optional(/[^\r\n]*/)), 40),

    blank_line: $ => line(/[ \t]*/, 0),
    text_line: $ => line(/[^\r\n]+/, -1),
  },
});

function line(rule, precedence) {
  return token(prec(precedence, seq(rule, optional(/\r?\n/))));
}
