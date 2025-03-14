<p align="center" >
    <img alt="aenrione-web" src="static/avatar.jpg" width="200" height="200" />

</p>
<h3 align="center">
  Hugo website for <a href="https://aenrione.xyz">personal site.</a>
</h3>
<hr>

**Table of Contents** 
- [Building locally](#building-locally)
- [Preview your site](#preview-your-site)
- [Troubleshooting](#troubleshooting)

## Building locally

To work locally with this project, you'll have to follow the steps below:

1. Fork, clone or download this project
2. Initialize the theme: `git submodule update --init --recursive`
3. [Install](https://gohugo.io/getting-started/installing/) Hugo
4. Preview your project: `hugo server`
5. Add content
6. Generate the website: `hugo` (optional)

Read more at Hugo's [documentation](https://gohugo.io/).

NOTE:
- If you have nix-shell installed, you can run `nix-shell` to enter a shell with Hugo installed.
- If you have docker and compose installed, you can the docker-compose file to run the website locally.

### Preview your site

If you clone or download this project to your local computer and run `hugo server`,
your site can be accessed under `localhost:1313/hugo/`.

The theme used is adapted from https://github.com/vaga/hugo-theme-m10c.


## Troubleshooting

1. CSS is missing!

    For your site to look like the website you must install [m10c theme](https://github.com/vaga/hugo-theme-m10c)
    as a submodule. You can do this by running the following command:

    ```bash
    git submodule update --init --recursive
    ```
