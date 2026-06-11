# zed-hotcrp

A Zed extension for [HotCRP](https://hotcrp.com/) offline review files.

Features:

- syntax highlighting for HotCRP marker lines (`==+==`, `==*==`, `==-==`, etc.)
- outline entries for paper and field markers
- common filename associations such as `hotcrp.txt`, `review.txt`, and `reviews.txt`

## Read-only template lines

HotCRP asks reviewers not to edit template/control lines such as `==*==` and
`==-==`. This extension highlights those lines distinctly, but Zed language
extensions do not currently expose an API for making arbitrary line ranges
read-only.

## Development

Install as a dev extension from this directory in Zed. If you need to regenerate
the parser locally:

```sh
cd grammars/hotcrp
npm install
npx tree-sitter generate
```
