<h1>GitHub Education and Classroom Notes</h1>

<h2> Table of Contents</h2>

[TOC]

## Classroom Web Page

After logging into your educator's GitHub account, go to the [Classroom page](https://classroom.github.com/classrooms).



## Cloning Student Repositories

### [Clone a student’s assignment repository](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/using-github-classroom-with-github-cli#clone-a-students-assignment-repository)

```shell
gh classroom clone student-repos
```

Clones student repositories from a given assignment. By default, the  student repositories are cloned into the current directory a directory  named after the assignment slug. To clone into a different directory,  use the `--directory` flag. If the directory does not exists, it will be created.

By default, all student repositories are cloned. To get a different number of repositories, use the `--per-page NUMBER` flag.



## Reference

- [GitHub Education](https://github.com/edu) mian page on GitHub
- [GitHub Classroom](https://classroom.github.com/) main page on GitHub
- [GitHub CLI](https://cli.github.com/) main page on GitHub
  - [Using GitHub Classroom with the GitHub CLI](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/using-github-classroom-with-github-cli)







