<h1>GitHub Education and Classroom Notes</h1>

<h2> Table of Contents</h2>

[TOC]

## Summary of GH Classroom 

- Distribute starting files to students
  - Each student gets a copy of the instructor's template repository
  
    

## GitHub Classroom Web Page

After logging into your educator's GitHub account, go to the [Classroom page](https://classroom.github.com/classrooms). To use this feature, add the GitHub Classroom widget to your Moodle page. Then, click on the link in the widget. You will be able to open a page that lets you connect your GiHub Classroom to Moodle.



## Moodle Integration

The main purpose of Moodle integration is to automatically add students to a GitHub Classroom so they can have repositories automatically crested for each of their GitHub accounts.

## Re-using a Classroom

**Jan. 13, 2025 Note: I wasn't able to get this to work for CS 233JS. Perhaps it was because my starter repositories weren't template repositories.**

To re-use a classroom for another term go to the classroom page and:

- Create a new classroom. Instead of linking students when you create the classroom, you can use the link in the Moodle widget after you have created the classroom.
- Go to the menu for the old classroom  you want to reuse, select "Reuse Assignment"
  - Select the organization, new classroom, and the assignments you want to reuse.

## Cloning Student Repositories

[GitHub Classroom docs: Clone a student’s assignment repository](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/using-github-classroom-with-github-cli#clone-a-students-assignment-repository)

```shell
gh classroom clone student-repos
```

This CLI command clones student repositories to your local computer from an assignment. 

By default, the  student repositories are cloned into the current directory a directory  named after the assignment slug. To clone into a different directory,  use the `--directory` flag. If the directory does not exists, it will be created.

By default, all student repositories are cloned. To get a different number of repositories, use the `--per-page NUMBER` flag.



## Reference

- [GitHub Education](https://github.com/edu) main page on GitHub
- [GitHub Classroom](https://classroom.github.com/) main page on GitHub
- [GitHub CLI](https://cli.github.com/) main page on GitHub
  - [Using GitHub Classroom with the GitHub CLI](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/using-github-classroom-with-github-cli)



------

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/) GitHub Classroom Notes by [Brian Bird](https://profbird.dev) 2024, revised <time>2025</time> are licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). 

------------



