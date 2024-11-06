<script lang="ts">
  const projects = [
    {
      name: 'GlanceThing',
      description: 'Your CarThing as a glanceable action pad!',
      links: [
        {
          text: 'GitHub',
          link: 'https://github.com/BluDood/GlanceThing'
        }
      ]
    },
    {
      name: 'BluDood Accounts',
      description: 'One account for all my projects.',
      links: [
        {
          text: 'Visit',
          link: 'https://accounts.bludood.com'
        },
        {
          text: 'Sign Up',
          link: 'https://accounts.bludood.com/register'
        },
        {
          text: 'Sign In',
          link: 'https://accounts.bludood.com/login'
        }
      ]
    },
    {
      name: 'BluTools',
      description: 'A collection of all kinds of tools you might need!',
      links: [
        {
          text: 'Visit',
          link: 'https://tools.bludood.com'
        }
      ]
    },
    {
      name: 'BluBot',
      description: 'Discord moderation and utility bot.',
      links: [
        {
          text: 'GitHub',
          link: 'https://github.com/BluDood/BluBot'
        }
      ]
    },

    {
      name: 'BluBlog',
      description: 'My personal blog, made using NextJS.',
      links: [
        {
          text: 'Visit',
          link: 'https://blog.bludood.com'
        }
      ]
    },
    {
      name: 'BluDood API',
      description: 'My API, serving activity from Discord and Spotify.',
      links: [
        {
          text: 'GitHub',
          link: 'https://github.com/BluDood/BluDoodAPI'
        }
      ]
    }
  ]
</script>

<svelte:head>
  <title>BluDood - Projects</title>
  <meta name="description" content="BluDood - Projects" />
</svelte:head>

<div class="projects">
  <h1>Projects</h1>
  <div class="list">
    {#each projects as project}
      <a class="project" href={project.links?.[0].link} target="_blank">
        <span class="name">{project.name}</span>
        <span class="description">{project.description}</span>
        <div class="links">
          {#each project.links as link}
            <a href={link.link} target="_blank">
              {link.text}
            </a>
          {/each}
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .projects {
    padding: 0 20px;
  }

  .projects > h1 {
    text-align: center;
    padding: 20px 0;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .project {
    all: unset;
    width: 310px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
    transition: border 200ms ease;
    cursor: pointer;
    animation: appear 500ms ease forwards;
  }

  .project:hover,
  .project:focus {
    border-color: var(--border-active);
  }

  .project .name {
    font-size: 20px;
    font-weight: 700;
  }

  .project .description {
    flex: 1;
  }

  .project .links {
    display: flex;
    gap: 10px;
  }

  .project .links a {
    padding: 3px 15px;
    border-radius: 5px;
    background: var(--background-ter);
    margin-top: 10px;
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
    transition: 200ms ease;
    transition-property: opacity border;
  }

  .project .links a:hover {
    border-color: var(--border-active);
  }

  .project:hover:has(.links a:hover) {
    border-color: transparent;
  }

  .project .links a:first-of-type {
    background: var(--blue);
    opacity: 0.9;
  }

  .project .links a:first-of-type:hover {
    border-color: transparent;
    opacity: 1;
  }

  @media screen and (max-width: 600px) {
    .projects {
      padding: 0 30px;
    }

    .project {
      width: 100%;
    }
  }
</style>
