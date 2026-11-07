# GradingAssistant — CS233JS

Grading configuration for **CS233JS**, used by [CS-GradingAssistant](https://github.com/ProfBird/CS-GradingAssistant), the course-neutral grading tool (clone it separately; it holds no course files).

## What is in this folder

- `course_config.json` — course name, banner code and rubric-filename prefix.
- `Lab01` … `Lab07`, `TermProject/<Step>` — one folder per assignment (or step) holding `<lab>_config.json`: the feature checks, lint/runtime settings and rubric-cell mappings.
- Rubrics: `../Labs/<Lab>/` (Lab07's config was re-mapped by one row for the current `Lab07_RubricProxy.xlsm`, which added an "example.env" row).

## Using it

1. Clone [CS-GradingAssistant](https://github.com/ProfBird/CS-GradingAssistant) and run `npm install`.
2. Run `node bin/grade.js` (or `node bin/configure-lab.js`), choose **Add new course**, and browse to this folder. The path is saved in the tool's git-ignored `configs/local-config.json`, so each computer registers it once.
3. Grade a lab, e.g. `node bin/grade.js CS233JS Lab03`.

The rubric spreadsheets are **not copied here**: each lab config's `rubricName` is a path relative to its config folder that points at the rubric in this repo's own lab folder, so that file is the single template. See the tool's [User Guide](https://github.com/ProfBird/CS-GradingAssistant/blob/main/USER_GUIDE.md) for the config format.
